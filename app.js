//required config files
require("./config/db");

var express          = require("express");
var app              = express();
var path             = require("path");
var bodyParser       = require("body-parser");
var morgan           = require("morgan");
const passport       = require("passport");
var method_override  = require("method-override");
var flash            = require("connect-flash");


//adding routes
var api           = require("./api/routes");
var applicaition  = require("./app/routes");
var api_check     = require("./config/agent_check");

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


//setup method override for delete-put-patch routes
app.use(method_override("_method"));

//setup connect flash for user flash messages
app.use(flash());

app.use(require("express-session")({
    secret: "learning Managment system",
    resave: false,
    saveUninitialized: false
}));


//passport
app.use(passport.initialize()); //can be in a folder ? will see
app.use(passport.session());
require("./config/passport");

//handling errors with flash messages
app.use(function (req,res,next) {
    res.locals.CurrentUSer = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


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


//app.use('/api',api);
app.use('/',applicaition);



// //custom app error handling
// app.use(function (error,req,res,next) {
//     res.status(error.status || 500);
//     if(api_check(req)){

//         res.json({
//             error:{
//                 message: error.message
//             }
//         });
//     }else {
//         req.flash("error", error.message);
//         res.redirect("back");
//     }
// });

var server = app.listen(process.env.PORT || "8080   ",function (err) {
    console.log("App Running At PORT: "+ server.address().port);
});
