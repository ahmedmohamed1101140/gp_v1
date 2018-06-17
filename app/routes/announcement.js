
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Course      = require("../../models/course");
var Announcement      = require("../../models/announcement");

//var User       = require("../models/user");
var announcementController = require("../controllers/AnnouncementController");
var announcementMiddleware = require("../../middleware/AnnouncementMiddleware");
var authorizationmiddleware = require("../../middleware/AuthorizationMiddleware");

//var middleware = require("../middleware");

router.get("/:announcement_id/show"
,authorizationmiddleware.isCourseMember
,announcementController.show);
router.get("/showall"
,authorizationmiddleware.isCourseMember
,announcementController.showbycourseid);

router.get("/new"
,authorizationmiddleware.isCoursecontoller
,announcementController.new_announcement);


router.post("/"
,authorizationmiddleware.isCoursecontoller
,announcementMiddleware.validate_data,
announcementController.new_announcement_announcement);


router.get("/:announcement_id/edit"
,authorizationmiddleware.isCoursecontoller
,announcementController.announcement_edit);


router.put("/:announcement_id"
,authorizationmiddleware.isCoursecontoller
,announcementMiddleware.validate_data,announcementController.announcement_edit_put);

router.delete("/:announcement_id"
,authorizationmiddleware.isCoursecontoller
,announcementController.announcement_delete);
     



 module.exports = router;