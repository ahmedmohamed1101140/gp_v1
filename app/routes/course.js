const express = require("express");
const router = express.Router({mergeParams: true});
var coursecontroller = require("../controllers/CourseController");
var departmentcontroller = require("../controllers/DepartmentController");
var coursemiddleware = require("../../middleware/CourseMiddleware");

//get the home page contain all departments
router.get("/" 
    , coursecontroller.get_all_courses
);

//get form to add new department and adding the new department basic data
router.get("/new"  
    , coursecontroller.display_creation_form
    ,departmentcontroller.get_all_departments
);

//create new department
router.post("/"
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.create_new_course
);

//get specific department data
router.get("/:course_id" 
    , coursecontroller.get_course
);

//get editing form and edit the department
router.get("/edit/:course_id"
    , coursecontroller.display_update_form,
    departmentcontroller.get_all_departments
);
router.get("/info/:course_id"
, coursecontroller.get_course_info

);

//update the department
router.put("/:course_id" 
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.update_course
);

//delete the department route
router.delete("/:course_id"
    , coursecontroller.delete_course
);



module.exports = router;