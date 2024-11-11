const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/template-form', indexControllers.getFormTemplate)

router.get('/export-questions', indexControllers.getTemplateQuestions);

router.get('/daily-question', indexControllers.getDailyQuestion)



module.exports = router;

