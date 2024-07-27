let display = document.getElementById('display');
let currentInput = '0';
let extraFunctions = document.querySelector('.extra-functions');

// Store the original trigonometric functions
const originalSin = Math.sin;
const originalCos = Math.cos;
const originalTan = Math.tan;

// Convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Convert radians to degrees
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function updateDisplay() {
  if (currentInput === '') {
    display.innerText = '';
  } else {
    display.innerText = currentInput;
  }
}

function appendToDisplay(value) {
  currentInput += value;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    currentInput = eval(currentInput);
    updateDisplay();
  } catch (error) {
    currentInput = 'Error';
    updateDisplay();
  }
}

function toggleExtra() {
  extraFunctions.style.display = (extraFunctions.style.display === 'none' || extraFunctions.style.display === '') ? 'grid' : 'none';

  if (extraFunctions.style.display === 'grid') {
    // If extra functions are visible, update trigonometric functions to use degrees
    Math.sin = function (x) { return originalSin(toRadians(x)); };
    Math.cos = function (x) { return originalCos(toRadians(x)); };
    Math.tan = function (x) { return originalTan(toRadians(x)); };
  } else {
    // If extra functions are hidden, restore the default trigonometric functions
    Math.sin = originalSin;
    Math.cos = originalCos;
    Math.tan = originalTan;
  }
}

// Support keyboard input
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === 'Delete') {
    deleteLast();
  }
});
