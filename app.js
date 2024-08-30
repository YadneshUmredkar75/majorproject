const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local"); // Use passport-local
const User = require("./models/user.js"); // Your User model

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const usersRouter= require("./routes/users.js");

// Middleware and configurations
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsmate);

const sessionop = {
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionop));
app.use(flash());

// User Authentication / Authorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
});

// Routes
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", usersRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

// DB Connection
main().then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/app");
}

// Test Route to Create a User
// app.get("/user", async (req, res) => {
//     let user = new User({
//         email: "student@gmail.com",
//         username: "user1",
//     });
//     let Us = await User.register(user, "Password");
//     res.send(Us);
// });

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});