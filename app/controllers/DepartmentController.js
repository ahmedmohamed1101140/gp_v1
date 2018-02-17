//require the model
const fs = require('fs');
var upload = require("../../config/file-multer");
var Department = require("../../models/department");

var DepartmentController = {};

DepartmentController.get_all_departments = function(req,res,next){
    res.render("Departments/index");
}

DepartmentController.get_new = function(req,res,next){
    res.render("Departments/new");
}

DepartmentController.create_new_department = function(req,res,next){
    //1- upload the file
    upload(req,res,function (err) {
        if(err){
            console.log(err)
        }
        else {
            //2- create new department
            var department = new Department({
                name: req.body.dep_name,
                key: req.body.dep_key,
                description: req.body.dep_description,
                since: req.body.dep_date,
                desc_file: req.file.filename
            });
            //3- save the department
            Department.create(department,function (err,newDepartment) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(newDepartment);
                    //4- redirect to department/new department id
                }
            });
        }
    });
};

DepartmentController.get_department = function (req ,res ,next) {
    Department.findById(req.params.department_id,function (err , found_department) {
        if(err){
            console.log(err);
        }
        else {
            if(found_department){
                console.log(found_department);
                // rednder the page
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};

DepartmentController.update_department = function (req ,res, next) {
    Department.findById(req.params.department_id , function (err, found_department) {
        if(err){
            console.log(err);
        }
        else{
            if(found_department){
                delete_file(found_department.desc_file);
                upload(req,res,function (err) {
                    if(err){
                        console.log(err);
                    }
                    else {
                        //2- create new department
                        var department = new Department({
                            name: req.body.dep_name,
                            key: req.body.dep_key,
                            description: req.body.dep_description,
                            since: req.body.dep_date,
                            desc_file: req.file.filename
                        });
                        //3- save the department
                        Department.findByIdAndUpdate(department,function (err,UpdatedDepartment) {
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(UpdatedDepartment);
                                //redirect to another page
                            }
                        });
                    }
                });
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for the provided ID"
                });
            }
        }
    });
};

DepartmentController.delete_department = function (req , res, next) {
    Department.findById(req.params.department_id,function (err,found) {
        if(err){
            console.log(err);
        }
        else {
            delete_file(found.desc_file)
        }
    });

    Department.findByIdAndRemove(req.params.department_id , function (err) {
        if(err){
            console.log(err)
        }
        else {
            //redirect to another page
            res.send("success");
        }
    });
};


module.exports = DepartmentController;

delete_file = function (file) {
    var file = file;
    fs.stat('./public/uploads/'+file, function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable

        if (err) {
            return console.error(err);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
};