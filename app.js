var express = require("express");
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;



passport.use(new Strategy ({
    clientID : "773707529772248",
    clientSecret: "5c54834660cee96edff42272f08930fe",
    callbackURL : "http://localhost:3000/login/facebook/return"
},
function (accessToken, refreshToken, profile, cb){
    return cb(null, profile);
}
)
);

passport.serializeUser(function (user, cb) {
    cb(null, obj);
    
})


//create express app

var app = express();

//set view dir

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({extended:true}));
app.use(require("express-session")({secret: "Saffron", resave : true, saveUninitialized: "true"}));


// @rote        -  Get /
//@desc         - a route to home page
//@access       -PUBLIC
app.get("/",(req,res)=>{
    res.render("home",{user:req.user});
});

// @rote        -  Get /login
//@desc         - a route to login
//@access       -PUBLIC

app.get("/login",(req,res)=>{
    res.render("login");
});


// @rote        -  Get /login/facebook
//@desc         - a route to facebook login page
//@access       -PUBLIC
app.get('/login/facebook',
  passport.authenticate('facebook')
  );


// @rote        -  Get /login/facebook/callback
//@desc         - a route to facebook login page
//@access       -PUBLIC
app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// @rote        -  Get /profile
//@desc         - a route to  PROFILE OF USER
//@access       -PRIVATE
app.get("/profile",require("connect-ensure-login").ensureLoggedIn(),(req,res)=>{
    res.render("profile",{user: req.user});
});
app.listen("3000");
