const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/index.controllers");
const emailServices = require("../services/email.services")

router.get('/', indexControllers.getHome);
router.get('/about-us', indexControllers.getAboutUs);
router.get('/docs', indexControllers.getDocs)
router.get('/template-form', indexControllers.getFormTemplate);
router.get('/daily-question', indexControllers.getDailyQuestion)
router.get('/export-questions', indexControllers.getTemplateQuestions);
router.get('/submit-new-question', indexControllers.newQuestionForm);
router.post('/submit-new-question', indexControllers.createNewQuestion);
router.post('/subscribe', emailServices.postSubscribe);
router.get('/sendEmails', emailServices.getSendEmails);

module.exports = router;
