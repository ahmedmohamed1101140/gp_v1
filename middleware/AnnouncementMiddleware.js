const joi = require('joi');
const fs = require('fs');
var middlewareObj = {};

middlewareObj.validate_data = function(req,res,next){
    console.log("here");

    var bool = true;
    var error_message;
    // Validation rules


    const schema = joi.object().keys({
        name2:          joi.string().required(),
        description:   joi.string().required(),
    });

    console.log(req.body);
    // Data to be validated
    const data = {
        name2: req.body.announcement_name,
        description: req.body.announcement_description,
    };

    joi.validate(data,schema,function(err,result){ 

        if(err){      
            console.log("here");

            console.log(err.message); 
            bool = false;
            error_message = err.message;

        }
        
        else{ 
            console.log(result);
              console.log("success");
            next();
        }
    });

 
};

module.exports = middlewareObj;

//static function for deleting file

