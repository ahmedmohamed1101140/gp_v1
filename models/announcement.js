var mongoose = require("mongoose");


// schema set up
var announcementSchema = new mongoose.Schema({
    name: {
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
        default:"mr.ramy"


 
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
module.exports = mongoose.model("announcement", announcementSchema);