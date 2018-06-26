const fs = require('fs');
var upload_image = require("../../config/image-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");

var PostController = {};
//Show All Comment in Post 
PostController.show = function (req, res){

    Post.findById(req.params.post_id).populate("comments").exec(function(err,postFind){
        if(err){
            
             req.flash("error" , "Failed To Get Post ... please Try Again.");
             req.redirect("back");
         }else{
            res.render("Comments/show",{post:postFind,group_id:req.params.group_id});
         }
    });
};

// Create New Post 
PostController.new_post = function(req,res){
    Group.findById(req.params.group_id,function(err , groupfind){
        if(err)
        {
            
            req.flash("error" , "Failed To Add Post ... please Try Again.");
            res.redirect("back");
        } 
        else{        
            res.render("Posts/new",{group:groupfind});
        }
    });
};
//  Post for Create New Post 
PostController.new_post_post =function(req,res,next){
    console.log(req.file.filename);
   Group.findById(req.params.group_id,function(err , groupfind){
        if(err)
        {
            
            req.flash("error" , "Failed To Find Group  ... please Try Again.");
            res.redirect("Groups/show");

        } 
        else{     
             var post = new Post({
                content: req.body.content,
                image:req.file.filename,
                author:{
                    id:req.user.id,
                    username:req.user.username,
                    userimage:req.user.image
                }
            });
            Post.create(post,function(err,postCreated){
                if(err)
                {
                    req.flash("error" , "Failed To Create Post / Invalid Data  ... please Try Again.");
                    res.redirect("back");
                }
                else
                {
                   groupfind.posts.push(postCreated);
                   groupfind.save();
                   req.flash("success" , "Post Created");
                   res.redirect("/groups/"+groupfind._id);
                }
           });
          } 
    });
};

// Edit Post Content
PostController.post_edit =function(req,res){
    Post.findById(req.params.id).exec(function(err , postfind){
        if(err)
        {
        req.flash("error" , "Failed To Find Post  ... please Try Again.");
        req.redirect("back");
        } 
        else 
        {
            res.render("Posts/edit",{post:postfind,group:req.params.group_id});
        }
    });
};

// Put  Edit Post Content 
PostController.post_edit_put=function(req,res){
    Post.findById(req.params.id,function(err,updatePost){
        if(!updatePost){
            req.flash("error" , "Failed To Find Post  ... please Try Again.");
            res.redirect("/groups");
        }
        else
        {
            updatePost.content=req.body.content;
            updatePost.image= req.body.image;
            updatePost.save();             
            req.flash("success","Post Edited");
            res.redirect("/groups/"+ req.params.group_id);
        }
    });
};

// Delete Post In Group
PostController.post_delete=function(req,res){ 
    Post.findById(req.params.id,function(err, postFind){
      if(err)
      {
        req.flash("error" , "Failed  Delete Post  ... please Try Again.");
        res.redirect("/groups");
      }
      else
      {
            postFind.comments.forEach(function(comment){
            Comments.findByIdAndRemove(comment,function(err){
                if(err){
                        
                    }
                });       
           });
      }
    });
 
     Post.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            req.flash("error" , "Failed  Delete Post  ... please Try Again.");
            res.redirect("/groups/"+req.params.group_id);
        }
        else
        {
             req.flash("error" , "Post Removed");
             res.redirect("/groups/"+req.params.group_id);
        }
     });
};
// upload file 
PostController.upload_image = function(req,res,next){
    console.log('into upload function');

upload_image(req,res,function(err){
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
module.exports = PostController;









