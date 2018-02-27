const express = require("express");
const app     = express();
var user      = require("./users");
var department = require("./department");

app.get("/",function(req,res){
        res.render("index");
})
app.use("/users", user);
app.use("/departments",department);


module.exports = app;