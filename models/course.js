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
        type: String,
        required: true
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
  
    student_registrated:[{
    
         
              type: mongoose.Schema.Types.ObjectId,
              ref: "user"
          
         

    }],
    yearwork:[{
        name:{type:String},
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




});



// create course model using the schema and export it
module.exports = mongoose.model("courses", courseSchema);


//admin students courses to be add soon
