const mongoose = require("mongoose");
const review =require("./reviews.js");
const Schema = mongoose.Schema;
const listingschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    category:{
        type:String,
        required:true,
    },
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry : {
        type:{
            type:String,
            enum:["Point"],
            // required:true,
        },
        coordinates:{
            type:[Number],
            // required:true,
        },
    },
    
});

listingschema.post("findOneAndDelete",async(data)=>{
    if(data){
    await review.deleteMany({_id:{$in: data.reviews}});
    }
});


const listing = mongoose.model("listing",listingschema);
module.exports = listing;
