const express = require("express"),
      router = express.Router({mergeParams: true});
var usercontroller = require("../controllers/UserController");
var userware  = require("../../middleware/UserMiddleware");

router.get("/",userware.fun1, usercontroller.get_all_users);

module.exports = router;