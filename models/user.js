// import package
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// create a User schema
var UserSchema = new mongoose.Schema({
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ],
    username :{
        type: String,
        unique: true
    },
    password :String,
    firstname :{
        type: String,
        default: null
    },
    collage_id:{
        type:String
    },

    lastname :{
        type: String,
        default: null
    },
    
    email :{
        type: String,
        default:null
    },

    image : {
        type: String,
        default:"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
    },
    usertype :{
        type: Number,
        default:4
    }, //0 is admin 1 is instructor 2 is TA 3 is staff 4 is Student
    created :{
        type: Date,
        default: Date.now()
    },
    department_name :{
        type: String,
        //default:null
    },
    department_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Department", 
    },
    year :{
        type: String,
       // default:null
    },
    changed:{
        type:Number,
        default:0
    },
    courses:[
        {
        id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"courses",  }
        ,
        total:{type:Number,default:0},
        year:{type:Number,default:2014},
        season:{type:String,default:"Spring"},
        attendance:[{
            attendancetype:{ type: String},
            number:{ type: Number},
            attended:{ type: Boolean,default:false},
            date:{ type: Date , default: Date.now()}

        }],
        grade:[{
            name:{ type: String },
            gradescore:{ type: Number,default:0},
        }]
    }]
,
    notifications:{
        new_notifcations:{
            type:Number,
            default:0
        },
        items:[{
            creator:{ type: String },
            content:{ type: String },
            link:   { type: String },
            time:   { type: Date , default: Date.now()}
        }]
    },
    office_hours :
        [{
            day:{ type: String },
            hour:{ type: String }, 
        }],
});


UserSchema.plugin(passportLocalMongoose); // adding method to user
// export the model
module.exports = mongoose.model("User", UserSchema);