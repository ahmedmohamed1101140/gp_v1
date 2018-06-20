const express = require("express");
const router = express.Router({mergeParams: true});
var coursecontroller = require("../controllers/CourseController");
var departmentcontroller = require("../controllers/DepartmentController");
var coursemiddleware = require("../../middleware/CourseMiddleware");
var authorizationmiddleware = require("../../middleware/AuthorizationMiddleware");


//get the home page contain all courses
router.get("/" ,
authorizationmiddleware.isLoggedIn
    , coursecontroller.get_all_courses
    
);

//get form to add new department and adding the new department basic data
router.get("/new"  
    ,authorizationmiddleware.isAdmin
    , coursecontroller.display_creation_form
    ,departmentcontroller.get_all_departments
);

//create new course
router.post("/"
    ,authorizationmiddleware.isAdmin
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.create_new_course
);

//get specific course data
router.get("/:course_id"
,authorizationmiddleware.isLoggedIn 
, coursecontroller.get_course
);

//get editing form and edit the department
router.get("/edit/:course_id"
    ,authorizationmiddleware.isCoursecontoller
    , coursecontroller.display_update_form,
    departmentcontroller.get_all_departments
);
router.get("/info/:course_id"
,authorizationmiddleware.isCourseMember
, coursecontroller.get_course_info

);
router.get("/:course_id/attendance"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.get_course_attendance

);
router.get("/:course_id/editgrades/:student_id"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.edit_student_grades

);
router.get("/:course_id/editpercentage"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.edit_percentage

);
router.put("/:course_id/editpercentage"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.put_percentage

);
router.get("/:course_id/addstudent"
,authorizationmiddleware.isAdmin
, coursecontroller.add_student

);
router.put("/:course_id/addstudent"
,authorizationmiddleware.isAdmin
, coursecontroller.put_student

);
router.put("/:course_id/editgrades/:student_id"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.put_student_grades

);
router.put("/:course_id/register/:student_id"
, coursecontroller.put_registration

);
  
router.get("/:course_id/editattendance/:student_id/:type"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.edit_student_attendance

);
router.put("/:course_id/editattendance/:student_id/:type"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.put_student_attendance

);

router.get("/:course_id/grades/add"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.add_course_grades

);
router.get("/:course_id/grades"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.get_course_grades

);
router.put("/:course_id/attendance"
, coursecontroller.put_course_attendance
);
router.put("/:course_id/grades"
,authorizationmiddleware.isCoursecontoller
, coursecontroller.put_course_grades

);


//update the course
router.put("/:course_id" 
    ,authorizationmiddleware.isCoursecontoller
    , coursecontroller.upload_files //middleware to upload the files
    , coursemiddleware.validate_data //middleware to validate the user input data
    , coursecontroller.update_course
);

//delete the department route
router.delete("/:course_id"
    ,authorizationmiddleware.isAdmin
    , coursecontroller.delete_course
);



module.exports = router;