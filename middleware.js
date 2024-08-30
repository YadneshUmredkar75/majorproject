module.exports=isLogin=(req,res,next)=>{
   if(  !req.isAuthenticated()){
     req.session.redirectUrl=req.originalUrl;
     req.flash("error","you must be login cerate a listing");
     return res.redirect("/login");
   }
   next();
}

module.exports.saveRedirect=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}