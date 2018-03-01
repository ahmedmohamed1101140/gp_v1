//require the model
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Department = require("../../models/department");

var DepartmentController = {};

//GET --view all departments
DepartmentController.get_all_departments = function(req,res,next){
    Department.find(function(err,departments){
        if(err){
            console.log(err);
        }
        else{
            res.render("Departments/index" , {departments : departments});
        }
    })
};

//GET --view spacific department
DepartmentController.get_department = function (req ,res ,next) {
    console.log(req.params.department_id);
    Department.findById(req.params.department_id,function (err , found_department) {
        if(err){
            console.log(err);
        }
        else {
            if(found_department){
                console.log(found_department);
                // rednder the page
                res.render("Departments/show",{department:found_department});
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};

//GET --display department creation form
DepartmentController.display_creation_form = function(req,res,next){
    res.render("Departments/new");
};

//POST  --create and add new department to the DB
DepartmentController.create_new_department = function(req,res,next){
    //2- create new department
        var department = new Department({
        name: req.body.dep_name,
        key: req.body.dep_key,
        description: req.body.dep_description,
        since: req.body.dep_date,
        desc_file: req.files[0].filename,
        courses_file:req.files[1].filename ,                
        logo: req.files[2].filename, 
    });
    //3- save the department
    Department.create(department,function (err,newDepartment) {
        if(err){
            console.log(err);
        }
        else{
            console.log(newDepartment);
            //4- redirect to department/new department id
            res.redirect("/departments/"+department._id);
        }
    });
};

//GET --department updating form
DepartmentController.display_update_form = function(req,res,next){
    Department.findById(req.params.department_id,function(err,department){
        if(err){
            console.log(err);
        }
        else{
            res.render("Departments/edit",{department : department});      
        }
    })
};

//PUT --update specific department data
DepartmentController.update_department = function (req ,res, next) {
   
    Department.findById(req.params.department_id , function (err, found_department) {
        if(err){
            console.log(err);
        }
        else{
            if(found_department){
                delete_file(found_department.desc_file);
                delete_file(found_department.courses_file);
                delete_file(found_department.logo);
                
                found_department.name = req.body.dep_name;
                found_department.key = req.body.dep_key;
                found_department.description = req.body.dep_description;
                found_department.since = req.body.dep_date;
                found_department.desc_file =req.files[0].filename;
                found_department.courses_file = req.files[1].filename;
                found_department.logo = req.files[2].filename;
                

                found_department.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(UpdatedDepartment);
                        //4- redirect to department/new department id
                        res.redirect("/departments/"+found_department._id);
                    }
                });

            }
            else {
               console.log("No Valid Entries");
            }
        }
    });
};

//DELETE --delete specific department
DepartmentController.delete_department = function (req , res, next) {
   
     Department.findById(req.params.department_id,function (err,found) {
        if(err){
            console.log(err);
        }
        else {
            delete_file(found.desc_file);
            delete_file(found.courses_file);
            delete_file(found.logo); 
        }
    });

    Department.findByIdAndRemove(req.params.department_id , function (err) {
        if(err){
            console.log(err)
        }
        else {
            //redirect to another page
            res.redirect("back");

        }
    });
};

DepartmentController.upload_files = function(req,res,next){
    upload_file(req,res,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("upload done");
            next();
        }
    });
};

module.exports = DepartmentController;

//static function for deleting file
delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
};