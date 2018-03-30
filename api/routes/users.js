const express = require("express");
const router = express.Router({mergeParams: true});
var usercontroller = require("../controllers/UserController");
var userware       = require("../../middleware/UserMiddleware");
var  User          = require("../../models/user");  //remove



router.post("/register",usercontroller.register_user);


router.post("/login",userware.Pasport_auth_statelss,usercontroller.send_token);


router.get("/deleteusers",usercontroller.delete_all_Users);

router.post("/seedusers",usercontroller.Seed_all_users);

//Show Profile
router.get("/:UserId",userware.check_jwt_auth,usercontroller.show_profile);


//Edit User info
router.put("/:UserId",usercontroller.edit_user);

//delete a specfic User
router.delete("/:UserId",usercontroller.delete_user);




module.exports = router;