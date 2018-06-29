const express       = require("express");
const router        = express.Router();
var usercontroller  = require("../controllers/UserController");
var userware        = require("../../middleware/UserMiddleware");
var  User           = require("../../models/user");
var  Courses        = require("../../models/course");
var  groups         = require("../../models/group");
var passport        = require('passport');


router.get("/"
    , userware.isAdmin
    , usercontroller.display_all_users
);

//LOGIN
router.get("/login"
    , usercontroller.login_view
);

//LOGIN
router.post("/login"
    , userware.user_acc_validation //validate user inputs
    , userware.Pasport_auth
    , usercontroller.subscriptions
);

//LOGOUT
router.get("/logout"
    , usercontroller.logout
);

//ADD Staff members
router.get("/staff"
    , userware.isLoggedIn //check if the request is comming from the admin
    , usercontroller.show_staff
);
 
//ADD students
router.get("/createstudents"
    , userware.isAdmin
    , usercontroller.addstudents_view
);

router.post("/createstudents"
    , userware.isAdmin
    , userware.student_info_validation
    , usercontroller.Seed_all_users
);

// ADD teachers
 router.get("/createteachers"
    , userware.isAdmin
    , usercontroller.addteacher_view
);

router.post("/createteachers"
    , userware.isAdmin
    , usercontroller.createteachers
);

//Deleting USERS
 router.get("/deleteusers"
    , userware.isAdmin
    , usercontroller.delete_all_Users
); 
 
 router.delete("/:UserId"
    , userware.isAdmin
    , usercontroller.delete_user
);

//Show Profile
router.get("/profile"
    , userware.isLoggedIn
    , usercontroller.show_profile
);

// show GPA
router.get("/:UserId/GPA" 
    , userware.isLoggedIn
    , usercontroller.GPA_view
);

router.get("/:CourseId/:UserId/mygrade"
    , userware.isLoggedIn    
    , usercontroller.My_grade
);

router.get("/:CourseId/:UserId/myattendance"
    , userware.isLoggedIn    
    , usercontroller.My_Attendance
);
 
//Edit User info
router.put("/:UserId"   
    , userware.isLoggedIn    
    , usercontroller.upload_user_image
    , usercontroller.edit_user
);

//change passowrd
router.put("/changepassword"       
    , userware.isLoggedIn
    , usercontroller.change_old_password
);

router.put("/:UserId/password"
    , userware.isLoggedIn
    , usercontroller.change_old_password
);


//subscriptions 
router.get("/:UserId/subscriptions"
    , userware.isLoggedIn    
    , usercontroller.subscriptions
);

router.get("/:UserId/mycourses"
    , userware.isLoggedIn       
    , usercontroller.mycourses
);


module.exports = router;