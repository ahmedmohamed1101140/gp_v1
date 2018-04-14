
 const express = require("express");
 const router = express.Router();
 var usercontroller = require("../controllers/UserController");
 var userware       = require("../../middleware/UserMiddleware");
 var  User          = require("../../models/user");
 var passport       =require('passport');


router.get("/",usercontroller.display_all_users);


//Register
router.get("/register",usercontroller.register_view);
router.post("/register",userware.user_acc_validation,usercontroller.register_user);

 //LOGIN
router.get("/login",usercontroller.login_view);
router.post("/login",userware.user_acc_validation
 , userware.Pasport_auth,usercontroller.redirector);

//LOGOUT
router.get("/logout",usercontroller.logout);

//ADD students
router.get("/createstudents",usercontroller.addstudents_view);

 router.post("/createstudents"
     //    ,userware.isAdmin
     //,userware.student_info_validation
     ,usercontroller.Seed_all_users
 );

// ADD teachers
 router.get("/createteachers",usercontroller.addteacher_view);

 router.post("/createteachers"
     //    ,userware.isAdmin
    // ,userware.student_info_validation
     ,usercontroller.createteachers
 );



//Deleting USERS
 router.get("/deleteusers",userware.isAdmin,usercontroller.delete_all_Users); // just for testing tested
 router.delete("/:UserId",usercontroller.delete_user);


 //Show Profile
 router.get("/profile",usercontroller.show_profile);

 //Edit User info
 router.put("/:UserId",usercontroller.upload_user_image,usercontroller.edit_user);

//change passowrd
router.put("/changepassword",usercontroller.change_old_password);
router.put("/:UserId/password",usercontroller.change_old_password);







module.exports = router;