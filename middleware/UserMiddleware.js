var passport       =require('passport');
var middlewareObj = {};
var User = require("../models/user");
const joi = require('joi');
const jwt          =require("jsonwebtoken");



middlewareObj.Pasport_auth= passport.authenticate("local", {
    failureRedirect: "/Users/login",
    failureFlash: 'Invalid username or password.' ,
})
    
middlewareObj.Pasport_auth_statelss= passport.authenticate("local", {session:false})


 middlewareObj.check_jwt_auth=function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};


middlewareObj.isLoggedIn =function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //res.redirect("/Users/login");
    res.redirect("/login");
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
//validation for creating students
middlewareObj.student_info_validation= function (req,res,next) {


    const schema = joi.object().keys({
        departemnt_name :joi.string().max(20).required(),
        studentscount: joi.number().min(1).max(1000).required(),
        collage_serial :joi.number().min(1).required(),
        year:joi.string().max(4).required()
    });

    const data = {
        departemnt_name: req.body.departemnt_name,
        studentscount: req.body.studentscount,
        collage_serial : req.body.collage_serial,
        year: req.body.year
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



middlewareObj.profile_data_valation=function (req,res, next) {


    const schema = joi.object().keys({
        lastname :joi.string().max(20).required(),
        firstname:joi.string().max(20).required(),
        username :Joi.string().alphanum().min(3).max(30).required(),
        email:joi.string().email()
        //img url
    });

    const data = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        username : req.body.username,
        email: req.body.email,

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