var User        = require("../models/user");
var Course    =require("../models/course");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated())
    {
        return next();
    }
    // send flash message for the next request if error
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}
middlewareObj.isAdmin = function (req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.usertype === 0){
            return next();
        }
        else {
            // send flash message for the next request if error
            req.flash("error", "You have to be Admin to have this access");
            res.redirect("/groups");
        }
    }
    else{
        // send flash message for the next request if error
        req.flash("error", "You Have To Log In First");
        res.redirect("/groups");
    }
}
middlewareObj.isCoursecontoller = function (req, res, next) {
    if (req.isAuthenticated()){
        Course.findById(req.params.course_id,function (err,foundcourse) {
            if(err){
                console.log(err);
            }
            else {
                
                    var bool =false;
                    User.findById(req.user._id,function(err,founduser){ 
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                     {
if(foundcourse.helper_professor.toString().includes(founduser._id)||foundcourse.main_professor.toString()==founduser._id.toString())
{
    bool=true;
}


                        founduser.courses.forEach(function(course)
                     {

                         if(course._id.toString()==foundcourse._id.toString())
                         {
                            
                         }

                       })
                       if(req.user.usertype === 0||req.user.usertype === 1||req.user.usertype === 2)
                       {
                           if(bool||req.user.usertype === 0)
                           {
                            return next();
                           }
                           else {
                            // send flash message for the next request if error
                            req.flash("error", "You Have no access here");
                            res.redirect("/");
                        }
                        }
                        else {
                            // send flash message for the next request if error
                            req.flash("error", "You are Not a Course Menmber");}
                        }
                     })
                  }
                })   
               }
               else{
                // send flash message for the next request if error
                req.flash("error", "You Have To Log In First");
                res.redirect("/groups");
            }
              
            }
    
            middlewareObj.isCourseMember = function (req, res, next) {
                if (req.isAuthenticated()){
                    Course.findById(req.params.course_id,function (err,foundcourse) {
                        if(err){
                            console.log(err);
                        }
                        else {
                            
                                var bool =false;
                                User.findById(req.user._id,function(err,founduser){ 
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                 {
            
                                    founduser.courses.forEach(function(course)
                                 {
                                    console.log(course)
            
                                     if(course._id.toString()==foundcourse._id.toString())
                                     {
                                        bool=true;
                                     }
            
                                   })

                                   if(foundcourse.helper_professor.toString().includes(founduser._id)||foundcourse.main_professor.toString()==founduser._id.toString())
                                        {
                                            bool=true;
                                            console.log("gamed")
                                        }
                                                                        
                                        if(bool||req.user.usertype === 0)
                                        {
                                         return next();
                                        }
                                    else {
                                        // send flash message for the next request if error
                                        req.flash("error", "You are Not a Course Menmber");}
                                    }
                                 })
                              }
                            })   
                           }
                           else{
                            // send flash message for the next request if error
                            req.flash("error", "You Have To Log In First");
                            res.redirect("/groups");
                        }
                          
                        }
                
   



module.exports = middlewareObj;
