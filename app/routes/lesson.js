
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Course      = require("../../models/course");
var Lesson      = require("../../models/lesson");

//var User       = require("../models/user");
var lessonController = require("../controllers/LessonController");
var lessonMiddleware = require("../../middleware/LessonMiddleware");
//var middleware = require("../middleware");

router.get("/:lesson_id/show",lessonController.show);
router.get("/lessons",lessonController.showbycourseid);

router.get("/lesson/new",lessonController.new_lesson);


router.post("/lesson",lessonController.upload_files,lessonMiddleware.validate_data,lessonController.new_lesson_lesson);


router.get("/:id/lesson/edit",lessonController.lesson_edit);


router.put("/:id",lessonController.upload_files,lessonMiddleware.validate_data,lessonController.lesson_edit_put);

router.delete("/:id",lessonController.lesson_delete);
     



 module.exports = router;