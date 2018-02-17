const express = require("express"),
      router = express.Router({mergeParams: true});
var usercontroller = require("../controllers/UserController");

router.get("/", usercontroller.get_all_users);

module.exports = router;