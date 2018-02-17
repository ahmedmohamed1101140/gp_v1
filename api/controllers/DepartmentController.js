//require the model
var fs = require('fs');
var upload = require("../../config/file-multer");
var Department = require("../../models/department");


var DepartmentController = {};

DepartmentController.get_all_departments = function(req,res,next){
    Department.find().select('name key description since desc_file student_num graduated_num').exec(function (err , departments) {
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

DepartmentController.create_new_department = function(req,res,next){
    //1- upload the file
    upload(req,res,function (err) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
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
        }
    });
};

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

DepartmentController.update_department = function (req ,res, next) {

    Department.findById(req.params.department_id , function (err, found_department) {
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else{
            if(found_department){
                delete_file(found_department.desc_file);
                upload(req,res,function (err) {
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
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
                                res.status(500).json({
                                    error: err
                                });
                            }
                            else{
                                console.log(UpdatedDepartment);
                                res.status(201).json({
                                    message: "new Department Created",
                                    UpdatedDepartment: UpdatedDepartment,
                                    request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/departments/'+ UpdatedDepartment._id
                                    }
                                });
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