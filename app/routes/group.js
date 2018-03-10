var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
var groupController = require("../controllers/GroupController");
//var User       = require("../models/user");
var Post       = require("../../models/post");
//var Comments   = require("../models/comment");
//var middleware = require("../middleware");


router.get("/",
    groupController.get_all_groups
);
router.get("/new",groupController.new_group);

router.post("/groups/new",groupController.create_group);


router.get("/:id/edit",groupController.group_edit);

router.put("/:id",groupController.group_edit_post);

  router.delete("/:id",groupController.group_delete);


router.get("/:id",groupController.get_specific_group);

module.exports = router;