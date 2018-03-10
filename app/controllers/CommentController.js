const fs = require('fs');
var upload_file = require("../../config/file-multer");
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");
var CommentController = {};

CommentController.new_comment =function(req,res){

    Group.findById(req.params.group_id,function(err , groupFind) {
       
        if(err){
        console.log(err);
        }else{
            Post.findById(req.params.post_id,function(err , postFind){
                if(err)
                {
                    console.log(err);
        
                } else
                {
                    res.render("Comments/new",{post:postFind , group:groupFind});
                }
        
        });
        }



    });
};
CommentController.new_comment_post = function(req,res){
    Group.findById(req.params.group_id,function(err , groupfind){
               if(err){
                   console.log(err);
                   res.redirect("/Groups");
               }
               else{
                Post.findById(req.params.post_id,function(err,postFind){
                     if(err)
                     {
                         console.log(err);
                     }
                     else
                     {
                       var comment = new Comments({
                        content:req.body.content 
                       });
                         
                        Comments.create(comment,function(err,commentCreated){
                            if(err){
                              console.log(err);
                            }
                            {
                        //  commentCreated.author.id=req.user._id;
                        //  commentCreated.author.username=req.user.username;
                                 postFind.comments_num =postFind.comments_num+1;
                                 postFind.comments.push(commentCreated);
                                 postFind.save();
                                 res.redirect("/groups/"+groupfind._id);
                            }
                    });
                }

                });
               }
    });
};
CommentController.comment_edit=function(req,res){
    Comments.findById(req.params.id).exec(function(err , commentfind){
      if(err)
      {
          console.log(err);
  
      } else
      {
        
          res.render("Comments/edit",{comment:commentfind,group:req.params.group_id,post:req.params.post_id});
      }
  
    });
};
CommentController.comment_edit_put=function(req,res){
    Comments.findById(req.params.id,function(err,updateComment){
           if(err){
               console.log(err);
               res.redirect("/groups");
           }else{
            updateComment.content=req.body.content;
            updateComment.save();             
            res.redirect("/groups/"+ req.params.group_id +"/"+req.params.post_id+"/comments/show");
           }
          });
};
CommentController.comment_delete=function(req,res){
 
    Post.findById(req.params.post_id,function(err, postFind){
      if(err){
        console.log(err);
        res.redirect("/groups");
 
      }else{
        console.log(postFind.comments);
        postFind.comments.remove(req.params.id);
        postFind.comments_num =  postFind.comments_num - 1;
        postFind.save();
       
      }
    });
    Comments.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/groups/"+req.params.group_id);
        }else{
           res.redirect("/groups/"+req.params.group_id +"/"+req.params.post_id+"/comments/show" );
        }
     });
 };

module.exports = CommentController;