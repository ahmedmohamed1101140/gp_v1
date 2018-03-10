const express = require("express");
const router = express.Router({mergeParams: true});
var emailcontroller = require("../controllers/EmailController");
var emailmiddleware = require("../../middleware/EmailMiddleware");


//get the home page contain all departments
router.get("/" 
    , emailcontroller.get_all_mails
);

//get form to add new department and adding the new department basic data
router.get("/new"  
    , emailcontroller.display_creation_form
);  

//create new department
router.post("/"
    , emailmiddleware.validate_data //middleware to validate the user input data
    , emailcontroller.send_new_mail
);


module.exports = router;