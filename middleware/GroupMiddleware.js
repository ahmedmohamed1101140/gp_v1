const joi = require('joi');
const fs = require('fs');
// all middlewares are here
var Post        = require("../models/post");
var Comment     = require("../models/comment");
var Group       = require("../models/group");
var User        = require("../models/user");
var middlewareObj = {};

//Check If this User Should enter this group or not
middlewareObj.isAllowed = function (req, res, next) {
    // is user logged in
    var x = 1;
    if (req.isAuthenticated()) {

        Group.findById(req.params.id ,function(err,foundGroup){
       if(err){
        req.flash("error","Error Happen please Try Again.");
        res.redirect("back");
       }else{
        if(foundGroup.admin.id==req.user.id)
        {   
            next();
            x=0;
        }
       }

        }); 

        User.findById(req.user._id).populate("groups").exec(function (err,foundUser) {
            foundUser.groups.forEach(function (group) {
                 if(group._id.equals(req.params.id)){
                   next();
                   x = 0;
               }
            });
            if(x === 1){
                req.flash("error","You Don't Have The Permission To Enter This Group ");
                res.redirect("back");
            }
        });
    } else {
        // send flash notification to user to log in first
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }

}

// middleware to check if the user Send pervious request or join this group or not
middlewareObj.checkStatus = function (req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // find if the user send previous request or not
        var x = 1;
        Group.findById(req.params.id).populate("users").exec(function (err,foundGroup) {
            if(err)
            {
                
            }
            else
             { 
                if(foundGroup.admin.id==req.user.id)
                {   
                  
                        req.flash("error", "Your Are The Admin Of This Group What You Doing ?!");
                        res.redirect("back");
                   
                }
                else
                 {
                      foundGroup.users.forEach(function (user) {
                        if(user.id==req.user.id)
                        {
                            x=0;
                            if(user.userstatus == 0)
                            {
                                req.flash("error", "Your Request Has Been Sent Wait until Acceptance!");
                                res.redirect("back");
                            }
                            else
                             {
                                req.flash("success", "You already Have The Access To Enter This Group!");
                                res.redirect("back");
                            }
                        }
                        
                    });

                    if(x == 1)
                    {
                        next();
                    }
                }
            }
        });

    }
     else 
     {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
     }
}
// middleware to check the Data
middlewareObj.validate_data = function(req,res,next){
        var bool = true;
        var error_message;
        // Validation Schema
        const schema = joi.object().keys({
            name:          joi.string().required(),
            description:   joi.string().required(), 
          
        });
    
        // Data to be validated
        const data = {
            name:          req.body.name,
            description:   req.body.description,
           
        };
    
    
        
        //joi validate function
        joi.validate(data , schema , function(err,result){
            if(err){
                console.log(err.message);
                req.flash("error" , "Invalid Input ...Please Try Again");
                error_message = err.message;
            }
            else
            {
                console.log(result);
                console.log("success");
                next();
            }
        });
};
//Check if The user is Admin or not 
middlewareObj.isAdmin = function (req, res, next) {
    if (req.isAuthenticated())
    {
        if(req.user.usertype === 0)
        {
            return next();
        }
        else if(req.user.usertype === 1)
        {
            return next();
        }
        else 
        {     
            req.flash("error", "You Have To be Admin or Instructor To Add new Group");
            res.redirect("/groups");
        }
    }
    else
    {
        req.flash("error", "You Have To Log In First");
        res.redirect("/groups");
    }
}

module.exports = middlewareObj;