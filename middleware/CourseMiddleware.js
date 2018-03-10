const joi = require('joi');
const fs = require('fs');
var middlewareObj = {};
console.log("satage1");

middlewareObj.validate_data = function(req,res,next){
    var bool = true;
    var error_message;
    // Validation rules
    console.log("satage2");

    const schema = joi.object().keys({
        name:          joi.string().required(),
        type:           joi.string().required(),
        description:   joi.string().max(400).required(),
        registartion_closeday : joi.date().required()
   
    });

    // Data to be validated
    const data = {
        name: req.body.course_name,
        type: req.body.course_type,
        description: req.body.course_description,
        registartion_closeday: req.body.course_registartion_closeday
    };
    console.log("111");

    joi.validate(data,schema,function(err,result){ 
        if(err){      
            console.log(err.message); 
            bool = false;
            error_message = err.message;
            console.log("satage3");

        }
        else if( new Date (data.registartion_closeday).getTime <= (new Date()).getTime() ){
            console.log(data.registartion_closeday);
            console.log("Incorrect Year Date")
            bool = false;

        }
        else if(req.files.length !== 1){
            error_message=(1-req.files.length)+" File Missing";
            console.log(error_message);

            bool = false;       
        }
        else{ 
            console.log(result);
              console.log("success");
            next();
        }
    });

    if(!bool){
        for(i=0;i<req.files.length;i++){
            delete_file(req.files[i].filename);
        }
        var error = new Error(error_message)        
        next(error); 
    }
};

module.exports = middlewareObj;
console.log("satage4");

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
