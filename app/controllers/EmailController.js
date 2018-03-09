var nodemailer = require("nodemailer");
var Department = require("../../models/department");
var User       = require("../../models/user");
var MailController = {};

MailController.display_creation_form = function(req,res,next){
    Department.find().select("name").exec(function(err,departments){
        if(err){
            console.log(err.message);
            req.flash("error" , "Sorry Server Error!");
            res.redirect("/mails");
        }
        else{
            User.find().select('username').exec(function(err,users){
                if(err){
                    console.log(err.message);
                    req.flash("error" , "Sorry Server Error!");
                    res.redirect("/mails");
                }
                else{
                    console.log(departments);
                    console.log(users);
                    res.render("Emails/new" , {departments:departments , users:users});    
                }
            });
        }
    });
}

MailController.get_all_mails = function(req,res,next){
    res.render("Email/index");
}

MailController.send_new_mail = function(req,res,next){
    console.log(req.body);
    res.send("ahmed");
}



module.exports = MailController;