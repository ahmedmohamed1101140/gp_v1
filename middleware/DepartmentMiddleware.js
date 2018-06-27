const joi = require('joi');
const fs = require('fs');
var middlewareObj = {};

middlewareObj.validate_data = function(req,res,next){
    
    var bool = true;
    var error_message;
    // Vali
    // dation Schema
    const schema = joi.object().keys({
        name:          joi.string().required(),
        key:           joi.string().required(),
        description:   joi.string().required(), //max length
        since:         joi.number().max((new Date).getFullYear()).min(1970).required()
    });

    // Data to be validated
    const data = {
        name:        req.body.dep_name,
        key:         req.body.dep_key,
        description: req.body.dep_description,
        since:       parseInt(req.body.dep_date)
    };


    
    //joi validate function
    joi.validate(data , schema , function(err,result){
        if(err){
            console.log(err.message);
            bool = false;
            error_message = err.message;
        }
        else if(req.files.length !== 4){
            error_message = (4 - req.files.length) +" File Missing";        
            console.log(error_message);
            bool = false;        
        }
        else{
            console.log(result);
            console.log("success");
            next();
        }
    });

    //check if error happens and delete all uploaded file with this request
    if(!bool){
        for(i=0;i<req.files.length;i++){
            delete_file(req.files[i].filename);
        }
        var error = new Error(error_message)        
        next(error); 
    }
};


    
module.exports = middlewareObj;

//static function for deleting file
delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
//        console.log(stats);//here we got all information of file in stats variable
        if (err) {
            return console.error(err);
        }
        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
};