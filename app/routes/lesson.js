
var express    = require("express");
var router     = express.Router({mergeParams: true});
var Course      = require("../../models/course");
var Lesson      = require("../../models/lesson");
var authorizationmiddleware = require("../../middleware/AuthorizationMiddleware");


//var User       = require("../models/user");
var lessonController = require("../controllers/LessonController");
var lessonMiddleware = require("../../middleware/LessonMiddleware");
//var middleware = require("../middleware");

router.get("/:lesson_id/show"
,authorizationmiddleware.isCourseMember
,lessonController.show);
router.get("/lessons"
,authorizationmiddleware.isCourseMember
,lessonController.showbycourseid);

router.get("/lesson/new"
,authorizationmiddleware.isCoursecontoller
,lessonController.new_lesson);


router.post("/lesson/:name"
,authorizationmiddleware.isCoursecontoller
,lessonController.upload_files,lessonMiddleware.validate_data,lessonController.new_lesson_lesson);


router.get("/:id/lesson/edit"
,authorizationmiddleware.isCoursecontoller
,lessonController.lesson_edit);


router.put("/:id"
,authorizationmiddleware.isCoursecontoller
,lessonController.upload_files,lessonMiddleware.validate_data,lessonController.lesson_edit_put);

router.delete("/:id"
,authorizationmiddleware.isCoursecontoller
,lessonController.lesson_delete);
     



 module.exports = router;