//require the model
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Course = require("../../models/course");
var department = require("../../models/department");
var User=require("../../models/user")


var CourseController = {};
var DepartmentController={}


//GET --view all courses
CourseController.get_all_courses = function(req,res,next){
    Course.find(function(err,courses){
        if(err){
            console.log(err.message);
            req.flash("error" , "Faild");
        }
        else{
            res.render("Courses/index" , {courses : courses});
        }
    })
};

//GET --view spacific course
CourseController.get_course = function (req ,res ,next) {
    console.log(req.params.course_id);
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err.message);
            req.flash("error" , "Invalid input");
            res.redirect("/courses");
        }
        else {
            if(found_course){
                console.log(found_course);
                // rednder the page
                res.render("Courses/show",{course:found_course});
            }
            else {
                console.log("Can't find course");
                req.flash("error" , "Can't find Course");
                res.redirect("back");
            }
        }
    });
};
CourseController.get_course_info = function (req ,res ,next) {
    console.log(req.params.course_id);
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                console.log(found_course);
                // rednder the page
                res.render("Courses/info",{course:found_course});
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};

//GET --display course creation form
CourseController.display_creation_form = function(req,res,next){
    
    
        department.find(function(err,departments){
            if(err){
                console.log(err);
            }
            else{
                Course.find(function(err,courses){
                    if(err){
                        console.log(err);
                    }
                    else{
                        User.find(function(err,users){
                            if(err){
                                console.log(err);
                            }
                            else{



                        console.log("wasl");

                        res.render("Courses/new",{departments : departments,courses : courses,users:users});      


                    }
                
                    })
                }



                
               
            })
        }
        });
    

    };





//POST  --create and add new course to the DB
CourseController.create_new_course = function(req,res,next){
    //2- create new course
   
    var departments=[];
var dep_id = req.body.course_departments.split(",");
for(var i=0;i<dep_id.length-1;i++){
    department.findById(dep_id[i],function (err , found_department) {
        console.log(dep_id[i]);

        if(err){
            console.log(err);
        }
        else {
            if(found_department){
                console.log(found_department);
                console.log("wasl");

                // rednder the page
                
                departments.push(found_department._id)
                console.log( departments[0]);
                console.log( departments[1]);

            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
}
    setTimeout(function(){
      

        var course = new Course({
            name: req.body.course_name,
            type: req.body.course_type,
            description: req.body.course_description,
            registartion_closeday: req.body.course_registartion_closeday,
            logo: req.files[0].filename, 
            dependencies :req.body.course_dependencies ,
            department:departments,
            maxstudent_num:req.body.course_max_students,
            main_professor:req.body.course_main_professor,
            helper_professor:req.body.course_helper_professor,
            lessons:req.body.course_lessons,
            hours:req.body.course_hours,
        
            objectives:req.body.course_objectives
        
        
        
        }
        
        );
        console.log(course);
    console.log("23");
    
    
    
    console.log("44");
    
        //3- save the course
        Course.create(course,function (err,newCourse) {
            if(err){
                console.log(err);
            }
            else{
                console.log(newCourse);
                //4- redirect to course/new course id
                res.redirect("/courses/"+course._id);
            }
        });
    }, 2000);
    
};



CourseController.display_update_form = function(req,res,next){
    
    Course.findById(req.params.course_id,function(err,course){
        console.log("stage1");

        if(err){
            console.log(err);
        }
        else{
            console.log("stage2");


            department.find(function(err,departments){
                console.log("stage3");

                if(err){
                    console.log(err);
                }
                else{
                    Course.find(function(err,courses){
                        if(err){
                            console.log(err);
                        }
                        else{
                            User.find(function(err,users){
                                if(err){
                                    console.log(err);
                                }
                                else{
    
    
    
                            console.log("wasl");
    
                            res.render("Courses/edit",{departments : departments,course : course,users:users,courses:courses});      
    
    
                        }
                    
                        })
                    }
    
    
    
                    
                   
                })
            }
            });


        }
        
    });
};














//PUT --update specific course data
CourseController.update_course = function (req ,res, next) {
   
    Course.findById(req.params.course_id , function (err, found_course) {
        if(err){
            console.log(err);
        }
        else{
            if(found_course){
                var departments=[];
                var dep_id = req.body.course_departments.split(",");
       for(var i=0;i<dep_id.length-1;i++){
           department.findById(dep_id[i],function (err , found_department) {
              console.log(dep_id[i]);

        if(err){
            console.log(err);
        }
        else {
            if(found_department){
              

                // rednder the page
                
                departments.push(found_department._id)
            }
            else {
                res.status(404).json({

                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
                setTimeout(function(){

                delete_file(found_course.logo);
                
                found_course.name = req.body.course_name;
                found_course.type = req.body.course_type;
                found_course.description = req.body.course_description;
                found_course.registartion_closeday = req.body.course_registartion_closeday;
                found_course.logo = req.files[0].filename;
                found_course.max_students = req.body.course_max_students;
                found_course.dependencies  = req.body.course_dependencies ;
                found_course.main_professor = req.body.course_main_professor;
                found_course.department=departments;
                found_course.helper_professor = req.body.course_helper_professor;
                found_course.lessons = req.body.course_lessons;
                found_course.hours = req.body.course_hours;
                found_course.objectives = req.body.course_objectives;     
           

                found_course.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("UpdatedCourse");
                        //4- redirect to course/new course id
                        res.redirect("/courses/"+found_course._id);
                    }
                });

            },2000)
        }
    }
    
            else {
               console.log("No Valid Entries");
            }
        }
    });
};

//DELETE --delete specific course
CourseController.delete_course = function (req , res, next) {
   
     Course.findById(req.params.course_id,function (err,found) {
        if(err){
            console.log(err);
        }
        else {
            delete_file(found.course_file);
            delete_file(found.desc_file);
            delete_file(found.logo); 
        }
    });

    Course.findByIdAndRemove(req.params.course_id , function (err) {
        if(err){
            console.log(err)
        }
        else {
            //redirect to another page
            res.redirect("back");

        }
    });
};

CourseController.upload_files = function(req,res,next){
    upload_file(req,res,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("upload done");
            next();
        }
    });
};

module.exports = CourseController;

//static function for deleting file
delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    });



    
};