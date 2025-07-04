const user=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newuser = new user({username,email});
        let r=await user.register(newuser,password);
        console.log(r);
        req.login(r,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

// module.exports.login = async(req,res)=>{
//     req.flash("success","Welcome back to WanderLust!");
//     let redirecturl=res.locals.redirectUrl||"/listings";
//     res.redirect(redirecturl);
// }
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    const redirectUrl = req.session.returnTo || "/listings";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
}