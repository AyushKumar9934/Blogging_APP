
const {signup,login,loginPage,register,allUsers} =require('./controller/userController.js')
const requireAuth=require('./utils/auth')
const express=require("express")
const router=express.Router();
router.get('/signup',signup)
router.get('/login',loginPage)
router.post('/register',register)
router.post('/login',login)
// router.get('/alluser',requireAuth,allUsers);   


module.exports=router;