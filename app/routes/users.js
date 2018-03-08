
 const express = require("express");
 const router = express.Router({mergeParams: true});
 var usercontroller = require("../controllers/UserController");
 var userware       = require("../../middleware/UserMiddleware");
 var  User          = require("../../models/user");
 var passport       =require('passport');


router.get("/", function(req, res){
    res.render("Users/home");         //just for testing
});


router.get("/secret",userware.isLoggedIn,function(req, res){
    res.render("Users/secret");    // just for testing
});

//Register
router.get("/register",usercontroller.register_view);
router.post("/register",userware.user_acc_validation,usercontroller.register_user);

 //LOGIN
router.get("/login",usercontroller.login_view);
router.post("/login", userware.user_acc_validation,userware.Pasport_auth,function(req, res){});

//LOGOUT
router.get("/logout",usercontroller.logout);


router.get("/deleteusers",userware.isAdmin,usercontroller.delete_all_Users); // just for testing tested

router.post("/seedusers",userware.isAdmin,usercontroller.Seed_all_users);

//Show Profile
router.get("/:UserId",usercontroller.show_profile);

//Edit User info
router.get("/:UserId/edit",usercontroller.edit_view);
router.put("/:UserId",usercontroller.edit_user);

//delete a specfic User
router.delete("/:UserId",usercontroller.delete_user);





module.exports = router;