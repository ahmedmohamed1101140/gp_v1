//require the model
//const fs = require('fs');
var User = require("../../models/user");
var passport       =require('passport');
var UserController = {};


UserController.register_user = function(req, res, next ) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('Users/register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/Users/secret");
        });
    });
}

UserController.register_view = function(req, res,next){
    res.render("Users/register");
}

UserController.login_view =function(req, res) {
    res.render("Users/login");
}


UserController.logout = function(req, res){
    req.logout();
    req.flash("error","you loged out");
    res.redirect("/Users/login");
}

UserController.delete_user = function (req,res) {
    User.findByIdAndRemove({_id:req.params.UserId},function (err,user) {

        if(err){console.log(err);}

        const response = {
            message: "successfully deleted",
            id: user._id
        };
        return res.status(200).send(response);
    });
}

UserController.redirector = function(req, res){

    console.log(req.user._id);
    User.findById({_id:req.user._id},function (err,user) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(user);

            if(user.changed==0){
                res.render("Users/show" ,{USER:user});
            }else{
                res.redirect("/Users");
            }
        }
    })
}



UserController.show_profile = function (req,res) {

    console.log(req.user._id);
    User.findById({_id:req.user._id},function (err,user) {
        if (err) {
            console.log(err);
        }
        else {
             console.log(user);

            res.render("Users/show" ,{USER:user});
        }
    })
}

UserController.edit_view=function (req,res) {
   // front-end view
}

UserController.edit_user=function (req,res) {  //done

    var updates_user={
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        img:req.body.img,
        changed:1
    }

    User.findByIdAndUpdate({_id:req.params.UserId},updates_user,function (err,user) {

        if(err){console.log(err)}
        else{
            res.redirect("/Users");
        }
    })
}

UserController.change_old_password = function (req,res ,next) {

    var oldpassword=req.body.oldpassword;
    var newpassword=req.body.newpassword;

    console.log(req.body.oldpassword);
    console.log(req.body.newpassword);
    
    User.findById({_id:req.params.UserId},function (err,user) {
        if (err) {
            console.log(err);
        }
        else {
            
            user.changePassword(oldpassword,newpassword,function (err) {
                if(err){
                    console.log("failed to change the password");
                    res.redirect("back");

                }else {
                    console.log("Password change Successfully");
                    res.redirect("/Users/logout");
                }
            })
        }
    })
}



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


UserController.Seed_all_users=function (req ,res,next) {

    console.log(req.body);

    var departemnt_name= req.body.departemnt_name; //"sw";
    var studentsCount =req.body.studentscount;
    var year=req.body.year;
    var collage_serial = req.body.collage_serial; //1709
    var student_colleage_id;

    console.log(studentsCount.toString().length);

    for(var i=1;i<= studentsCount;i++) {

        student_colleage_id = departemnt_name + year + collage_serial + leftPad(i, studentsCount.toString().length);

        console.log(student_colleage_id);

        User.register(new User({
            username: student_colleage_id,
            collage_id: student_colleage_id,
            department_name:departemnt_name,
            year:year
        }), "password", function (err, user) {
            if (err) {
                console.log(err);
                return res.render('Users/register');
            }
            passport.authenticate("local")(req, res, function () {});
        });
    }
    res.redirect("/Users");
}




function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}



module.exports = UserController;