
const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var User       = require("../../models/user");
var GroupController = {};
// Show all The Groups
GroupController.get_all_groups = function (req,res) {
    Group.find({},function(err,allCroup){
        if(err)
        {
           req.flash("error" , " Some Thing Happend Cause Error ...please Try Again.");
           res.redirect("/")
        }
        else
        {
            res.render("Groups/groups",{groups:allCroup});
        }
    });
}
// Get specific Group
GroupController.get_specific_group=function(req,res){
    Group.findById(req.params.id).populate("posts").exec(function(err , groupfind){
        if(err)
        {
            req.flash("error" , " Some Thing Happend Cause Error ...please Try Again.");
            res.redirect("/groups");

        } else
        {
            res.render("Groups/show",{group:groupfind});
        }
    });
};
// Create New Group
GroupController.new_group = function(req,res){
    res.render("Groups/new");
};

// Post For Create New Group
GroupController.create_group =function (req,res) {
    var name = req.body.name;
    var imagee = req.body.image;
    var description= req.body.description;
    var admin = {
        id: req.user._id,
        username: req.user.username,
        userimage: req.user.image
    };
    var newGroup = {name:name,image:imagee ,description:description ,admin:admin};
    Group.create(newGroup,function(err, group) {
      
      if(err)
      {
        req.flash("error" , "Faild to Create Invalid Input or Duplicate Key Values please check your inputs");
        res.redirect("Groups/new");
      }
      else
      {
        req.flash("success" , "Group Created");  
        res.redirect("/groups");
      } 
    });
}
// Edit  Group 
GroupController.group_edit =function(req,res){
    Group.findById(req.params.id).exec(function(err , groupfind){
      if(err)
      {
        req.flash("error" , "invalid input");
        res.redirect("back"); 
      }
       else
       {
          res.render("Groups/edit",{group:groupfind});
       }
  
    });
}
// Post for Edit  Group 
GroupController.group_edit_post = function(req,res){
    var newGroup = { 
        name:req.body.name,
        image:req.body.image ,
        description:req.body.description    
    };
    
    Group.findByIdAndUpdate(req.params.id,newGroup,function(err,updateGroup){
        if(err)
        {   
            req.flash("error" , "invalid input");
            res.redirect("/groups");
        }
        else
        {
            req.flash("success" , "Group Updated");
            res.redirect("/groups/"+ req.params.id);
        }
    });
}
// Delete Group
GroupController.group_delete =function(req,res){
    Group.findById(req.params.id,function(err, groupFind){
      if(err)
      {  
        req.flash("error" , "Delete Failed... please Try Again.");
        res.redirect("/groups");
      }
      else
      {
          groupFind.posts.forEach(function(post){
           Post.findByIdAndRemove(post,function(err){
                      if(err)
                      {
                               
                      }
            });       
        });
      }
    });
     Group.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            req.flash("error" , "Failed To Find Group ... please Try Again.");
            res.redirect("/groups");
        }
        else
        {
            req.flash("success" , "Group Deleted");
            res.redirect("/groups");
        }
     });
}
// New Request for Joining Group
GroupController.new_request= function(req,res){
    Group.findById(req.params.id,function(err,foundGroup){
        var user = {
            id: req.user._id,
            username: req.user.username,
            userstatus: 0
        };
        //push the user to the group but don't allow him
        foundGroup.users.push(user);
        foundGroup.save();
         // redirect to the SHOW router
         req.flash("success", "Request Sent!");
         res.redirect("/groups");
     });
}
//Show All Requests for Group
GroupController.show_all_request=function(req,res){
 Group.findById(req.params.id,function(err,foundGroup){
       if(err)
       {
        res.redirect("/groups");
       }
       else
       {
         res.render("Groups/Requests",{group:foundGroup,Request:foundGroup.users});
       }

 });

}
// Accept Request for Joining Group 
GroupController.accpet_request=function(req,res){
    Group.findById(req.params.group_id,function (err,foundGroup) {
        foundGroup.users.forEach(function (user) {
            if(user._id.equals(req.params.user_id))
            {
                user.userstatus = 1;
                user.save();
               
                foundGroup.members_num++;
                foundGroup.save();

                User.findById(user.id,function (err,foundUser) {
                    if(err)
                    {
                       
                    }
                    else
                     {
                        foundUser.groups.push(foundGroup);
                        foundUser.save();
                     }
                });
                req.flash("success", "user Successfully added!");
                res.redirect("back");
            }
        });
    }); 

}

module.exports = GroupController;