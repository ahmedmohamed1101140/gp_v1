var User = require("../../models/user");
var passport       =require('passport');
var UserController = {};


UserController.register_user = function(req, res, next ) {

    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log(err.message);
            res.status(500).json({
                error: "Registeration Failed"
            });
        }
        else {
           passport.authenticate("local")(req, res, function () {

               res.status(201).json({
                   message: "new user Created",
                   createdUser: user
               })

             });
          }
    });
}

UserController.logout = function(req, res){
    req.logout();
    res.status(200).json({
        message:"USER LOGOUT"
    });
}

UserController.delete_user = function (req,res) {
    User.findByIdAndRemove({_id:req.params.UserId},function (err,user) {

        if(err){
            res.status(500).json({
                error :err
            });
        }
        else {
            const response = {
                message: "successfully deleted",
                user: user
            };
            res.status(200).json(response);
        }
    });


}

UserController.show_profile = function (req,res) {

    User.findById({_id:req.params.UserId},function (err,user) {
        if (err) {
            res.status(500).json({
                error :err
            })
        }
        else {

            res.status(200).json({
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                image:user.image,
                usertype:user.usertype,
                username: user.username,
                collage_id: user.collage_id
            });
        }
    });
}


UserController.edit_user=function (req,res) {

     var userinfo ={
         firstname: req.body.firstname,
         lastname:req.body.lastname,
         email: req.body.email,
         image:req.body.image,
         username : req.body.username
     }

   User.findByIdAndUpdate({_id:req.params.UserId},userinfo,function (err,user) {

       if(err){
          return res.status(500).json({
               error :err
           });
       }
       else{
           res.status(200).json({
                message :"USER UPDATED",
                User_updated_fields: userinfo
           })
       }
   })
}



UserController.delete_all_Users =function (req, res, next) { //done
    User.remove({},function (err) {
        if(err){
            res.status(500).json({
                error :err
            })
        }
        else
        {
            res.status(200).json({
                message : "ALL USER WERE DELETED "
            })

        }
    })
}


UserController.Seed_all_users=function (req ,res,next) {  //done

    console.log(req.body);

    var departemnt_name= req.body.departemnt_name; //"sw";
    var studentsCount =req.body.studentscount;
    var year=req.body.year;
    var collage_serial = req.body.collage_serial; //1709
    var student_colleage_id;

    console.log(studentsCount.toString().length);

    try {

        for (var i = 1; i <= studentsCount; i++) {

            student_colleage_id = departemnt_name + year + collage_serial + leftPad(i, studentsCount.toString().length);

            console.log(student_colleage_id);

            User.register(new User({
                username: student_colleage_id,
                collage_id: student_colleage_id
            }), "password", function (err, user) {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                }
                passport.authenticate("local")(req, res, function () {

                });
            });
        }

    }catch(err) {
        res.status(500).json({
            error: err
        });

    }
         res.status(200).json({
             Message : "USERS are Created",
             count :studentsCount
         })
}


function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}



module.exports = UserController