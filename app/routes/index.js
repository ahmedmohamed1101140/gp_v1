const express = require("express");
const app     = express();
var user      = require("./users");
var department = require("./department");
var emails     = require("./email");

app.get("/",function(req,res){
        res.render("index");
})
app.use("/users", user);
app.use("/departments",department);
app.use("/emails",emails);


module.exports = app;