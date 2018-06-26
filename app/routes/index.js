
var course =require("./course")

const express  = require("express");
const app      = express();
var user       = require("./users");
var department = require("./department");
var emails     = require("./email");
var group      = require("./group");
var post       = require("./post");
var comment    = require("./comment");
var lesson    = require("./lesson");
var announcement= require("./announcement");





app.get("/",function(req,res){
        res.render("index");
})
app.get("/AboutUs",function(req,res){
        res.render("AboutUs");
})
app.use("/users", user);
app.use("/departments",department);

app.use("/courses",course);
app.use("/courses/:course_id/announcement",announcement);

app.use("/courses/:course_id",lesson);





app.use("/mails",emails);
app.use("/groups",group);
app.use("/groups/:group_id",post);
app.use("/groups/:group_id/:post_id/comments",comment);

module.exports = app;