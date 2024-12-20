const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const {isLoggedin,isowner,validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedin,listingController.renderNewForm);
router
    .route("/category/:category")
    .get(listingController.categoryListings)
router
    .route("/search")
    .post(isLoggedin,wrapAsync(listingController.searchListing))
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isowner,isLoggedin,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.updateListing))
    .delete(isowner,isLoggedin,wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isowner,isLoggedin,wrapAsync(listingController.renderEditForm));

module.exports=router;