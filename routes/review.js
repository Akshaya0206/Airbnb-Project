const express = require("express");
const router = express.Router({mergeParams:true});
const listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const {validatereview,isLoggedin,isauthor,savedredirectUrl}=require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//review routes
//post review route
router.post("/",isLoggedin,validatereview,wrapAsync(reviewController.createReview));
//delete review route
router.delete("/:reviewid",isLoggedin,isauthor,wrapAsync(reviewController.destroyReview));


module.exports=router;