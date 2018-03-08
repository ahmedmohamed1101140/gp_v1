const express = require("express");
const router = express.Router({mergeParams: true});
var usercontroller = require("../controllers/UserController");
var userware       = require("../../middleware/UserMiddleware");
var  User          = require("../../models/user");  //remove


router.post("/register",usercontroller.register_user);

//LOGIN

router.post("/login",userware.Pasport_auth,function(req, res){ res.status(200).json({mes:"geore done"})});

//LOGOUT
router.get("/logout",usercontroller.logout);


router.get("/deleteusers",usercontroller.delete_all_Users); //tested form-

router.post("/seedusers",usercontroller.Seed_all_users); //tested form-

//Show Profile
router.get("/:UserId",usercontroller.show_profile); // tested

//Edit User info
router.put("/:UserId",usercontroller.edit_user);

//delete a specfic User
router.delete("/:UserId",usercontroller.delete_user); //tested




module.exports = router;