var nodemailer = require("nodemailer");
var Department = require("../../models/department");
var User       = require("../../models/user");
var Groups     = require("../../models/group");
var MailController = {};



MailController.send_new_mail = function(req,res,next){
    console.log(req.body);
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            //user: process.env.MY_EMAIL,
            //pass: process.env.MY_PASSWORD
            user: "fcis.ch.lms@gmail.com" ,
            pass: "lms12345"
        }
    });

    var maillist = [
        'ahmedmohamed1101140@outlook.com',
        'esammohamed17121996@gmail.com',
      ];
  /*    req.body.recivers.forEach(element => {
        maillist.push(element);          
      });    
*/
      var emails = req.body.more_mails.split(",");
      emails = emails.map(function(val){
        maillist.push(val);
      });
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
            res.status(500).json({
                error: "Faild"
            });
        }
        else{
            console.log("mail Sent " + info.response);
            res.status(200).json({
                message:"Success"
            });
        }
    });
    
}



module.exports = MailController;