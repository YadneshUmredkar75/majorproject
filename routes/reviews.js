const express = require("express");
const router = express.Router({mergeParams:true});//In Express.js, mergeParams: true allows child routes to access parameters from their parent routes.
const Listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/async.js");
const ExpressError = require("../utils/ExpressError.js");

router.post("/", wrapAsync(async (req, res) => {
    const listlist = await Listing.findById(req.params.id);  
    let newReview = new Review(req.body.review);
   listlist.reviews.push(newReview);

    await newReview.save();
    await listlist.save();

    console.log("Review sent");
  
    res.redirect(`/listing/${listlist._id}`);
  }));
//   review rout delete
// app.delete("lsitings/:id/review/:reviewId",wrapAsync(async(req ,res ,next)=>{
//     const {id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`listings${id}`);
// }))
//   review rout delete
router.delete("/:reviewId", wrapAsync(async(req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a);
    // res.send("working")
    res.redirect(`/listing/${id}`);
}));
module.exports=router;