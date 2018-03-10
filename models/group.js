var mongoose = require("mongoose");
// schema set up
var groupSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    image: {type: String , default: "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"},
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
    }]
});

groupSchema.pre("remove",function (next) {
    
});


// create groups model using the schema and export it
module.exports = mongoose.model("Group", groupSchema);
