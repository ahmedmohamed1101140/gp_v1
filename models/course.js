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
    related_fields:{
        type: String,
        required: true
    },
  
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
        /*  id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },*/
        type:String,
        required:true
    },
    helper_professor:
    [{
        type:String
      /*  id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },*/
       
     
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
    lessons:
    {
         type:String,
          /*  id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },*/
           default:""
        
    },
    student_registrated:[{
    
        /*  id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          },*/
          type:String,
          default:""


    }],
    hours:{
        type:Number,
        required:true
    },
    registartion_closeday:
    {
        type:Date,
        required:true

    }




});



// create course model using the schema and export it
module.exports = mongoose.model("courses", courseSchema);


//admin students courses to be add soon
