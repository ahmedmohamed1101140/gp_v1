var User = require("../../models/user");
var passport       =require('passport');
var Department = require("../../models/department");
var upload_image = require("../../config/image-multer");
var Course= require("../../models/course");
var Group = require("../../models/group");
const fs = require('fs');
var async =require('async');
var nodemailer = require("nodemailer");
var UserController = {};


//DISPLAY ALL USERS IN THE SYSTEM
UserController.display_all_users= function (req,res,next) {
    User.find().select('firstname lastname collage_id usertype department_name username year email').exec(function (err, foundUser) {
        if (err) {
            console.log(err);
            next(err);
        }
        else {
            res.render('Users', {Users:foundUser });
        }
    });

}

//SHOW STAFF PROFIEL
UserController.show_staff= function(req,res,next){
     console.log("reach it");
    User.find({usertype:{ $ne:"4"}}).select('firstname lastname collage_id usertype department_name username year email').exec(function (err, foundUser) {
        if (err) {
            console.log(err);
            next(err);
        }
        else {
            res.render('Users/staff', {Users:foundUser });
        }
    });

}

//DISLAY LOGIN PAGE
UserController.login_view =function(req, res) {
   // res.render("Users/login");
   res.render("Users/login2");

}

//LOGOUT USERS
UserController.logout = function(req, res){
    req.logout();
    req.flash("success","you loged out");
    res.redirect("/Users/login");
}

//DISPLAY STUDENT GPA
UserController.GPA_view=function(req,res){
  User.findById(req.params.UserId,function (err,user) {
        if(err){
            console.log(err);
            req.flash("failed","User not found");
        }
        else{
            Course.find(function(err,courses){
                if(err){
                req.flash("failed","No Courses Found");
                }
                else{
                res.render("Users/GPA",{user:user,courses:courses});
                }
            });           
        }
    });
}

//GET USER ATTENDANCE
UserController.My_Attendance=function(req,res){
  User.findById(req.params.UserId,function (err,user) {
            if(err){
                console.log(err);
                req.flash("failed","User not found");
            }
         else{
            Course.findById(req.params.CourseId,function(err,course){
                if(err)
                {
                   req.flash("failed","No Courses Found");
                }
                else
                {
                    res.render("Users/myattendance",{course:course,user:user});
                }
            })   
        }        
    });
}

//GET USERS GRADES
UserController.My_grade=function(req,res){
  User.findById(req.params.UserId,function (err,user) {
        if(err){
            console.log(err);
            req.flash("failed","User not found");
        }
        else{
            Course.findById(req.params.CourseId,function(err,course){
                if(err){
                    req.flash("failed","No Courses Found");
                }
                else{
                    user.courses.forEach(function(user_course){     
                        if(user_course._id.toString()==course._id.toString())
                        { 
                            res.render("Users/mygrade",{user_course:user_course,course:course,user:user});
                        }
                    });
                }
            });           
        }
    });
}

//DELETE USER FROM THE SYSTEM
UserController.delete_user = function (req,res) {    
        User.findByIdAndRemove({_id:req.params.UserId},function (err,user) {
            if(err){console.log(err);}
         else{
            req.flash("success","the user is deleted");
            res.redirect('/Users'); 
         }
        });
}

// Redirecting user after changing his profile
UserController.redirector = function(req,res){
    User.findById({_id:req.user._id},function (err,user) {
        if (err) {
            console.log(err);
        }
        else {
            if(user.changed==0){
                if(user.usertype==4)
                {
                     //student
                    res.render("Users/show" ,{USER:user});
                 }
                 else{
                    res.render("Users/showteacher" ,{USER:user});
                  }
            }else{
                res.redirect("/");
            }
        }
    })
}

//showing the user profile
UserController.show_profile = function (req,res) {

    console.log(req.user._id);
    User.findById({_id:req.user._id},function (err,user) {
        if (err) {
            console.log(err);
        }
        else {
                if(user.usertype==4){ 
                res.render("Users/show" ,{USER:user});
                 }else{
                    res.render("Users/showteacher" ,{USER:user});
                 }
        }
    })
}

