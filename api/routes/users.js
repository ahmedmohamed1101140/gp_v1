const express = require("express");
const router = express.Router({mergeParams: true});
var usercontroller = require("../controllers/UserController");
var userware       = require("../../middleware/UserMiddleware");
var  User          = require("../../models/user");  //remove


router.post("/register",usercontroller.register_user);

/*
router.post("/login",userware.Pasport_auth_statelss,function(req,res,next){
    res.status(200).json({mes:"george yeah"});
});                                // ------>> only for App not Api
router.get("/logout",usercontroller.logout);
*/

router.get("/deleteusers",usercontroller.delete_all_Users);

router.post("/seedusers",usercontroller.Seed_all_users);

//Show Profile
router.get("/:UserId",
    //userware.Pasport_auth_statelss,
    usercontroller.show_profile);

//Edit User info
router.put("/:UserId",usercontroller.edit_user);

//delete a specfic User
router.delete("/:UserId",usercontroller.delete_user);




module.exports = router;