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
router.get("/:course_id/attendance"
, coursecontroller.get_course_attendance

);
router.get("/:course_id/editgrades/:student_id"
, coursecontroller.edit_student_grades

);
router.get("/:course_id/editpercentage"
, coursecontroller.edit_percentage

);
router.put("/:course_id/editpercentage"
, coursecontroller.put_percentage

);
router.get("/:course_id/addstudent"
, coursecontroller.add_student

);
router.put("/:course_id/addstudent"
, coursecontroller.put_student

);
router.put("/:course_id/editgrades/:student_id"
, coursecontroller.put_student_grades

);
  


router.get("/:course_id/editattendance/:student_id/:type"
, coursecontroller.edit_student_attendance

);
router.put("/:course_id/editattendance/:student_id/:type"
, coursecontroller.put_student_attendance

);








router.get("/:course_id/grades/add"
, coursecontroller.add_course_grades

);
router.get("/:course_id/grades"
, coursecontroller.get_course_grades

);
router.put("/:course_id/attendance"
, coursecontroller.put_course_attendance

);
router.put("/:course_id/grades"
, coursecontroller.put_course_grades

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