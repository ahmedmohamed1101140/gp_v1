var mongoose = require("mongoose");


// schema set up
var courseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
    dependencies :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
  
    logo:{
        type: String,
        required: true,
    },
    ratings:{
        rating: Number,
        num_ofratings:Number

        
    },
    maxstudent_num: {
        type: Number,
        default: 0
    },
    minstudent_num: {
        type: Number,
        default: 0
    },
    main_professor:
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:true
    },
    helper_professor:
    [{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        
    }],
    department:
    [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "department"
    }],
    objectives:
    [
        {
            type:String
        }
    ],
  
    student_registrated:[{
              type: mongoose.Schema.Types.ObjectId,
              ref: "user"
    }],
    yearwork:[{
        name:{type:String,/*unique: true*/ },
        totalgradescore:{ type: Number },
        precentage:{ type: Number  },
    }],
    hours:{
        type:Number,
        required:true
    },
    registartion_closeday:
    {
        type:Date,
        required:true

    },
    lecturestaken:{
        type:Number,
        default:1
    },
    labstaken:{
        type:Number,
        default:1
    },
    sectionstaken:{
        type:Number,
        default:1
    },

    upload_date:
    {
        type:Date,
        default: Date.now()

    },


});



// create course model using the schema and export it
module.exports = mongoose.model("courses", courseSchema);


//admin students courses to be add soon
