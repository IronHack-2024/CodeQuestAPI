const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/index.controllers");

router.get('/', indexControllers.getHome);
router.get('/about-us', indexControllers.getAboutUs);
router.get('/docs', indexControllers.getDocs)
router.get('/template-form', indexControllers.getFormTemplate);
router.get('/daily-question', indexControllers.getDailyQuestion)
router.get('/export-questions', indexControllers.getTemplateQuestions);
router.get('/submit-new-question', indexControllers.newQuestionForm);
router.post('/submit-new-question', indexControllers.createNewQuestion);
router.get('/subscribed-contacts', indexControllers.getSubscribedContacts);
router.get('/subscribe', indexControllers.getSubscription);
router.post('/subscribe', indexControllers.postSubscription);


module.exports = router;
