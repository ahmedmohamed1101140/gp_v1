var multer  = require("multer");
const path = require("path");

//set Storage Engin
const Storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init the uplad
const upload = multer({
    storage: Storage,
    fileFilter: function(req , file , cb){
        chech_file_type(file,cb);
    }
}).single('my-file');


//chech file type
function chech_file_type(file, cb){
    // Allowd Extentions
    const FileType = /txt|xml|csv|pdf|rar|docx/;
    //check the extentions
    const extname = FileType.test(path.extname(file.originalname).toLowerCase());
    //check the mime type
    const mimiType = FileType.test(file.mimetype);

    if(mimiType&&extname){
        return cb(null,true);
    }
    else{
        cb("Error: Files Only!");
    }
}

module.exports = upload;
