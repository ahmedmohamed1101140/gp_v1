var express    = require("express");
var router     = express.Router({mergeParams: true});
var Group      = require("../../models/group");
var groupController = require("../controllers/GroupController");
var groupMiddleware = require("../../middleware/GroupMiddleware");
//var User       = require("../models/user");
var Post       = require("../../models/post");
//var Comments   = require("../models/comment");
//var middleware = require("../middleware");

// Get All Group
router.get("/", groupController.get_all_groups);
// create New Group
router.get("/new",groupMiddleware.isAdmin,groupController.new_group);
// Get Specific Group
router.get("/:id",groupMiddleware.isAllowed,groupController.get_specific_group);

// Post for create New Group
router.post("/groups/new",groupMiddleware.validate_data,groupController.create_group);

// Edit Group 
router.get("/:id/edit",groupController.group_edit);
// Post for  Edit Group 
router.put("/:id",groupMiddleware.validate_data,groupController.group_edit_post);
// Delete  Group
router.delete("/:id",groupController.group_delete);
//USER Send Request to Join Group
router.get("/request/:id",groupMiddleware.checkStatus,groupController.new_request);
//Display All New Request 
router.get("/request/:id/Requests",groupMiddleware.isAdmin,groupController.show_all_request);
// Accept USER Joining Request
router.get("/:group_id/accept/:user_id",groupMiddleware.isAdmin,groupController.accpet_request);


module.exports = router;