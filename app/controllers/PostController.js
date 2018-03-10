const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");

var PostController = {};

PostController.show = function (req, res){

    Post.findById(req.params.post_id).populate("comments").exec(function(err,postFind){
        
          if(err){
             console.log(err.message);
             req.flash("error" , "Failed To Get Post ... please Try Again.");
         }else{

            res.render("Comments/show",{post:postFind,group_id:req.params.group_id});
         }

 
            });
    };
PostController.new_post = function(req,res){

    Group.findById(req.params.group_id,function(err , groupfind){
        if(err)
        {
            console.log(err.message);
            req.flash("error" , "Failed To Add Post ... please Try Again.");

        } else
        {        
        
            res.render("Posts/new",{group:groupfind});
        }

            });
};

PostController.new_post_post =function(req,res){

    Group.findById(req.params.group_id,function(err , groupfind){
        if(err)
        {
            console.log(err.message);
            req.flash("error" , "Failed To Find Group  ... please Try Again.");
            res.redirect("Groups/show");

        } else
        {     

             var post = new Post({
                content: req.body.content,
                image:req.body.image
            });
            Post.create(post,function(err,postCreated){
                if(err)
                {
                    console.log(err.message);
                    req.flash("error" , "Failed To Create Post / Invalid Data  ... please Try Again.");
                }
                else
                {
                   groupfind.posts.push(postCreated);
                   groupfind.save();
                   res.redirect("/groups/"+groupfind._id);
                    
                }

           });
          } 
        });
     };
PostController.post_edit =function(req,res){
        Post.findById(req.params.id).exec(function(err , postfind){
          if(err)
          {
              console.log(err.message);
              req.flash("error" , "Failed To Find Post  ... please Try Again.");
      
          } else {
              res.render("Posts/edit",{post:postfind,group:req.params.group_id});
          }
      
        });
};
PostController.post_edit_put=function(req,res){
    Post.findById(req.params.id,function(err,updateGroup){
           if(err){
               console.log(err.message);
               req.flash("error" , "Failed To Find Post  ... please Try Again.");
               res.redirect("/groups");
           }else{
             updateGroup.content=req.body.content;
             updateGroup.image= req.body.image;
             updateGroup.save();             
               res.redirect("/groups/"+ req.params.group_id);
           }
          });
};
PostController.post_delete=function(req,res){
 
    Post.findById(req.params.id,function(err, postFind){
      if(err){
        console.log(err.message);
        req.flash("error" , "Failed  Delete Post  ... please Try Again.");
        res.redirect("/groups");
 
      }else{
        console.log(postFind.comments);
        postFind.comments.forEach(function(comment){
         console.log(comment);
         Comments.findByIdAndRemove(comment,function(err){
 
                      if(err){
                               console.log(err);
                            }
            });       
        });
      }
    });
 
     Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash("error" , "Failed  Delete Post  ... please Try Again.");
            res.redirect("/groups/"+req.params.group_id);
        }else{
         res.redirect("/groups/"+req.params.group_id);
        }
     });
};

    module.exports = PostController;









