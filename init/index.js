const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");


main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"6740b5ad33a9461ba70181ed"}))
    await listing.insertMany(initdata.data);
    console.log("data was initialised");
}
initDB();