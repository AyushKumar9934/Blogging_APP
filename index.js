const express=require("express");
const mongoose=require('mongoose')
const session = require('express-session')
require('dotenv').config();
const base64=require('base-64');

const app=express();
const bodyParser = require('body-parser');
const router=require('./routes.js');
const { checkAuth} = require('./utils/auth.js')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zzkaiub.mongodb.net/?retryWrites=true&w=majority`).then(res=>console.log("we are connected to mongoose")).catch(err=>console.log(err))
app.use(session({
    secret:'dummy key',
    resave:true,
    saveUninitialized:true,
}))


app.use(checkAuth)

app.set('view engine','ejs')


 
app.use(router)




app.listen(process.env.PORT|| 3000,()=>{
    console.log(`listining to port 3000`)
})