const express = require("express"),
    router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");


//get the home page contain all departments
router.get("/"                  , departmentcontroller.get_all_departments);

//add new department and adding the new department basic data
router.post("/"                 , departmentcontroller.create_new_department);

//get specific department data
router.get("/:department_id"    , departmentcontroller.get_department);

//edit the department
router.put("/:department_id" , departmentcontroller.update_department);

//delete the department
router.delete("/:department_id" , departmentcontroller.delete_department);


module.exports = router;
