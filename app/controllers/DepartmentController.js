//require the model
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Department = require("../../models/department");
var User       = require("../../models/user");

var DepartmentController = {};

//GET --view all departments
DepartmentController.get_all_departments = function(req,res,next){  
    Department.find(function(err,departments){
        if(err){
            console.log(err.message);
            req.flash("error" , "can't find Departments");
            res.redirect("back");
        }
        else{
            res.render("Departments/index" , {departments : departments });
        }
    });
};

//GET --view specific department
DepartmentController.get_department = function (req ,res ,next) {
    Department.findById(req.params.department_id,function (err , found_department) {
        if(err){
            console.log(err.message);
            req.flash("error" , "invalid input data");
            res.redirect('/departments');   
        }
        else {
            if(found_department){
                console.log(found_department);
                // rednder the 
                res.render("Departments/show",{department:found_department});
            }
            else {
                console.log("invalid department _id input "+ req.params.department_id);
                req.flash("error" , "Invalid input data");
                res.redirect("/departments");
            }
        }
    });
};

//GET --display department creation form
DepartmentController.display_creation_form = function(req,res,next){
    User.find().exec(function(err,users){
        if(err){
            console.log(err.message);
            req.flash("error" , "Sorry try Again");
            res.redirect("back");
        }
        else{
            res.render("Departments/new",{users:users});
        }
    })
};

//POST  --create and add new department to the DB
DepartmentController.create_new_department = function(req,res,next){
    console.log(req.body);

    //2- create new department
        var department = new Department({
        name: req.body.dep_name,
        key: req.body.dep_key,
        description: req.body.dep_description,
        since: req.body.dep_date,
        desc_file: req.files[0].filename,
        courses_file:req.files[1].filename ,                
        logo: req.files[2].filename 
    });

    var objectives = req.body.objectives.split(",");
    objectives.forEach(element =>{
        department.objectives.push(element);
    });

    //3- save the department
    Department.create(department,function (err,newDepartment) {
        if(err){
            console.log(err.message);
            delete_file(req.files[0].filename);
            delete_file(req.files[1].filename);
            delete_file(req.files[2].filename); 
            req.flash("error" , "Faild to Create Invalid Input or Duplicate Key Values please check your inputs");
            res.redirect('/departments/new');
        }
        else{
            console.log(newDepartment);
            req.flash("success" , "Department Added");
            //4- redirect to department/new department id
            res.redirect("/departments/"+newDepartment._id);
        }
    });
};

//GET --department updating form
DepartmentController.display_update_form = function(req,res,next){
    Department.findById(req.params.department_id,function(err,department){
        if(err){
            console.log(err.message);
            req.flash("error" , "invalid input");
            res.redirect('/departments');
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
            console.log(err.message);
            delete_file(req.files[0].filename);
            delete_file(req.files[1].filename);
            delete_file(req.files[2].filename);            
            req.flash("error" , "Invalid Input for department id");
            res.redirect("/departments/edit/"+req.patams.department_id);
        }
        else{
            if(found_department){
                var files = [found_department.desc_file , found_department.courses_file , found_department.logo];
                var uploaded_files = [req.files[0].filename , req.files[1].filename , req.files[2].filename];
                
                found_department.name = req.body.dep_name;
                found_department.key = req.body.dep_key;
                found_department.description = req.body.dep_description;
                found_department.since = req.body.dep_date;
                found_department.desc_file =req.files[0].filename;
                found_department.courses_file = req.files[1].filename;
                found_department.logo = req.files[2].filename;
                
                for(var i=0;i<found_department.objectives.length;i++){
                    found_department.objectives.pop();
                };
                var objectives = req.body.objectives.split(",");
                objectives.forEach(element =>{
                    found_department.objectives.push(element);
                });

                

                found_department.save(function(err){
                    if(err){
                        console.log(err.message);
                        //delete uploaded files 
                        uploaded_files.forEach(element => {
                            delete_file(element);
                        });
                        req.flash('error' , "Invalid Inputs missing or duplicate data");
                        res.redirect("/departments/edit/"+req.params.department_id);
                    }
                    else{
                        //delete old files
                        files.forEach(element => {
                            delete_file(element);
                        });
                        console.log(found_department);
                        req.flash("success" , "Department Updated");
                        //4- redirect to department/new department id
                        res.redirect("/departments/"+found_department._id);
                    }
                });

            }
            else {
               console.log("No Valid Entries");
               req.flash("error" , "No Valid Entries");
               res.redirect("/departments/edit/"+req.params.department_id);
            }
        }
    });
};

//DELETE --delete specific department
DepartmentController.delete_department = function (req , res, next) {
   
    var files = [];
     Department.findById(req.params.department_id,function (err,found) {
        if(err){
            console.log(err.message);
            req.flash("error" , "Faild To Delete Department");
            res.redirect("/departments");
        }
        else {
            if(found){
                files = [found.desc_file , found.courses_file , found.logo]; 
                Department.findByIdAndRemove(req.params.department_id , function (err) {
                    if(err){
                        console.log(err.message);
                        req.flash("error" , "Faild To Delete Department");
                    }
                    else {
                        //delete the old files
                        files.forEach(element => {
                            delete_file(element);
                        });
                        //redirect to department page
                        console.log("Department Deleted");
                        req.flash("success" , "Department Deleted");
                        res.redirect("/departments");
                    }
                });
            }
            else{
                console.log("invalid ID for Department");
                req.flash("error" , "Can't Delete Department");
                req.redirect("/departments");
            }
        }
    });

   
};

DepartmentController.upload_files = function(req,res,next){
    upload_file(req,res,function(err){
        if(err){
            console.log(err.message);
            req.flash("error" , "Can't Upload Files");
            res.redirect("back");
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
            return console.error(err.message);
        }

        fs.unlink('./public/uploads/'+file,function(err){
            if(err) return console.log(err.message);
            console.log('file deleted successfully');
        });
    });
};