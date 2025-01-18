const listing = require("../models/listing.js");
const forwardGeocode = require('./geocoding');
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

module.exports.index=async (req,res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.categoryListings=async(req,res)=>{
    let cat=req.params.category
    console.log(cat);
        const categorylistings= await listing.find({category:cat});
        console.log(categorylistings);
        if (categorylistings.length === 0) {
            req.flash("error", "Listings are not available in this category!");
            return res.redirect('/listings'); 
          }
        res.render("listings/category.ejs",{categorylistings,category:cat});        
}
module.exports.searchListing=async(req,res)=>{
    let listtitle=req.body.title;
    console.log(req.body);
    let list= await listing.find({title:listtitle});
    console.log(list);
    if(!list){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let id=list[0]._id;
    console.log(list[0]._id);
    res.redirect(`/listings/${id}`);

}
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    }).populate("owner");
    if(!list){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}

module.exports.createListing=async(req,res,next)=>{
    let geotype=null;
    let geocoordinates=null;
    const query = req.body.listing.location;
    const results = await forwardGeocode(query);
    if (results && results.length > 0) {
        for (const result of results) {
          if (result.geometry) {
            console.log("Geometry Type:", result.geometry.type);  
            console.log("Coordinates:", result.geometry.coordinates); 
            geotype = result.geometry.type;
            geocoordinates = result.geometry.coordinates;
            break;
          }
        }
    } else {
      console.log("No results to display.");
    }
    if (!geotype || !geocoordinates) {
        console.log("Error: Geometry data not found.");
        req.flash("error", "Failed to create listing: missing geometry data.");
        return res.redirect("/listings");
    }
    console.log(geocoordinates);
    let url=req.file.path;
    let filename=req.file.filename;
    let newlist = new listing(req.body.listing);
    newlist.owner = req.user._id;
    newlist.image={url,filename};
    newlist.geometry = {type:geotype,coordinates:geocoordinates };
    let newlisting= await newlist.save();
    console.log(newlisting);
    req.flash("success","New listing created!");
    res.redirect("/listings"); 
}

module.exports.renderEditForm = async (req,res)=>{
    let {id}=req.params;
    let editlist = await listing.findById(id);
    if(!editlist){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalimageurl = editlist.image.url;
    originalimageurl = originalimageurl.replace("/upload","/upload/w_250");
    console.log(originalimageurl);
    res.render("listings/edit.ejs",{editlist,originalimageurl});
}

module.exports.updateListing=async(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let list=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        list.image={url,filename};
        if (req.body.listing.location) {
            const results = await forwardGeocode(req.body.listing.location);
            if (results && results.length > 0 && results[0].geometry) {
                list.geometry = {
                    type: results[0].geometry.type,
                    coordinates: results[0].geometry.coordinates
                };
            }
        }        
        await list.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}