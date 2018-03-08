//require the model
var fs = require('fs');
var upload_file = require("../../config/file-multer");
var Course = require("../../models/course");


var CourseController = {};

//GET --JSON all courses
CourseController.get_all_courses = function(req,res,next){
    Course.find().select('name key description since desc_file desc_file logo student_num graduated_num').exec(function (err , courses) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            console.log(courses);
            res.status(200).json({
                message: "all system Courses",
                count: courses.length,
                Courses: courses.map(function (course) {
                    return{
                        _id: course._id,
                        name: course.name,
                        type: course.type,
                        description: course.description,
                        registartion_closeday: course.registartion_closeday,
                        max_students : course.max_students,
                        department: course.department,
                        objectives: course.objectives,
                        course_hours: course.course_hours,
                        helper_professor: course.helper_professor,
                        main_professor: course.main_professor,
                        helper_professor: course.helper_professor,
                        logo: course.logo,





                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/courses/'+ course._id
                        }
                    }
                })
            });
        }
    })
};

//GET --JSON spacific course
CourseController.create_new_course = function(req,res,next){
  
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
              
                
                departments.push(found_department._id)
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
            related_fields:req.body.course_related_fields,
            department:departments,
            maxstudent_num:req.body.course_max_students,
            main_professor:req.body.course_main_professor,
            helper_professor:req.body.course_helper_professor,
            lessons:req.body.course_lessons,
            hours:req.body.course_hours,
            objectives:req.body.course_objectives
        
        
        
        }
        
        );
    
    Course.create(course,function (err,newCourse) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else{
            console.log(newCourse);
            res.status(201).json({
                message: "newCourse Created",
                createdDepartment: newCourse,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/courses/'+ newCourse._id
                }
            });
        }
    });
    }, 2000);
    

    
};



CourseController.get_course = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if(found_course){
                console.log(found_course);
                res.status(202).json({
                    message: "Here Is Your Course",
                    Course: found_course
                });
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};




























//POST  --create and add newCourse to the DB
CourseController.update_course = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
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
}
                setTimeout(function(){

                delete_file(found_course.logo);
                
                found_course.name = req.body.course_name;
                found_course.type = req.body.course_type;
                found_course.description = req.body.course_description;
                found_course.registartion_closeday = req.body.course_registartion_closeday;
                found_course.logo = req.files[0].filename;
                found_course.max_students = req.body.course_max_students;
                found_course.related_fields = req.body.course_related_fields;
                found_course.main_professor = req.body.course_main_professor;
                found_course.department=departments;
                found_course.helper_professor = req.body.course_helper_professor;
                found_course.lessons = req.body.course_lessons;
                found_course.hours = req.body.course_hours;
                found_course.objectives = req.body.course_objectives;     
           

                found_course.save(function(err){
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }
                    else{
                        console.log(found_course);
                        res.status(201).json({
                            message: "Course Updated",
                            UpdatedDepartment: found_course,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/courses/'+ found_course._id
                            }
                        });
                    }
                });
            },2000)
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
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
            delete_file(found.desc_file);
            delete_file(found.desc_file);
            delete_file(found.logo); 
        }
    });
    Course.findByIdAndRemove(req.params.course_id , function (err) {
        if(err){
            console.log(err);
            res.status(404).json({
                error:err
            });
        }
        else {
            res.status(202).json({
                message: "Course Deleted Successfully"
            });
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

delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
};