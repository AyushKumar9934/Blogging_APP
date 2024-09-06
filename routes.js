
const {signup,login,loginPage,register,allUsers,logout} =require('./controller/userController.js')
const {home, myblogs,addblog,createBlog,deleteBlog,editBlog,postEditBlog} =require('./controller/blogController')
const {checkAuth} =require('./utils/auth.js')
const {requireAuth}=require('./utils/auth')
const express=require("express")
const router=express.Router();
router.get('/signup',signup)
router.get('/login',loginPage)
router.post('/register',register)
router.post('/login',login)
// router.get('/alluser',requireAuth,allUsers);   
router.get('/logout',logout)
router.get('/',home)
router.get('/home', home);

router.get('/myblogs',myblogs)
router.get('/addblog',requireAuth, addblog)
router.get('/editblog',editBlog);
router.post('/createblog',createBlog)
router.get('/deleteblog',requireAuth,deleteBlog);
router.post('/editblog',postEditBlog);

module.exports=router;