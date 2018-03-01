//require the model
var fs = require('fs');
var upload_file = require("../../config/file-multer");
var Department = require("../../models/department");


var DepartmentController = {};

//GET --JSON all departments
DepartmentController.get_all_departments = function(req,res,next){
    Department.find().select('name key description since desc_file courses_file logo student_num graduated_num').exec(function (err , departments) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            console.log(departments);
            res.status(200).json({
                message: "all system Departments",
                count: departments.length,
                Departments: departments.map(function (department) {
                    return{
                        _id: department._id,
                        name: department.name,
                        key: department.key,
                        description: department.description,
                        since: department.since,
                        desc_file : department.desc_file,
                        Student_number: department.student_num,
                        Graduated_number: department.graduated_num,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/departments/'+ department._id
                        }
                    }
                })
            });
        }
    })
};

//GET --JSON spacific department
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
            res.status(500).json({
                error: err
            });
        }
        else{
            console.log(newDepartment);
            res.status(201).json({
                message: "new Department Created",
                createdDepartment: newDepartment,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/departments/'+ newDepartment._id
                }
            });
        }
    });
};

//POST  --create and add new department to the DB
DepartmentController.get_department = function (req ,res ,next) {
    Department.findById(req.params.department_id,function (err , found_department) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if(found_department){
                console.log(found_department);
                res.status(202).json({
                    message: "Here Is Your Department",
                    Department: found_department
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

//PUT --update specific department data
DepartmentController.update_department = function (req ,res, next) {
    Department.findById(req.params.department_id , function (err, found_department) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else{
            if(found_department)
            {
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
                        res.status(500).json({
                            error: err
                        });
                    }
                    else{
                        console.log(found_department);
                        res.status(201).json({
                            message: "Department Updated",
                            UpdatedDepartment: found_department,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/departments/'+ found_department._id
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
            console.log(err);
            res.status(404).json({
                error:err
            });
        }
        else {
            res.status(202).json({
                message: "Department Deleted Successfully"
            });
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