const express = require("express");
const app     = express();
var user      = require("./users");
var department = require("./department");
var emails= require("./email");
var course = require("./course");


app.use("/users", user);
app.use("/departments",department);
app.use("/courses",course);
app.use("/mails",emails);

module.exports = app;