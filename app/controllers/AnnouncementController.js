const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Announcement       = require("../../models/announcement");
var Course=       require("../../models/course");

var announcementController = {};

announcementController.show = function (req, res){

    announcement.findById(req.params.announcement_id,function(err,announcement_found){
        if(err){
             console.log(err.message);
             req.flash("error" , "Failed To Get announcement ... please Try Again.");
             req.redirect("back");
         }else{
            res.render("announcements/show",{announcement:announcement_found,course_id:req.params.course_id});
         }
    });
};
announcementController.showbycourseid = function (req, res){

    Announcement.find({ course_id: req.params.course_id},function(err,announcement_found){
        if(err){
             console.log(err.message);
             req.flash("error" , "Failed To Get announcement ... please Try Again.");
             req.redirect("back");
         }else{
            res.render("announcements/showall",{announcement:announcement_found,course_id:req.params.course_id});
         }
    });
};

announcementController.new_announcement = function(req,res){

    Course.findById(req.params.course_id,function(err , course_found){
        if(err)
        {
            console.log(err.message);
            req.flash("error" , "Failed To Add announcement ... please Try Again.");
            res.redirect("back");
        } 
        else{        

            res.render("announcements/new",{course:course_found});
        }
    });
};

announcementController.new_announcement_announcement =function(req,res){
    console.log("S!");

    Course.findById(req.params.course_id,function(err , course_found){
        if(err)
        {
            console.log("ERR");

            console.log(err.message);
            req.flash("error" , "Failed To Find course  ... please Try Again.");
            res.redirect("course/show");

        } 
        else{     
             var announcement = new Announcement({
                name: req.body.announcement_name,
                description:req.body.announcement_description,
                course_id:course_found._id,

            });
            Announcement.create(announcement,function(err,AnnouncementCreated){
                if(err)
                {
                    console.log(err.message);
                    req.flash("error" , "Failed To Create announcement / Invalid Data  ... please Try Again.");
                    res.redirect("back");
                }
                else
                {

                   
                   req.flash("success" , "announcement Created");
                   res.redirect("/courses/"+req.params.course_id);
                }
           });
          } 
    });
};


announcementController.announcement_edit =function(req,res){
    Announcement.findById(req.params.announcement_id,function(err , announcement_found){
        if(err)
        {
        console.log(err.message);
        req.flash("error" , "Failed To Find announcement  ... please Try Again.");
        req.redirect("back");
        } 
        else 
        {
            res.render("announcements/edit",{announcement:announcement_found,course_id:req.params.course_id});
        }
    });
};


announcementController.announcement_edit_put=function(req,res){
    console.log("hello");

    console.log(req.params.announcement_id);

    Announcement.findById(req.params.announcement_id,function(err,announcement_found){
        if(err){
            console.log(err.message);
            req.flash("error" , "Failed To Find announcement  ... please Try Again.");
            res.redirect("/courses/"+req.params.course_id);
        }
        else{
            console.log(req.params.announcement_id);

            announcement_found.name= req.body.announcement_name,
            announcement_found.description=req.body.announcement_description,
            announcement_found.save();   
            console.log(req.params.announcement_id);
          
            req.flash("success","announcement Edited");
            res.redirect("/courses/"+req.params.course_id);
        }
    });
};


announcementController.announcement_delete=function(req,res){ 
    console.log("hello");
    console.log(req.params.announcement_id);
    Announcement.findById(req.params.announcement_id,function(err,announcement_found){
      if(err){
        console.log(err.message);

        req.flash("error" , "Failed  Delete announcement 1  ... please Try Again.");
        res.redirect("/courses/"+req.params.course_id);
      }
      else{
            console.log(announcement_found);
         
      }
    });
 
    Announcement.findByIdAndRemove(req.params.announcement_id, function(err){
        if(err){
            console.log(err);
            req.flash("error" , "Failed  Delete announcement 2 ... please Try Again.");
            res.redirect("/courses/");
        }
        else{
             req.flash("success" , "announcement Removed");
             res.redirect("/courses/"+req.params.course_id);
        }
     });
     



};





module.exports = announcementController;









