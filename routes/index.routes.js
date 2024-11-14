const express = require("express");

const router = express.Router();
const indexControllers = require("../controllers/index.controllers");

router.get("/", indexControllers.geteLandingPage);
router.get("/daily-question", indexControllers.getDailyQuestion);
router.get("/template-form", indexControllers.getFormTemplate);
router.get("/export-questions", indexControllers.getTemplateQuestions);
router.get("/submit-new-question", indexControllers.newQuestionForm);
router.post("/submit-new-question", indexControllers.createNewQuestion);

module.exports = router;
