const validate = require('validate-data');
const fs = require('fs');
var middlewareObj = {};

middlewareObj.validate_data = function(req,res,next){
    var bool = true;
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

    let error = validate(data,rules); 
    if(error){      
        console.log(error); 
        bool = false;
    }
    else if(data.since.toString().length !== 4 || data.since > (new Date()).getFullYear() || data.since < 1950){
        console.log(data.since);
        console.log("Incorrect Year Date")
        bool = false;
    }
    else if(req.files.length !== 3){
        console.log(3-req.files.length+" File Missing");
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