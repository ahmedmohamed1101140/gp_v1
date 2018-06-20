//require the model
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Course = require("../../models/course");
var department = require("../../models/department");
var User=require("../../models/user")
var Groups=require("../../models/group")
var Announcement=require("../../models/announcement")


var CourseController = {};
var DepartmentController={}
//GET --view all courses
CourseController.get_all_courses = function(req,res,next){
    Course.find(function(err,courses){
        if(err){
            req.flash("error" , "Faild");
        }
        else{
            User.find(function(err,users){
                res.render("Courses/index" , {courses : courses,users:users});

            // rednder the page
            })
        }
    })
};
//GET --view spacific course
CourseController.get_course = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.find(function(err,users){
                    Course.find(function(err,courses)
                {
                    res.render("Courses/info",{course:found_course,users:users,courses:courses});
                })
                // rednder the page
                })
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
   
};
CourseController.get_course_info = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err.message);
            req.flash("error" , "Invalid input");
            res.redirect("/courses");
        }
        else {
            if(found_course){
                Announcement.find({ course_id: req.params.course_id},function(err,announcement_found){
                    if(err){
                         console.log(err.message);
                         req.flash("error" , "Failed To Get announcement ... please Try Again.");
                         req.redirect("back");
                     }else{
                        res.render("Courses/show",{announcement:announcement_found,course:found_course});
                     }
                });
                // rednder the page
            }
            else {
                console.log("Can't find course");
                req.flash("error" , "Can't find Course");
                res.redirect("back");
            }
        }
    });
  
};
CourseController.add_course_grades = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.find({courses:{  
                    $elemMatch:{
                             _id:found_course._id
                               }
             
                         }
                    },function(err,user)
                    
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            if(user)
                            { 
                              
                                res.render("Courses/addgrades",{ course:found_course,Users:user});      
                                 // rednder the page
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid users found for the provided course"
                                })
                        }

                    }
                }
              )
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};
CourseController.get_course_grades = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.find({courses:{  
                    $elemMatch:{
                             _id:found_course._id
                               }
             
                         }
                    },function(err,user)
                    
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            if(user)
                            { 
                              
                                res.render("Courses/grades",{ course:found_course,Users:user});      
                                 // rednder the page
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid users found for the provided course"
                                })
                        }

                    }
                }
              )
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};
CourseController.get_course_attendance = function (req ,res ,next) {
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.find({courses:{  
                    $elemMatch:{
                             _id:found_course._id
                               }
             
                         }
                    },function(err,user)
                    
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            if(user)
                            { 
                              
                                res.render("Courses/attendance",{ course:found_course,Users:user});      
                                 // rednder the page
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid users found for the provided course"
                                })
                        }

                    }
                }
              )
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};
CourseController.put_course_grades=function(req,res,next){
    Course.findById(req.params.course_id,function(err,found_course){
    if(err)
    {
        console.log(err);
    }
    else
    {
     if(found_course)
        {
            var gradeinfo ={
                "name": req.body.grade_name,
                "totalgradescore":req.body.grade_totalgradescore,
                "precentage": req.body.grade_precentage
            }
            found_course.yearwork.push(gradeinfo);
            found_course.save();
            found_course.student_registrated.forEach(function(student){
                User.findById(student,function(err,student_found)
            {
                if(err)
                {
                    console.log(err);
                    console.log("student with name:"+student_found.firstname+" not found ")
                }
                else
                {
                    student_found.courses.forEach(function(student_course){
                        if(student_course._id.toString()==found_course._id.toString())
                        {
                            console.log("heree")
                            var Grade ={
                                "name": req.body.grade_name,
                                "gradescore":req.body[student_found._id]
                                
                            }
                            console.log( "++++++++++++++++++++++++");
                            console.log( student_course.grade.total);
                            console.log( "++++++++++++++++++++++++");
                            console.log(req.body[student_found._id] );
                            console.log( "++++++++++++++++++++++++");
                            console.log(req.body.grade_precentage);
                            console.log( "++++++++++++++++++++++++");
                            student_course.total=student_course.total+(req.body[student_found._id]*req.body.grade_precentage/req.body.grade_totalgradescore)
                            console.log( "***********************");
                            console.log( student_course.grade.total);
                            console.log( "***********************");
                            student_course.grade.push(Grade);
                            student_found.save();

                        }
                    })
                }
            })
        })
        req.flash("succes" , "grades added");
        res.redirect("/courses/"+req.params.course_id+"/grades"); 
        }
        else
        {
            req.flash("failed" , "attendance not added");
            res.redirect("/courses/"+req.params.course_id); 


        }

    }
 });

}
CourseController.edit_student_grades=function(req,res,next){
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.findById(req.params.student_id,function (err , found_student) { 
                   
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            if(found_student)
                            { 
                              
                                res.render("Courses/editgrades",{ course:found_course,student:found_student});      
                                 // rednder the page
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid users found for the provided course"
                                }) }
                    }
                 })
            }                        
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            } }
    });
  

}
CourseController.put_student_grades=function(req,res,next){
    console.log("777");

    Course.findById(req.params.course_id,function(err,found_course){
        if(err)
        {
            console.log(err);
        }
        else
        {
         if(found_course)
         {       
            User.findById(req.params.student_id,function(err,student_found)
                {
                    if(err)
                    {
                        console.log(err);
                        console.log("student with name:"+student_found.firstname+" not found ")
                    }
                    else
                    {  console.log(student_found);
                        student_found.courses.forEach(function(student_course){
                            console.log("777");
                            if(student_course._id.toString()==found_course._id.toString())
                            {  
                                student_course.grade.forEach(function(grade){
                                    console.log(req.body);
                                          grade.gradescore=req.body[grade.name]   
                                    
                                  });
                                  

                                console.log("heree");
                                student_found.save();

                         
                              
                            }
                        })
                    }
            })
            req.flash("succes" , "grades added");
            res.redirect("/courses/"+req.params.course_id+"/grades"); 
        }
            else
            {
                req.flash("failed" , "attendance not added");
                res.redirect("/courses/"+req.params.course_id); 
    
    
            }
    
        }
     });

}
CourseController.put_registration=function(req,res,next){
    Course.findById(req.params.course_id,function(err,found_course){
        if(err)
        {
            console.log(err);
        }
        else
        {
         if(found_course)
         {       var month=new Date().getMonth().toString();
            switch (true) {
                case (month==11||month==0||month==1):
                var course_info ={
                   "_id": found_course._id,
                   "year":new Date().getFullYear().toString(),
                   "season": "winter"
               }
                    break;
                case (month==2||month==3||month==4):
                var course_info ={
                   "_id": found_course._id,
                   "year":new Date().getFullYear().toString(),
                   "season": "spring"
               }
                    break;
                case (month==8||month==9||month==10):
                var course_info ={
                   "_id": found_course._id,
                   "year":new Date().getFullYear().toString(),
                   "season": "fall"
               }
                    break;
                case(month==5||month==6||month==7):
                var course_info ={
                   "_id": found_course._id,
                   "year":new Date().getFullYear().toString(),
                   "season":"Summer"
               }
                    break;
   
           }
            User.findById(req.params.student_id,function(err,student_found)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    { 
                        if(student_found)
                        {  
                        var registrable=true
                        found_course.dependencies.forEach(function(dependencies_course){
                        if(registrable)
                                {
                                    registrable=false
                                student_found.courses.forEach(function(course){
                                    if(course._id.toString()==dependencies_course.toString())
                                    {
                                        if(course.total<50)
                                        {
                                            registrable=false  
                                            console.log("ya fashal ya fashal")
                                        }
                                        else{
                                            registrable=true  
                                        }
                                        
                                    }                
                            })  
                        }
                        console.log(registrable);
                    })
                                if(registrable)
                                {
                                    console.log(Date.now())
                                    if( Date.parse(found_course.registartion_closeday)>= Date.now()){

                                    if(found_course.student_registrated.length<found_course.maxstudent_num)
                                   { 
                                       if(!found_course.student_registrated.toString().includes(student_found._id)){
                                    student_found.courses.push(course_info)
                                    student_found.save()
                                    found_course.student_registrated.push(student_found._id)
                                    found_course.save()
                                    req.flash("success" , "successfully registered");
                                    res.redirect("/courses/info/"+req.params.course_id); 

                                       }
                                       else 
                                       {
                                           console.log("waldd")
                                        req.flash("success" , "already registered");
                                        res.redirect("/courses/info/"+req.params.course_id); 
                                       }

                                   }
                                   else{
                                    req.flash("error" , "no places in course left");
                                    res.redirect("/courses"); 

                                   }
                                }
                                else{
                                    req.flash("error" , "Registartion Date is closed");
                                    res.redirect("/courses/"+req.params.course_id); 
                                }
                                }
                                else{
                                    req.flash("error" , "Course Dependencies are not complete");
                                    res.redirect("/courses/"+req.params.course_id); 
                                }
                    }
                }
            })
        }
            else
            {
                req.flash("error" , "Registration Failed");
                res.redirect("/courses/"+req.params.course_id); 
            }
        }
     });
}
CourseController.edit_percentage=function(req,res,next){
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                console.log("ma3alm");
                res.render("Courses/editpercentage",{ course:found_course});   
              
            }                        
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            } }
    });
}
CourseController.put_percentage=function(req,res,next){
    console.log("888");

    Course.findById(req.params.course_id,function(err,found_course){
        if(err)
        {
            console.log(err);
        }
        else
        {
         if(found_course)
         {      found_course.yearwork.forEach(function(grade){

                   grade.precentage=req.body[grade.name]  

         }
        )
            found_course.save();
            req.flash("succes" , "grades added");
            res.redirect("/courses/"+req.params.course_id+"/grades"); 
        }
            else
            {
                req.flash("failed" , "attendance not added");
                res.redirect("/courses/"+req.params.course_id); 
    
    
            }
    
        }
     });

}
CourseController.put_course_attendance=function(req,res,next){
    Course.findById(req.params.course_id,function(err,found_course){
    if(err)
    {
        console.log(err);
    }
    else
    {
     if(found_course)
        {
         if(req.body.type=="Lecture")
         {
            var attend = {
                "attendancetype": "lecture",
                 "number":found_course.lecturestaken ,
                 "attended": true
            }
            var not_attend = {
                "attendancetype": "lecture",
                 "number": found_course.lecturestaken ,
            }
            found_course.lecturestaken=found_course.lecturestaken+1;
         }
         else if (req.body.type=="Lab")
         {
             
            var attend = {
                "attendancetype": "Lab",
                 "number":found_course.labstaken ,
                 "attended": true
            }
            var not_attend = {
                "attendancetype": "Lab",
                 "number": found_course.labstaken ,
            }
            found_course.labstaken=found_course.labstaken+1
         }
         else if (req.body.type=="Section")
         {
             
            var attend = {
                "attendancetype": "Section",
                 "number":found_course.sectionstaken ,
                 "attended": true
            }
            var not_attend = {
                "attendancetype": "Section",
                 "number": found_course.sectionstaken ,
            }
            found_course.sectionstaken=found_course.sectionstaken+1
         }
            
            var studnetarr=req.body.users
            found_course.student_registrated.forEach(student=>{
                User.findById(student,function(err,user){
                    if(err)
                    {
                        req.flash("failed" , "attendance not added");
                       res.redirect("/courses/"+req.params.course_id); 
                    }
                    else
                    {
                        if(user)
                        {
                            

                            user.courses.forEach(course => {
                                if(course._id.toString()== found_course._id.toString())
                                {
                                    if(studnetarr.includes(student.toString()))
                                    { 
                                    course.attendance.push(attend);
                                    }
                                    else
                                    {
                                        course.attendance.push(not_attend);
                                    }
                                    user.save();

                                }
                                else{
                                    req.flash("failed" , "can't finf course");

                                }
                            });   
                        }
                        else
                        {
                            res.status(404).json({
                                message: "no valid entry found for the provided ID"
                            })
                        }

                    }

                }) 

            })
            found_course.save();
            req.flash("success" , "attendance added");
            res.redirect("/courses/"+req.params.course_id+"/attendance"); 

        }
        else
        {             

            res.redirect("/courses/"+req.params.course_id+"/attendance"); 
            res.redirect("/courses/"+req.params.course_id); 


        }

    }
 })

}
CourseController.edit_student_attendance=function(req,res,next){
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                User.findById(req.params.student_id,function (err , found_student) { 
                   
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            if(found_student)
                            { 
                              
                                res.render("Courses/editattendance",{ course:found_course,student:found_student,type:req.params.type});      
                                 // rednder the page
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid users found for the provided course"
                                }) }
                    }
                 })
            }                        
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            } }
    });
  

}
CourseController.put_student_attendance=function(req,res,next){
    Course.findById(req.params.course_id,function(err,found_course){
    if(err)
    {
        console.log(err);
    }
    else
    {
     if(found_course)
        {
            User.findById(req.params.student_id,function(err,student_found)
                {
                    if(err)
                    {
                        console.log(err);
                        console.log("student with name:"+student_found.firstname+" not found ")
                    }
                    else
                    {  
                        student_found.courses.forEach(function(student_course){
                            if(student_course._id.toString()==found_course._id.toString())
                            {
                                if(req.params.type.toString()=="lecture")
                                {
                                    student_course.attendance.forEach(function(attendance){
                                        if(attendance.attendancetype.toString()=="lecture"){
                                        attendance.attended=req.body[attendance.number]  
                                        } 
                                      });
                                                                        
                                }
                                else if (req.params.type.toString()=="lab")
                                {
                                    student_course.attendance.forEach(function(attendance){
                                        if(attendance.attendancetype.toString()=="Lab"){
                                        attendance.attended=req.body[attendance.number]  
                                        } 
                                      });
                                                                        
                                }
                                else if (req.params.type.toString()=="section")
                                {
                                    student_course.attendance.forEach(function(attendance){ 
                                        if(attendance.attendancetype.toString()=="Section"){
                                        attendance.attended=req.body[attendance.number]  
                                        } 
                                      });
                                      
    
                                   
                                }
                                student_found.save();

                             }
                                   })        
                            req.flash("success" , "attendance edited");
                            res.redirect("/courses/"+req.params.course_id+"/attendance"); 
                        }
                    })
                }      
                else
                        {
                            req.flash("failed" , "attendance not edited");
                            res.redirect("/courses/"+req.params.course_id); 
                        }
                    }
                })
}
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
 var departments=[]
 var dep_id = req.body.course_departments.split(",")
 for(var i=0;i<dep_id.length-1;i++){
    department.findById(dep_id[i],function (err , found_department) {
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
            dependencies :req.body.course_dependencies ,
            department:departments,
            maxstudent_num:req.body.course_max_students,
            main_professor:req.body.course_main_professor,
            helper_professor:req.body.course_helper_professor,
            lessons:req.body.course_lessons,
            hours:req.body.course_hours,
            objectives:req.body.course_objectives
        });   
        //3- save the course
        Course.create(course,function (err,newCourse) {
            if(err){
                console.log(err);
            }
            else{
               /* User.findById(course.main_professor,function (err , found_user) {   
                 if(found_user){
                        found_user.courses.push(newCourse)
                        found_user.save();
                    }
                 })
                course.helper_professor.forEach(function(Found_User) {
                    User.findById(Found_User,function (err , found_user) {                
                        if(err){
                        }
                        else {
                            if(found_user){
                                found_user.courses.push(newCourse)
                                found_user.save();
                            }
                            else {
                                res.status(404).json({
                                    message: "no valid entry found for the provided ID"
                                });
                            }
                        }
                    });
                })*/
                //4- redirect to course/new course id
                res.redirect("/courses/"+course._id);
            }
        });
    }, 2000);
};
CourseController.display_update_form = function(req,res,next){
    
    Course.findById(req.params.course_id,function(err,course){

        if(err){
            console.log(err);
        }
        else{


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

CourseController.add_student=function(req,res,next){
    Course.findById(req.params.course_id,function (err , found_course) {
        if(err){
            console.log(err);
        }
        else {
            if(found_course){
                
                    department.find().select("name").exec(function(err,departments){
                        if(err){
                            console.log(err.message);
                            req.flash("error" , "Sorry Server Error!");
                            res.redirect("/mails");
                        }
                        else{
                            User.find(function(err,users){
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
                                            res.render("Courses/addstudents",{ course:found_course,departments:departments , users:users , groups:groups});
                                        }
                                    });    
                                }
                            });
                        }
                    
                     // rednder the page   
                }) 
            }
        }
      
    });
}
CourseController.put_student=function(req,res,next){
    Course.findById(req.params.course_id,function(err,found_course){
    if(err)
    {
        console.log(err);
    }
    else
    {
     if(found_course)
        { var arr=[]
            var month=new Date().getMonth().toString();
         switch (true) {
             case (month==11||month==0||month==1):
             var course_info ={
                "_id": found_course._id,
                "year":new Date().getFullYear().toString(),
                "season": "winter"
            }
                 break;
             case (month==2||month==3||month==4):
             var course_info ={
                "_id": found_course._id,
                "year":new Date().getFullYear().toString(),
                "season": "spring"
            }
                 break;
             case (month==8||month==9||month==10):
             var course_info ={
                "_id": found_course._id,
                "year":new Date().getFullYear().toString(),
                "season": "fall"
            }
                 break;
             case(month==5||month==6||month==7):
             var course_info ={
                "_id": found_course._id,
                "year":new Date().getFullYear().toString(),
                "season":"Summer"
            }
                 break;

        }
            
          
                       var bool =false
                        req.body.recivers.forEach(element => {
                            User.find(function(err,users){
                                if(err){
                                    console.log(err);
                                }
                                else{
                
                                    users.forEach(function(person)
                                    {   
                                       if(person._id.toString()==element)
                                       {
                                           if(!found_course.student_registrated.toString().includes(person._id))
                                           {
                                       person.courses.push(course_info) 
                                       
                                     /*
                                           console.log("da5al")
                                          
                                       person.courses.found_course.year=new Date().getFullYear().toString() 
                                       person.courses.found_course.season=Month
*/
                                       found_course.student_registrated.push(person._id)

                                       console.log("mesh mwgood")

                                        person.save();
                                           }   
                                           else 
                                           {

                                            console.log("mwgood")

                                           } 
                                       }
                                    })

                                }
                          })
                      });  

                  setTimeout(function(){ 
    
                        found_course.save()
                  },10000)

                                req.flash("success" , "attendance edited");
                                res.redirect("/courses/"+req.params.course_id+"/attendance"); 
                    
                    }   
                else
                        {
                            req.flash("failed" , "attendance not edited");
                            res.redirect("/courses/"+req.params.course_id); 
                        }
                    }
                })
}