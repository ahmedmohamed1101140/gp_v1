const express = require("express"),
    router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");
var departmentmiddleware = require("../../middleware/DepartmentMiddleware");


//get the home page contain all departments
router.get("/" 
    , departmentcontroller.get_all_departments
);

//add new department and adding the new department basic data
router.post("/" 
    , departmentcontroller.upload_files //middleware to upload the files
    , departmentmiddleware.validate_data //middleware to validate the user input data
    , departmentcontroller.create_new_department
);

//get specific department data
router.get("/:department_id" 
    , departmentcontroller.get_department
);

//edit the department
router.put("/:department_id" 
    , departmentcontroller.upload_files //middleware to upload the files
    , departmentmiddleware.validate_data //middleware to validate the user input data
    , departmentcontroller.update_department
);

//delete the department
router.delete("/:department_id" 
    , departmentcontroller.delete_department
);


module.exports = router;
