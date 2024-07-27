const express=require('express');
const app=express();

const home=''
app.use(express.static('public'));


app.listen(5000);