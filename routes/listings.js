const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/async.js");
const ExpressError = require("../utils/ExpressError.js");
const {listall,reviewSchema} = require("../schema.js");
const mongoose = require("mongoose");
const isLogin=require("../middleware.js");

// router.get("/",(req,res)=>
//     {res.send("server was working");});

//index form
router.get("/",isLogin,async(req,res)=>{
   const allList=await Listing.find({});
   res.render("index.ejs",{allList} );

    
});
//create new list
router.get("/new",isLogin,(req,res)=>{
    

    res.render("create.ejs");
});

// validlate error
let validationerror=(req,res,next)=>{
const error=schema.validate(req.body);
       
        if(error){
            let erMsg = error.details.map((el)=>el.massage).join(",");
            throw new ExpressError(400,erMsg)
        }else{
          next();
        }
    }

//show route
// app.get("/listing/:id",async(req,res)=>{
//     const {id}=req.params;
//     const listlist=await Listing.findById(id).populate("reviews");
//     res.render("show.ejs",{listlist});
// });
// app.get("/listing/:id",async(req,res)=>{
//     const {id}=req.params;
//     const listlist=await Listing.findById(id).populate("reviews");
//     res.render("show.ejs",{listlist});
// });
router.get("/:id",isLogin,async(req,res)=>{
    const {id}=req.params;
    const listlist=await Listing.findById(id).populate("reviews");
    res.render("show.ejs",{listlist});
});
router.post("/",wrapAsync(async(req,res,next)=>{
        // const result=schema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error)
        // }
        
            const newListing = new Listing(req.body.listing);
            await newListing.save();
            req.flash("success","NEW Listing IS ADDEDING")
            res.redirect("/listing");
       
    
   
  
    
}));




//edit listing
router.get("/:id/edit",isLogin,async(req,res)=>{
    const {id}=req.params;
    const listlist=await Listing.findById(id);
    res.render("edit.ejs",{listlist});
});



// Update listings
router.put("/:id",isLogin,async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("error","LISTING NOT FOUND ");

    res.redirect(`/listing/${id}`);
  });



//Delete
router.delete("/:id",isLogin,async(req,res)=>{
    const {id}=req.params;
    const deletelist= await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    res.redirect("/listing");
   

});

module.exports=router;