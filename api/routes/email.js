const express = require("express");
const router = express.Router({mergeParams: true});
var emailcontroller = require("../controllers/EmailController");
var emailmiddleware = require("../../middleware/EmailMiddleware");


//create new department
router.post("/"
    , emailmiddleware.validate_data //middleware to validate the user input data
    , emailcontroller.send_new_mail
);


module.exports = router;