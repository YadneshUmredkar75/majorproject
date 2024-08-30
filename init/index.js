const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const init = require("./data.js");

main().then(res=>console.log("Connected DB"))
.catch(err=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/app");
}

const initdata=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(init.data);
    console.log("Hi");
}
initdata();