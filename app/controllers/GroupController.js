
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");

var GroupController = {};

GroupController.get_all_groups = function (req,res) {
    Group.find({},function(err,allCroup){
        if(err)
        {
           console.log(err.message);
           req.flash("error" , " Some Thing Happend Cause Error ...please Try Again.");
        }
        else{
            res.render("Groups/groups",{groups:allCroup});
        }
    });
}

GroupController.get_specific_group=function(req,res){
    Group.findById(req.params.id).populate("posts").exec(function(err , groupfind){
        if(err)
        {
            console.log(err);
            req.flash("error" , " Some Thing Happend Cause Error ...please Try Again.");

        } else
        {
           // res.send(groupfind);
            res.render("Groups/show",{group:groupfind});
        }
       });
};

GroupController.new_group = function(req,res){
    res.render("Groups/new");
};
GroupController.create_group =function (req,res) {
    var name = req.body.name;
    var imagee = req.body.image;
    var description= req.body.description;
    var newGroup = {name:name,image:imagee ,description:description};
    
    Group.create(newGroup,function(err, group) {
      
      if(err){
        console.log(err.message);
        req.flash("error" , "Faild to Create Invalid Input or Duplicate Key Values please check your inputs");
        res.redirect("Groups/new");
      } 
      res.redirect("/groups");
    });
}

GroupController.group_edit =function(req,res){
    Group.findById(req.params.id).exec(function(err , groupfind){
      if(err)
      {
          console.log(err.message);
          req.flash("error" , "invalid input");
  
      } else
      {
        
          res.render("Groups/edit",{group:groupfind});
      }
  
    });
}
GroupController.group_edit_post = function(req,res){
  
                    var newGroup = { name:req.body.name,
                                     image:req.body.image 
                                    ,description:req.body.description
                                   };
                  
    Group.findByIdAndUpdate(req.params.id,newGroup,function(err,updateGroup){
           if(err){
               console.log(err.message);
               req.flash("error" , "invalid input");
               res.redirect("/groups");
           }else{
        
               res.redirect("/groups/"+ req.params.id);
           }
   
          });
}

GroupController.group_delete =function(req,res){
 
    Group.findById(req.params.id,function(err, groupFind){
      if(err){
        console.log(err.message);
        req.flash("error" , "Delete Failed... please Try Again.");
        res.redirect("/groups");
 
      }else{
            console.log(groupFind.posts);
       groupFind.posts.forEach(function(post){
         console.log(post);
         Post.findByIdAndRemove(post,function(err){
 
                      if(err){
                               console.log(err);
                              }
            });       
        });
      }
    });
 
     Group.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err.message);
            req.flash("error" , "Failed To Find Group ... please Try Again.");
            res.redirect("/groups");
        }else{
         res.redirect("/groups");
        }
     });
}


module.exports = GroupController;