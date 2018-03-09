var nodemailer = require("nodemailer");
var MailController = {};

MailController.display_creation_form = function(req,res,next){
    res.render("Emails/new");
}

MailController.get_all_mails = function(req,res,next){
    res.render("Emails/index");    
}

MailController.send_new_mail = function(req,res,next){

}



module.exports = MailController;