const express = require("express");
const router = express.Router({mergeParams: true});
var departmentcontroller = require("../controllers/DepartmentController");
var upload_file = require("../../config/file-multer");
var upload_image = require("../../config/image-multer");
var Department = require("../../models/department");

router.get("/"                  , departmentcontroller.get_all_departments);
router.get("/new"               , departmentcontroller.get_new);
router.post("/"                 , departmentcontroller.create_new_department);
router.get("/:department_id"    , departmentcontroller.get_department);
router.patch("/:department_id"  , departmentcontroller.update_department);
router.delete("/:department_id" , departmentcontroller.delete_department);

      

router.post("/new/logo/:department_id" , function(req,res){
      //get the department
      Department.findById(req.params.department_id,function(err,department){
            if(err){
                  console.log(err);
            }
            else{
                  //add the image to upload 
                  upload_image(req,res,function(err){
                        if(err){
                              console.log(err);
                        }
                        else{
                              //assign the name to the logo
                            department.logo = req.file.filename
                            department.save();  
                            //return the next page to add the courses PDF file            
                            res.render("Departments/new-courses",{department_id:req.params.department_id});      
                        }
                  });    
            }
      });
   });
   
router.post("/new/courses/:department_id" , function(req,res){
      //get the department
      Department.findById(req.params.department_id,function(err,department){
            if(err){
                  console.log(err);
            }
            else{
                  //add the image to upload 
                  upload_file(req,res,function(err){
                        if(err){
                              console.log(err);
                        }
                        else{
                              //assign the name to the logo
                              console.log(req.file);
                              department.courses_file = req.file.filename
                              department.save();  
                              //return the next page to add the courses PDF file            
                              res.redirect("/departments/"+department._id);
                        }
                  });    
            }
      });
   });
   


module.exports = router;