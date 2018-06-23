const joi = require('joi');
const fs = require('fs');
var Post = require("../models/post");
var middlewareObj = {};
// check the data Correct or not 
    middlewareObj.validate_data = function(req,res,next){
        var bool = true;
        var error_message;
        // Validation Schema
        const schema = joi.object().keys({
            content:   joi.string().required(), 
        });
    
        // Data to be validated
        const data = {
            content:       req.body.content,
        };        
        //joi validate function
        joi.validate(data , schema , function(err,result){
            if(err)
            {
                req.flash("error" , "Invalid Input ...Please Try Again");
                error_message = err.message;
            }
            else
            {
                next();
            }
        });
};
//check the user owner this post or not 
middlewareObj.validate_user=function(req,res,next){
    Post.findById(req.params.id,function(err,postFind){
        if(err)
        {
            req.flash("error" , "Error Happen ...Please Try Again");
        }
        else
        {
                if(req.user.id==postFind.author.id)
                {
                     next();
                }
                else
                {
                    req.flash("error" , "Can not Edit/Delete This post .");
                    res.redirect("back");
                }
        }
    });
}
module.exports = middlewareObj;