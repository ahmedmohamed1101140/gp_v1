var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments   = require("../../models/comment");
var commentController = require("../controllers/CommentController");
var commentMiddleware = require("../../middleware/CommentMiddleware");
// Create New Comment 
router.get("/new",commentController.new_comment);
// Post For  Create New Comment 
router.post("/new",commentMiddleware.validate_data,commentController.new_comment_post);
// Edit The Comment 
router.get("/:id/edit",commentMiddleware.validate_user,commentController.comment_edit);
// Post For  Edit The Comment 
router.put("/:id",commentMiddleware.validate_data,commentController.comment_edit_put);
// Delete  The Comment 
router.delete("/:id",commentMiddleware.validate_user,commentController.comment_delete);
    
module.exports = router;