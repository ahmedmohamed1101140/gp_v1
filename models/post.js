var mongoose = require("mongoose");

// schema set up
var postSchema = new mongoose.Schema({
    content: String,
    image: {type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCoBDlwjg4T9SJLEoUAN0rrpXlT90feLDZmgMOB8k6jSibFja"},
    comments_num: {type: Number, default: 0},
    created: {type: Date , default: Date.now()},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        userimage: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// create post model using the schema and export it
module.exports = mongoose.model("Post", postSchema);

