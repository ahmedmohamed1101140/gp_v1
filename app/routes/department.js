const express = require("express");
const router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");

//get the home page contain all departments
router.get("/"                           , departmentcontroller.get_all_departments);

//get form to add new department and adding the new department basic data
router.get("/new"                        , departmentcontroller.display_creation_form);
router.post("/"                          , departmentcontroller.create_new_department);

//get specific department data
router.get("/:department_id"             , departmentcontroller.get_department);

//get editing form and edit the department
router.get("/edit/:department_id"        , departmentcontroller.display_update_form);
router.put("/:department_id"           , departmentcontroller.update_department);

//delete the department route
router.delete("/:department_id"          , departmentcontroller.delete_department);



module.exports = router;