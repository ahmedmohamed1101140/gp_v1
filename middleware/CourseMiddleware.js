const validate = require('validate-data');
const fs = require('fs');
var middlewareObj = {};

middlewareObj.validate_data = function(req,res,next){
    var bool = true;
    // Validation rules
    const rules = {
        required: "name type description registartion_closeday ",
        string:   "name type description ",
        Date:   "registartion_closeday"
    };

    // Data to be validated
    const data = {
        name: req.body.course_name,
        type: req.body.course_type,
        description: req.body.course_description,
        registartion_closeday: req.body.course_registartion_closeday
    };

    let error = validate(data,rules); 
    if(error){      
        console.log(error); 
        bool = false;
    }
    else if( new Date (data.registartion_closeday).getTime <= (new Date()).getTime() ){
        console.log(data.registartion_closeday);
        console.log("Incorrect Year Date")
        bool = false;
    }
    else if(req.files.length !== 1){
        console.log(1-req.files.length+" File Missing");
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