const Blogs=require('../models/blogs.js')
const base64=require('base-64')

exports.home =async (req,res)=>{
    
    try{
        const perPage=3;
    const page=req.query.page||1;
    const sort=req.query.sort||'title'
        const blogs=await Blogs.find().sort({[sort]:1}).skip((perPage*page)-perPage).limit(perPage)

      const    count=await Blogs.countDocuments();
         const totalPages=Math.ceil(count/perPage)
        res.render('home',{message:null,blogData:blogs,current:page,pages:totalPages,sort})

    }catch(err){
        console.log("error in rendering home page",err);
        res.render('home',{message:null,blogData:null,sort})
        

    }
   
}
exports.myblogs=async(req,res)=>{
    try{
        const{ message}=req.query
    const userId=req.session.userId;
    
    const myBlogs=await Blogs.find({userId})
    console.log("myblogs is ",myBlogs);
    res.render('myblogs',{message:message?base64.decode(message):null,blogData:myBlogs})}
    catch(err){
        console.log('error in myblog due to server ',err);
    }
}
exports.addblog=(req,res)=>{
    res.render('addblog',{message:null})
}
exports.createBlog=(req,res)=>{
    try{
        const {title,body}=req.body;
        console.log("reqIdis",req.session);
        const newBlog=new Blogs({title,body,userId:req.session.userId})
        newBlog.save().then(response=>{
            res.redirect('/myblogs')

        }).catch(err=>{
           // console.log("err comes from server",err);
            res.render('addblog',{message:"blog cant be saved at this moment .try later "})
        });
    }catch(err){
        console.log(err);
        res.render('addblog',{message:"cant create a Blog due to server Error please try later "})
    }
   

}

exports.deleteBlog=(req,res)=>{
    try{
        const {blogId}=req.query;
        Blogs.findOneAndDelete({_id:blogId}).then(response=>{
           

            res.redirect('/myblogs')


        }).catch(err=>{
            const error=base64.encode('not deleted due to MD server error')
         
            res.redirect(`/myblogs?message=${error}`)
        })
    }
    catch(err){
        const error=base64.encode('cant delete right now  due to server Issue try latter')
        res.redirect(`/myblogs?message=${error}`)
    }
    
}
exports.editBlog=async (req,res)=>{
    try{
        const {blogId}=req.query;
        const blogData= await Blogs.findOne({_id:blogId})
        res.render('editblog',{message:null,blogData})
    }
    catch(err){
        const error=base64.encode('cant delete right now  due to server Issue try latter')
        res.redirect(`/myblogs?message=${error}`)

    }
   
}
exports.postEditBlog=(req,res)=>{
    try{
        const {title,body}=req.body;
        const {blogId}=req.query;
        Blogs.findByIdAndUpdate({_id:blogId},req.body).then(response=>{
            res.redirect('/myblogs')
        }).catch(err=>{
            console.log("err in mdb postedit blog",err);
            res.render('addblog',{message:'cant edit  blog due to MD serever issue '})



        })
        
    }
    catch(err){
        console.log("err in  postedit blog",err);
        res.render('addblog',{message:'cant edit a blog due to serever issue '})

        
    }
    

}