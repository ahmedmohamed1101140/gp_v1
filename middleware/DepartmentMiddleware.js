const validate = require('validate-data');
const fs = require('fs');
var middlewareObj = {};

middlewareObj.validate_data = function(req,res,next){
    var bool = true;
    var error_message;
    // Validation rules
    const rules = {
        required: "name key description since ",
        string:   "name key description ",
        number:   "since"
    };

    // Data to be validated
    const data = {
        name: req.body.dep_name,
        key: req.body.dep_key,
        description: req.body.dep_description,
        since: parseInt(req.body.dep_date)
    };

    let validate_error = validate(data,rules); 
    
    if(validate_error){      
        console.log(validate_error); 
        error_message = validate_error;
        bool = false;
    }
    else if(data.since.toString().length !== 4 || data.since > (new Date()).getFullYear() || data.since < 1950){
        error_message = "Incorrect Year Date " + data.since;        
        console.log(error_message);
        bool = false;
    }
    else if(req.files.length !== 3){
        error_message = (3 - req.files.length) +" File Missing";        
        console.log(error_message);
        bool = false;        
    }
    else{
        console.log("success");
        next();
    }

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