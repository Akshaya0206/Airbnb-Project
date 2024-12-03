const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    let list = await listing.findById(req.params.id);
    let newreview= new Review(req.body.review);
    newreview.author=req.user._id;
    await newreview.save();
    list.reviews.push(newreview);
    await list.save();
    console.log(list);
    req.flash("success","New Review added!");
    res.redirect(`/listings/${list._id}`);
}

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull: {reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
}