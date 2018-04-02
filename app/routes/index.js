
var course =require("./course")

const express  = require("express");
const app      = express();
var user       = require("./users");
var department = require("./department");
var emails     = require("./email");
var group      = require("./group");
var post       = require("./post");
var comment    = require("./comment");


app.get("/",function(req,res){
        res.render("index");
})
app.use("/users", user);
app.use("/departments",department);

app.use("/courses",course);



app.use("/mails",emails);
app.use("/groups",group);
app.use("/groups/:group_id",post);
app.use("/groups/:group_id/:post_id/comments",comment);

module.exports = app;