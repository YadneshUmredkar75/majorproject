// const mongoose = require("mongoose");
// const  passportLocalMongoose = require('passport-local-mongoose');

// const userSchema=new mongoose.Schema({
//     email:[{
//       type:String,
//       required:true,
//     }]
// });
// userSchema.plugin(passportLocalMongoose);
// const User = mongoose.model("User",userSchema);
// module.exports=User; 
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    }
});

// Tell passport-local-mongoose to use email as the username field
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model("User", userSchema);

module.exports = User;