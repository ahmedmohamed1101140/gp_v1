const express = require("express"),
    router = express.Router({mergeParams: true});
var coursecontroller = require("../controllers/CourseController");
var coursemiddleware = require("../../middleware/CourseMiddleware");


//get the home page contain all departments
router.get("/" 
    , coursecontroller.get_all_courses
);

//add new department and adding the new department basic data
router.post("/" 
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.create_new_course
);

//get specific department data
router.get("/:course_id" 
    , coursecontroller.get_course
);

//edit the department
router.put("/:course_id" 
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.update_course
);

//delete the department
router.delete("/:course_id" 
    , coursecontroller.delete_course
);


module.exports = router;
