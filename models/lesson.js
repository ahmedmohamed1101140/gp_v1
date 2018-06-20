var mongoose = require("mongoose");


// schema set up
var lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
    upload_user:
    { type: String,
        required: true,


 
    },
    file:
    {
       type: String,
       required: true
    },
 
 
    upload_date:
    {
        type:Date,
        required:true,
        default: Date.now()

    },
    course_id:
    {

        type: mongoose.Schema.Types.ObjectId,
        ref:"course"
    }




});



// create course model using the schema and export it
module.exports = mongoose.model("lesson", lessonSchema);