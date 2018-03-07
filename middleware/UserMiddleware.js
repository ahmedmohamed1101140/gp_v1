
var passport       =require('passport');

var middlewareObj = {};

var User = require("../models/user");


middlewareObj.Pasport_auth= passport.authenticate("local", {
    successRedirect: "/Users/secret",
    failureRedirect: "/Users/login"
})

middlewareObj.isLoggedIn =function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/Users/login");
}

middlewareObj.isAdmin =function (req,res,next) {

    if(req.isAuthenticated()){
        if(req.user.usertype === 0){
            return next();
        }
    }
   // res.redirect("/Users/login");
    res.status(200).send("only admins can do this ");
}




/*
middlewareObj.GUSER=function (req,res,next) {

    User.findOne({username:req.body.username}, function (err, user) {

        if(err){
            console.log(err);
            console.log("here0");
        }
        else if (!user.verifyPassword(req.body.password)) {
              consle.log("herr1")
            res.status(500).json({
                message:"auth failed"
            })
        }
        else {

            next();
        }
    });
}

*/
module.exports = middlewareObj;