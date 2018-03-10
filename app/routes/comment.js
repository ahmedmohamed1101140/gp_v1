var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
var Post       = require("../../models/post");
var Comments   = require("../../models/comment");
var commentController = require("../controllers/CommentController");

router.get("/new",commentController.new_comment);
router.post("/new",commentController.new_comment_post);
router.get("/:id/edit",commentController.comment_edit);
router.put("/:id",commentController.comment_edit_put);
router.delete("/:id",commentController.comment_delete);
    
module.exports = router;