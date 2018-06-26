const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");
var CommentController = {};
// Create New Comment
CommentController.new_comment =function(req,res){
    Group.findById(req.params.group_id,function(err , groupFind) {
        if(err)
        {
            req.flash("error" , "Sorry Failed  Create Comment please Try Again.");
            res.redirect("back");
        }
        else
        {
            Post.findById(req.params.post_id,function(err , postFind){
                if(err)
                {
                     req.flash("error" , "Sorry Failed  Create Comment  please Try Again.");
                     res.redirect("back");                    
        
                } 
                else
                {
                    res.render("Comments/new",{post:postFind , group:groupFind});
                }
        });
        }
    });
};
// Post For  Create New Comment
CommentController.new_comment_post = function(req,res){
        Group.findById(req.params.group_id,function(err , groupfind){
               if(err)
               {   
                   req.flash("error" , "Failed  Create Comment /Invlaid Data  ... please Try Again.");
                   res.redirect("/Groups");
               }
               else
               {
                Post.findById(req.params.post_id,function(err,postFind){
                     if(err)
                     {
                         req.flash("error" , "Failed  Create Comment  ... please Try Again.");
                         res.redirect("/Groups");   
                     }
                     else
                     {
                        var comment = new Comments({
                        content:req.body.content ,
                        author:{
                            id:req.user.id,
                            username:req.user.username,
                            userimage:req.user.image
                        }
                       });
                         
                        Comments.create(comment,function(err,commentCreated){
                            if(err)
                            {
                              req.flash("error" , "Failed  Create Comment  ... please Try Again.");
                            }
                            else
                             {
                                 postFind.comments_num =postFind.comments_num+1;
                                 postFind.comments.push(commentCreated);
                                 postFind.save();
                                 req.flash("success" , "Comment Created Successfully");
                                 res.redirect("/groups/"+groupfind._id+"/"+req.params.post_id+"/comments/show");
                            }
                        });
                      }
                });
               }
    });
};
// Edit The Comment
CommentController.comment_edit=function(req,res){
    Comments.findById(req.params.id).exec(function(err , commentfind){
      if(err)
      {
          req.flash("error" , "Failed  Update Comment   ... please Try Again.");
          res.redirect("back");          
  
      } 
      else
      {
          res.render("Comments/edit",{comment:commentfind,group:req.params.group_id,post:req.params.post_id});
      }
  
    });
};
// Post for  Edit The Comment
CommentController.comment_edit_put=function(req,res){
    Comments.findById(req.params.id,function(err,updateComment){
           if(err)
           {   
               req.flash("error" , "Invalid  Data Input  ... please Try Again.");
               res.redirect("/groups");
           }
           else
           {
            updateComment.content=req.body.content;
            updateComment.save();  
            req.flash("success" , "Comment Updated")           
            res.redirect("/groups/"+ req.params.group_id +"/"+req.params.post_id+"/comments/show");
           }
          });
};
// Delete Comment in Post 
CommentController.comment_delete=function(req,res){
    Post.findById(req.params.post_id,function(err, postFind){
      if(err)
      {
        req.flash("error" , "failed  Delete Comment  ... please Try Again.");
        res.redirect("/groups"); 
      }
      else
      {
        postFind.comments.remove(req.params.id);
        postFind.comments_num =  postFind.comments_num - 1;
        postFind.save(); 
      }
    });
    Comments.findByIdAndRemove(req.params.id, function(err){
        if(err)
        {
            req.flash("error" , "failed  Delete Comment  ... please Try Again.");
            res.redirect("/groups/"+req.params.group_id);
        }
        else
        {
            req.flash("success" , "Comment Deleted");
            res.redirect("/groups/"+req.params.group_id +"/"+req.params.post_id+"/comments/show" );
        }
     });
 };



 module.exports = CommentController;