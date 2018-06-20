var mongoose = require("mongoose");


// schema set up
var departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    key:{
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    objectives:[
        {
            type: String,
            required: true
        }
    ],
    opinions: [
        {
            type: String,
        }
    ],
    since:{
        type: String,
        required: true
    },
    courses_file:{
        type: String,
        required: true,
    },
    logo:{
        type: String,
        required: true,
    },
    student_num:{
        type: Number,
        default: 0
    },
    graduated_num: {
        type: Number,
        default: 0
    }
});



// create department model using the schema and export it
module.exports = mongoose.model("Department", departmentSchema);


//admin students courses to be add soon
