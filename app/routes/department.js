const express = require("express"),
      router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");


router.get("/"                  , departmentcontroller.get_all_departments);
router.get("/new"               , departmentcontroller.get_new);
router.post("/"                 , departmentcontroller.create_new_department);
router.get("/:department_id"    , departmentcontroller.get_department);
router.patch("/:/department_id" , departmentcontroller.update_department);
router.delete("/:department_id" , departmentcontroller.delete_department);

module.exports = router;