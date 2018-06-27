const express = require("express");
const router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");
var departmentmiddleware = require("../../middleware/DepartmentMiddleware");
var usermiddleware = require("../../middleware/UserMiddleware");

//get the home page contain all departments
router.get("/" 
    , usermiddleware.isLoggedIn //middleware to validate the login users only
    , departmentcontroller.get_all_departments
);

//get form to add new department and adding the new department basic data
router.get("/new"  
    , usermiddleware.isAdmin //middleware to validate the admin users only
    , departmentcontroller.display_creation_form
);

//create new department
router.post("/"
    , usermiddleware.isAdmin //middleware to validate the admin users only
    , departmentcontroller.upload_files //middleware to upload the files
    , departmentmiddleware.validate_data //middleware to validate the user input data
    , departmentcontroller.create_new_department
);

//get specific department data
router.get("/:department_id" 
    , usermiddleware.isLoggedIn // validate if the user is logind in
    , departmentcontroller.get_department
);

//get editing form and edit the department
router.get("/edit/:department_id"
    , usermiddleware.isAdmin
    , departmentcontroller.display_update_form
);

//update the department
router.put("/:department_id" 
    , usermiddleware.isAdmin
    , departmentcontroller.upload_files //middleware to upload the files
    , departmentmiddleware.validate_data //middleware to validate the user input data
    , departmentcontroller.update_department
);

//delete the department route
router.delete("/:department_id"
    , usermiddleware.isAdmin
    , departmentcontroller.delete_department
);


module.exports = router;