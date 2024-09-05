const session = require('express-session')
const Users = require("../models/users");
const bcryptjs=require('bcryptjs')
exports.signup=(req,res)=>{
    res.render('signup',{message
        :null
    })}
exports.loginPage=(req,res)=>{
    res.render('login',{message:null})

}
exports.register=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await Users.findOne({email});
        if(existingUser){
         return res.render('signup',{message:"user already exits in db"})
        }
        const hasPassword=await bcrypt.hash(password,10);
        const newUser=new Users({name,email,password:hasPassword})
        newUser.save().then((response)=>{
            // return res.status(200).json({
            //     message:"User created Successfully"
            // })
          res.render('login',{ message:"User signup Successfully"})

        }).catch(err=>{
           res.render('signup',{message:"User cant be signup.server Issue"})
        })

    }catch(err){
        console.log("error in creating user",err);
        res.render('signup',{meassage:"User cant be signup"})

    } 
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
      

        console.log("email is ",email)
       
        
        const existingUser=await Users.findOne({email});
        
        if(!existingUser){

            return res.render('login',{message:"user not existing please signUp"})
        }
        const passwordMatch=await bcrypt.compare(password,existingUser.password);
        if(passwordMatch){
            req.session.userId = existingUser._id;
            
            req.session.save(err => {
                if(err) {
                    console.log(err);
                    res.render('login', {message: "Server error, please try again later"});
                } else {
                   return  res.redirect('/home'); 
                }
            });      
        }
        else{
            return res.render('login',{message:"Invalid password"})

        }
        

    }
    catch(err){
        console.log("error in login is ",err);
        res.render('login',{message:"user Cant be loggined due to server issue contact server support"})

    }
}
exports.allUsers=(req,res)=>{
    Users.find().then(response=>{
        res.json(response);
    }).catch(err=>res.json(err))
}
exports.logout=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}