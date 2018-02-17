//required config files
require("./config/db");


var express       = require("express");
var app           = express();
var path          = require("path");
var bodyParser    = require("body-parser");
var morgan        = require("morgan");


//adding routes
var api           = require("./api/routes");
var applicaition  = require("./app/routes");


//add static files to be accessable 
app.use(express.static(path.join(__dirname,"public")));
app.use("/node_modules",express.static(__dirname + '/node_modules'));

//setup server log 
app.use(morgan("dev"));
// set up the ejs view engine
app.set("view engine", "ejs");
//setup body parser
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api',api);
app.use('/',applicaition);


var server = app.listen(process.env.PORT || "8080   ",function (err) {
    console.log("App Running At PORT: "+ server.address().port);
});