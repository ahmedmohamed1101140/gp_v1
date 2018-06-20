
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
//var User       = require("../models/user");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");
var postController = require("../controllers/PostController");
var postMiddleware = require("../../middleware/PostMiddleware");
//var middleware = require("../middleware");

// Show The Comment in The Post
router.get("/:post_id/comments/show",postController.show);

// Create New Post 
router.get("/posts/new",postController.new_post);

// Post  for Create New Post 
router.post("/posts",postMiddleware.validate_data,postController.new_post_post);

//Edit  Post 
router.get("/:id/edit",postMiddleware.validate_user,postController.post_edit);

// Post for Edit  Post 
router.put("/:id",postController.post_edit_put);
// Delete  Post 
router.delete("/:id",postMiddleware.validate_user,postController.post_delete);
     



    module.exports = router;