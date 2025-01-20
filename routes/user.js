const express = require("express");
const router=express.Router();
const user=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedredirectUrl} = require("../middleware.js");
const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(savedredirectUrl,
    passport.authenticate(
    "local",
    {
        failureRedirect:"/login",
        failureFlash:true,
    }),userController.login);

router.get("/logout",userController.logout);

module.exports=router;