//editing the user  infomation
UserController.edit_user=function (req,res,next) {  //done
 
    console.log(req.file.filename);
    var updates_user={
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        image:req.file.filename,
        changed:1
    }
   
    User.findOne({username:req.body.username},function(err,user1){
           
         
         if(err){
             console.log("this an error"); 
            
         } 
        else if(user1 && (req.user.username != req.body.username)){
            console.log("here");
           //  console.log(user1);
           const error= new Error ("this user name already exits");
            next(error);

        }else{
          
            User.findByIdAndUpdate({_id:req.params.UserId},updates_user,function (err,user) {

                if(err){
                    delete_file(req.file.filename);
                    console.log(err);
                }
                else{
                    delete_file(user.image);
                    req.flash("success","profile is edited successfully")
                    res.redirect("/");
                }
            });/*
          req.flash("success","what ??????????????");
                    res.redirect("/Users");*/
        }

    });

}

//changing userpassword
UserController.change_old_password = function (req,res ,next) {

    var repassword = req.body.repassword;
    var oldpassword=req.body.oldpassword;
    var newpassword=req.body.newpassword;


    if(repassword!==newpassword){
        if(newpassword.length <=7){
            req.flash("error","the password is less than 8 characters");
        }else {
            req.flash("error","Please make sure that Password matches");
        }
        return res.redirect("/Users/profile");
    }
    else {
        console.log(req.body.oldpassword);
        console.log(req.body.newpassword);
        
        User.findById({_id:req.params.UserId},function (err,user) {
            if (err) {
                console.log(err);
            }
            else {
                
                user.changePassword(oldpassword,newpassword,function (err) {
                    if(err){
                        console.log("failed to change the password or maybe your old passowrd is not correct");
                        req.flash("error","failed to change the password");
                        res.redirect("back");

                    }else {
                        console.log("Password change Successfully");
                        req.flash("success","Password changed Successfully,please try it");
                        res.redirect("/Users/logout");
                    }
                })
            }
        });
    }
}

//DELETE MULTIPLE USERS
UserController.delete_all_Users =function (req, res, next) {
    //testing only
    User.remove({},function (err) {
        if(err){console.log(err)}
        else
        {
            console.log("done deleting");
        }
    })
}

//adding new users view
UserController.addstudents_view=function (req,res,next) {
    Department.find().select('name key').exec(function (err , departments) {
        if(err){
            console.log(err);
            next(err);
        }
        else{
            res.render('Users/new',{departments:departments});
        }
    });
}


// creating new  students
UserController.Seed_all_users=function (req ,res,next) {

    var departemnt_data =req.body.department_data.split(" ");
    var departemnt_name= departemnt_data[0]; //"sw";
    var studentsCount =req.body.studentscount;
    var year=req.body.year;
    var collage_serial =  req.body.collage_serial.toString(); //1709
    var student_colleage_id;
    var departemnt_id=departemnt_data[1] //id:5ca46dada
    

   /* console.log(collage_serial);
    console.log(typeof(collage_serial));
*/
    var Users_to_be_add =[];  
   
    for(var i=1;i<=studentsCount;i++) {
        student_colleage_id = departemnt_name + year + collage_serial + leftPad(i, studentsCount.toString().length);
        Users_to_be_add.push(student_colleage_id);
    }
   
    var filtered_usercollage_ids=[];

       async.each(Users_to_be_add, function(usercollage_id, done){
        User.findOne({collage_id:usercollage_id },function(err,user){
            if(err){
                console.log(err);
            }
            else if(user){
               console.log("the repteaed ids " + user.collage_id);  

            }else if(!user){

                filtered_usercollage_ids.push(usercollage_id);
            }
            done();
        })
    },function(err){
    if(err){
        console.log(err.message);
    }
    if(filtered_usercollage_ids.length>=1){
        console.log(filtered_usercollage_ids);
        filtered_usercollage_ids.forEach(function(usercid){
            User.register(new User({
                username: usercid,
                collage_id: usercid,
                department_name:departemnt_name,
                year:year,
                department_Id:departemnt_id
                
            }), "password", function (err,user) {
                if (err) {
                    console.log(err);
                    return res.render('Users/register');
                }
                else {
               //
                }
            });
        });
    }
    req.flash("success" , "Users Created");
    return res.redirect("/Users");
    });
}

//RENDER ADD NEW TEACHER PAGE
UserController.addteacher_view=function (req,res,next) {
    res.render("Users/newteacher");
}

