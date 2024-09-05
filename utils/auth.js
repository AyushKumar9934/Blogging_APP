exports.requireAuth=(req,res,next)=>{
    if(!req.session.userId){
         return res.redirect('/login')
    }
    next();

}
exports.checkAuth=(req,res,next)=>{

    res.locals.isAuthenticated=req.session.userId?true:false;
 
    next();
}
