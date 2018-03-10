
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
//var User       = require("../models/user");
var Post       = require("../../models/post");
var Comments  = require("../../models/comment");
var postController = require("../controllers/PostController");
var postMiddleware = require("../../middleware/PostMiddleware");
//var middleware = require("../middleware");

router.get("/:post_id/comments/show",postController.show);
router.get("/posts/new",postController.new_post);


router.post("/posts",postMiddleware.validate_data,postController.new_post_post);


router.get("/:id/edit",postController.post_edit);

  
  router.put("/:id",postMiddleware.validate_data,postController.post_edit_put);

    router.delete("/:id",postController.post_delete);
     



    module.exports = router;