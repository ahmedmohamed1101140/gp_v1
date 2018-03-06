var mongoose = require("mongoose");
// var  url = process.env.DATABASEURL || "mongodb://localhost/lms_app";
var  url = "mongodb://localhost/lms_app";

mongoose.connect(url); 
mongoose.Promise = global.Promise;


mongoose.connection.on("connected",function(){
    console.log("Mongoose DATABASE Connected at server" + url);
});

mongoose.connection.on("Disconnected",function(){
    console.log("Mongoose DATABASE Disconnected ");
});

mongoose.connection.on("error",function(err){
    console.log(err);
});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose Disconnected Through app Termination (SIGINT)");
        process.exit(0);
    });
});

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose Disconnected Through app Termination (SIGTERM)");
        process.exit(0);    
    });
});

process.on("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose Disconnected Through app Termination (SIGUSR2)");
        process.kill("process.pid", 'SIGUSR2')
    });
});

