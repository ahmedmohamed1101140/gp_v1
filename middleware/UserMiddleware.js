
var passport       =require('passport');
var middlewareObj = {};


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




module.exports = middlewareObj;