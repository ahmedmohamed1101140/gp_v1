const joi = require('joi');
const fs = require('fs');
var middlewareObj = {};
    middlewareObj.validate_data = function(req,res,next){
    
        var bool = true;
        var error_message;
        // Validation Schema
        const schema = joi.object().keys({
            name:          joi.string().required(),
            image:         joi.string().required(),
            description:   joi.string().required(), 
          
        });
    
        // Data to be validated
        const data = {
            name:          req.body.name,
            image:         req.body.image,
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

module.exports = middlewareObj;