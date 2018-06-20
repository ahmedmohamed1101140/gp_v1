const joi = require('joi');
const fs = require('fs');
var Comment     = require("../models/comment");
var middlewareObj = {};
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
    

}
// Check The user owner this comment 
middlewareObj.validate_user=function(req,res,next){
    Comment.findById(req.params.id,function(err,commentFind){
        if(err)
        {   
         req.flash("error" , "Error Happen ...Please Try Again");
        }
        else
        {
                if(req.user.id==commentFind.author.id)
                {
                     next();
                }
                else
                {
                    req.flash("error" , "Can not Edit/Delete This Comment .");
                    res.redirect("back");
                }
        }
    });

}

module.exports = middlewareObj;