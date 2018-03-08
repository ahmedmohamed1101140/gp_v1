var passport       =require('passport');
var middlewareObj = {};
var User = require("../models/user");
const joi = require('joi');


middlewareObj.Pasport_auth= passport.authenticate("local", {
    successRedirect: "/Users/secret",
    failureRedirect: "/api/Users/fail"
})

//should be change to web token
middlewareObj.Pasport_auth_statelss=
    passport.authenticate("local", {session:false})

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



//validation for register-and- log in
middlewareObj.user_acc_validation=function(req,res,next) {
    const schema = joi.object().keys({
        username: joi.string().required(),
        password: joi.string().min(8).required(),
    });

    const data = {
        username:  req.body.username,
        password:  req.body.password,
    };
    joi.validate(data , schema , function(err,result){
        if(err){
            console.log(err.message);
            next(err);
        }
        else{
            console.log(result);
            next();
        }
    });

}

middlewareObj.user_info_validation= function (req,res,next) {



}


/*
  username :{
        type: String,
        unique: true
    },
    password :String ,
    firstname :{
        type: String,
        default: null
    },

    collage_id:{
        type:String
    },

    lastname :{
        type: String,
        default: null
    },
    email :{
        type: String,
        default:null
    },
    image : {
        type: String,
        default:"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
    },
    usertype :{
        type: Number,
        default:2
    }, //0 is admin 1 is instructor 2 is student
    created :{
        type: Date,
        default: Date.now()
    }
});


*/





    module.exports = middlewareObj;