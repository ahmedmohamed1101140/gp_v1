const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Lesson       = require("../../models/lesson");
var Course=       require("../../models/course");

var lessonController = {};

lessonController.show = function (req, res){

    Lesson.findById(req.params.lesson_id,function(err,lesson_found){
        if(err){
             console.log(err.message);
             req.flash("error" , "Failed To Get lesson ... please Try Again.");
             req.redirect("back");
         }else{
            res.render("lesson/show",{lesson:lesson_found,course_id:req.params.course_id});
         }
    });
};
lessonController.showbycourseid = function (req, res){

    Lesson.find({ course_id: req.params.course_id},function(err,lesson_found){
        if(err){
             console.log(err.message);
             req.flash("error" , "Failed To Get lesson ... please Try Again.");
             req.redirect("back");
         }else{
            res.render("lessons/showall",{lesson:lesson_found,course_id:req.params.course_id});
         }
    });
};

lessonController.new_lesson = function(req,res){

    Course.findById(req.params.course_id,function(err , course_found){
        if(err)
        {
            console.log(err.message);
            req.flash("error" , "Failed To Add Post ... please Try Again.");
            res.redirect("back");
        } 
        else{        

            res.render("lessons/new",{course:course_found});
        }
    });
};

lessonController.new_lesson_lesson =function(req,res){
    console.log("S!");

    Course.findById(req.params.course_id,function(err , course_found){
        if(err)
        {
            console.log("ERR");

            console.log(err.message);
            req.flash("error" , "Failed To Find Group  ... please Try Again.");
            res.redirect("course/show");

        } 
        else{     
             var lesson = new Lesson({
                name: req.body.lesson_name,
                description:req.body.lesson_description,
                type:req.body.lesson_type,
                file:req.files[0].filename,
                course_id:course_found._id,

            });
            Lesson.create(lesson,function(err,lessonCreated){
                if(err)
                {
                    console.log(err.message);
                    req.flash("error" , "Failed To Create Post / Invalid Data  ... please Try Again.");
                    res.redirect("back");
                }
                else
                {

                   
                   req.flash("success" , "lesson Created");
                   res.redirect("/courses/"+req.params.course_id);
                }
           });
          } 
    });
};


lessonController.lesson_edit =function(req,res){
    Lesson.findById(req.params.id,function(err , lesson_found){
        if(err)
        {
        console.log(err.message);
        req.flash("error" , "Failed To Find Post  ... please Try Again.");
        req.redirect("back");
        } 
        else 
        {
            res.render("lessons/edit",{lesson:lesson_found,course_id:req.params.course_id});
        }
    });
};


lessonController.lesson_edit_put=function(req,res){
    console.log(req.params.id);
    Lesson.findById(req.params.id,function(err,Lesson_found){
        if(err){
            console.log(err.message);
            req.flash("error" , "Failed To Find Post  ... please Try Again.");
            res.redirect("/courses/"+req.params.course_id+"/lessons");
        }
        else{
            console.log(req.params.id);

            Lesson_found.name= req.body.lesson_name,
            Lesson_found. description=req.body.lesson_description,
            Lesson_found. type=req.body.lesson_type,
            Lesson_found. file=req.files[0].filename,
            Lesson_found.save();   
            console.log(req.params.id);
          
            req.flash("success","Post Edited");
            res.redirect("/courses/"+req.params.course_id+"/lessons");
        }
    });
};


lessonController.lesson_delete=function(req,res){ 
    Lesson.findById(req.params.id,function(err, lesson_found){
      if(err){
        console.log(err.message);
        req.flash("error" , "Failed  Delete Post  ... please Try Again.");
        res.redirect("/courses/"+req.params.course_id+"/lessons");
      }
      else{
            console.log(lesson_found);
         
      }
    });
 
     Lesson.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash("error" , "Failed  Delete Post  ... please Try Again.");
            res.redirect("/course/"+req.params.course_id);
        }
        else{
             req.flash("error" , "lesson Removed");
             res.redirect("/course/"+req.params.course_id);
        }
     });



};



lessonController.upload_files = function(req,res,next){
    upload_file(req,res,function(err){
        if(err){
            console.log(err.message);
            req.flash("error" , "Can't Upload Files");
            res.redirect("back");
        }
        else{
            console.log("upload done");
            next();
        }
    });
};


module.exports = lessonController;









