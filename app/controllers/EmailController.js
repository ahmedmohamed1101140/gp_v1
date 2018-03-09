var nodemailer = require("nodemailer");
var Department = require("../../models/department");
var User       = require("../../models/user");
var Groups     = require("../../models/group");
var MailController = {};


MailController.get_all_mails = function(req,res,next){
    res.render("Email/index");
}

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
                    Groups.find().select("name").exec(function(err,groups){
                        if(err){
                            console.log(err.message);
                            req.flash("error" , "Sorry Server Error!");
                            res.redirect("/mails");
                        }
                        else{
                            console.log(groups)
                            console.log(departments);
                            console.log(users);
                            res.render("Emails/new" , {departments:departments , users:users , groups:groups});
                        }
                    });    
                }
            });
        }
    });
}

MailController.send_new_mail = function(req,res,next){
    console.log(req.body);
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });

    var maillist = [
        'ahmedmohamed1101140@outlook.com',
        'esammohamed17121996@gmail.com',
      ];
      maillist.push(req.body.email);
      console.log(maillist);

    var mailOptions = {
        from: 'ahmedmohamed1101140@gmail.com',
        subject: req.body.subject,
        text: req.body.content,
        cc: "*******",
        to: maillist
    };
    
    transport.sendMail(mailOptions , function(err , info){
        if(err){
            console.log(err.message);
        }
        else{
            console.log("mail Sent " +info.response);
            res.redirect("/mails");
        }
    });
    
}



module.exports = MailController;