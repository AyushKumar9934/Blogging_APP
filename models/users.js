const mongoose=require('mongoose')
const Schema=mongoose.Schema
const newSchema=new Schema({
    name:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true,
        
    }
},{timestamps:true})
const Users=mongoose.model('Users',newSchema)
module.exports=Users;