//ADD NEW TEACHER TO THE SYSTEM AND SEND HIM AN EMAIL
UserController.createteachers=function(req,res,next){

    var useremail=req.body.email;
    var type = req.body.usertype;
    
    console.log(req.body.usertype);
    User.findOne({email:useremail},function(err,user){
        if(err){
            console.log(err.message);
            next(err);
        }else{
            if(user){
                req.flash("error" ,"this emial already exists");
                return res.redirect("back");
             }
             else{
                User.register(new User({
                    username: useremail,
                    email:useremail,
                    usertype:type
                }), "password", function (err, user) {
                    if (err) {
                        console.log(err);
                        next(err);
                    }else{
                        //send the mail
                        var maillist = [
                            'fcis.ch.lms@gmail.com',
                        ];
                        maillist.push(req.body.email);

                        var mailOptions = {
                            from: 'fcis.ch.lms@gmail.com',
                            subject: 'Invitation to FCIS LMS',
                            text: `FCIS LMS Admin invite you to be part of the LMS team you need to login with your mail and
                            your Password is "password" don't forget to update your profile and change your password `,
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
                        console.log(maillist);
                
                        transport.sendMail(mailOptions , function(err , info){
                            if(err){
                                console.log(err.message);
                                req.flash("error" , "User Added But Faild To Send the Mail ");
                                res.redirect("/Users");
                            }
                            else{
                                console.log("mail Sent " +info.response);
                                req.flash("success" , "User Added  and Mail Send Successfully ");
                                res.redirect("/Users");
                            }
                        });

                    }    
                });
             }
        }
    });

}

//UPLOAD USERS IMAGES
UserController.upload_user_image = function(req,res,next){
        console.log('into upload function');
    
    upload_image(req,res,function(err){
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

UserController.subscriptions = function(req,res,next){
    User.findById(req.user._id).populate("groups").exec(function(err,founduser){                     
        if(err){
            console.log(err);
        }
        if(founduser.usertype==0||founduser.usertype==3 ){
            res.redirect("/Users");
        } //admins or staff
        else if(founduser.usertype==1){ //instructor  
            Course.find({main_professor:req.user._id},function(err,courses){
                if(err){console.log(err);}  
                else{
                    res.render("Users/mysubs2",{Mycourses:courses,Mygroups:founduser.groups});
                }         
            });
        }
        else if(founduser.usertype==2){ //TA
            Course.find({helper_professor:{$in:[req.user._id]}},function(err,courses){
                if(err){console.log(err);}  
                else{
                    res.render("Users/mysubs2",{Mycourses:courses,Mygroups:founduser.groups});
                }         
            });
        }
        else if(founduser.usertype==4){  //student 
            Course.find({student_registrated:{$in:[req.user._id]}},function(err,courses){
                if(err){console.log(err);}  
                else{
                   res.render("Users/mysubs2",{Mycourses:courses,Mygroups:founduser.groups});
                }         
            });
        }     
    });  
}


UserController.mycourses = function(req,res,next){     
    Course.find({student_registrated:{$in:[req.user._id]}},function(err,courses){
        if(err){console.log(err);
        }        
        else {    
           User.findById(req.user._id).populate("groups").exec(function(err,founduser){            
                if(err){
                    console.log(err);
                }
                if(founduser.usertype==0){
                    res.redirect("/Users");
                }
                else{
                    res.render("Users/subscriptions",{courses:courses,user:founduser});
                }
            });  
        }
    });
}

module.exports = UserController;

//DELETE FILES IF FIALD
delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err.message);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err.message);
            console.log('file deleted successfully');
        });
    });
};


leftPad = function(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

//CHECK IF THE ADD USERS EXIST
check_already_exiting_users = function (studentsCount,departemnt_name,year,collage_serial){
    var Users_to_be_add =[];  
   
    for(var i=1;i<=studentsCount;i++) {
        student_colleage_id = departemnt_name + year + collage_serial + leftPad(i, studentsCount.toString().length);
        Users_to_be_add.push(student_colleage_id);
    }
   
    var filtered_usercollage_ids=[];

    async.each(Users_to_be_add, function(usercollage_id, done){
        User.findOne({collage_id:usercollage_id },function(err,user){
            if(err){
                console.log(err);
            }
            else if(user){
               console.log("the repteaed ids "+user.collage_id);  
            }else if(!user){
                filtered_usercollage_ids.push(usercollage_id);
            }
            done();
        })
    },function(err){        
        filtered_usercollage_ids.forEach(function(usercid){
            User.register(new User({
                username: usercid,
                collage_id: usercid,
                department_name:departemnt_name,
                year:year
                
            }), "password", function (err,user) {
                if (err) {
                    console.log(err);
                    return res.render('Users/register');
                }
                else {
                    user.save();
                }
            });
        }); 
    req.flash("success" , "Users Created");
    return res.redirect("/Users");
    });
}




