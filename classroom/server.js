const express= require("express");
const app = express();
const session=require("express-session");
const flash=require("connect-flash");
app.use(session({
    secret:"Mysupersecretcode",
    resave:false,
    saveUninitialized:true,
}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.smsg=req.flash("success");
    res.locals.fmsg=req.flash("failure");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(req.session.name){
        req.flash("success","user registered successfully");
    }else{
        req.flash("failure","user not registered");
    }
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.render("home.ejs",{name:req.session.name});
})
app.listen(3000,()=>{
    console.log("Server was listinig on port 3000");
})