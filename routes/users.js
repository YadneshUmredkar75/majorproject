const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/async.js");
const saveRedirect=require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("form/signup.ejs");
});


router.post("/signup", wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listing");
    });
}));

router.get("/login", (req, res) => {
    res.render("form/login.ejs");
});

router.post("/login",saveRedirect, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}),async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirect=req.locals.redirectUrl||"/listing"
    res.redirect();
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out");
        res.redirect("/listing");
    });
});

module.exports = router;
