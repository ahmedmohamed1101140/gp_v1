
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Course      = require("../../models/course");
var Announcement      = require("../../models/announcement");

//var User       = require("../models/user");
var announcementController = require("../controllers/AnnouncementController");
var announcementMiddleware = require("../../middleware/AnnouncementMiddleware");
//var middleware = require("../middleware");

router.get("/:announcement_id/show",announcementController.show);
router.get("/showall",announcementController.showbycourseid);

router.get("/new",announcementController.new_announcement);


router.post("/",announcementMiddleware.validate_data,announcementController.new_announcement_announcement);


router.get("/:announcement_id/edit",announcementController.announcement_edit);


router.put("/:announcement_id",announcementMiddleware.validate_data,announcementController.announcement_edit_put);

router.delete("/:announcement_id",announcementController.announcement_delete);
     



 module.exports = router;