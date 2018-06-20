var nodemailer = require("nodemailer");
var Department = require("../../models/department");
var User       = require("../../models/user");
var Groups     = require("../../models/group");
var async      =require("async");


var MailController = {};


MailController.get_all_mails = function(req,res,next){
    res.render("Emails/index");
}

MailController.display_creation_form = function(req,res,next){
    Department.find().select("name").exec(function(err,departments){
        if(err){
            console.log(err.message);
            req.flash("error" , "Sorry Server Error!");
            res.redirect("/mails");
        }
        else{
            User.find().select('username department_name year').exec(function(err,users){
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
                            res.render("Emails/new" , {departments:departments , users:users , groups:groups});
                        }
                    });    
                }
            });
        }
    });
}

MailController.send_new_mail = function(req,res,next){
   
    console.log("the req body recivers =");
    console.log(req.body.recivers);
   var faild_users=[];
    var maillist = [
        //'ahmedmohamed1101140@outlook.com',
       // 'esammohamed17121996@gmail.com',
      ];
    /*
      var emails = req.body.more_mails.split(",");
      emails = emails.map(function(val){
        maillist.push(val);
      });
*/

    
    async.each(req.body.recivers, function(user_id, done){
        User.findById(user_id,function(err,user){
            if(err){
                console.log(err);
            }
            else if(user){
             
                if(user.email!=null){
                maillist.push(user.email);
               }else{
                faild_users.push(user._id);
               }

            }else if(!user){
   
                console.log("the user id doesn`t exits");
            }
            done();
        })
    },function(err){

        if(err){console.log(err);}

        var mailOptions = {
            from: 'ahmedmohamed1101140@gmail.com',
            subject: req.body.subject,
            text: req.body.content,
            cc: "*******",
            to: maillist
        };


        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                //user: process.env.MY_EMAIL,
                //pass: process.env.MY_PASSWORD
                user: "fcis.ch.lms@gmail.com" ,
                pass: "lms12345"
            }
        });
                
            console.log("the email in the maillist=");
            console.log(maillist);
            console.log("el faedy=");
            console.log(faild_users);

    
        transport.sendMail(mailOptions , function(err , info){
            if(err){
                console.log(err.message);
                req.flash("error" , "Sorry Faild To Send Mail Try Again");
                req.redirect("/mails");
            }
            else{
                console.log("mail Sent " +info.response);
                req.flash("success" , "Mail Send Successfully only "+faild_users.length +" didn`t have emails");
                res.redirect("/mails");
            }
        });
        
 });   
}



module.exports = MailController;