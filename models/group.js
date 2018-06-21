var mongoose = require("mongoose");
// schema set up
var groupSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    image: {type: String ,default:"https://d30zbujsp7ao6j.cloudfront.net/wp-content/uploads/2017/07/unnamed.png"},
    
    description:{type : String },
    members_num: {type: Number, default: 1},
    post_num: {type: Number, default: 0},
    created_at: {type: Date , default: Date.now()},
    admin: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        userimage: String
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    users: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        userstatus: Number
        // userstatus to check if allowed to visit or not 
        // 0 not allow 1 allowed 
    }]
});

groupSchema.pre("remove",function (next) {
    
});


// create groups model using the schema and export it
module.exports = mongoose.model("Group", groupSchema);
