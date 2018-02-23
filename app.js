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
app.use(bodyParser.json());

//CORS Headers For security issues
app.use(function (req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/api',api);
app.use('/',applicaition);





//normal errors handling
app.use(function (req,res,next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//custom app error handling
app.use(function (error,req,res,next) {
   res.status(error.status || 500);
   res.json({
       error:{
           message: error.message
       }
   });
});

var server = app.listen(process.env.PORT || "8080   ",function (err) {
    console.log("App Running At PORT: "+ server.address().port);
});