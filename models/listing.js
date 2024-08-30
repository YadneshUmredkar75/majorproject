const mongoose = require("mongoose");
const review = require("./review");
const Review = require("./review");




const listall = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: { type: String, required: true, default: "default_filename" },
        url: { type: String, default: "https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg" },
    },
    
    // price: Number,
    price: {
                type: Number,
                required: true,
                validate: {
                    validator: function(value) {
                        return !isNaN(value);
                    },
                    
                }
            },
    location: String,
    country: String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]
});
listall.post("findOneAndDelete",async(listlist)=>{
    if(listlist){
await Review.deleteMany({_id:{$in: listall.review }});
}
})
const Listing = mongoose.model("Listing", listall);
module.exports = Listing;



