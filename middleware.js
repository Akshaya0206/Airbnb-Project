const listing = require("./models/listing.js");
const {listingSchema,reviewSchema}=require("./Schema.js");
const ExpressError=require("./utils/ExpressError.js");
const Review = require("./models/reviews.js");
module.exports.validatelisting = (req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
         let errMsg=error.details.map((el)=> el.message).join(",");
         throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validatereview = (req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
         let errMsg=result.error.details.map((el)=> el.message).join(",");
         throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        if(req.session.redirectUrl.includes("?")){
            req.session.redirectUrl="/listings";
        }
        req.flash("error","You must be Logged in");
        return res.redirect("/login");
    }
    next();
}
module.exports.savedredirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isowner=async(req,res,next)=>{
    let {id} = req.params;
    let list=await listing.findById(id);
    if(!list.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the owner of the listing");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.isauthor=async(req,res,next)=>{
    let {id,reviewid} = req.params;
    let review=await Review.findById(reviewid);
    if(!review.author._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the owner of the Review");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

