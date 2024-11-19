const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/questions/random', indexControllers.getRandomQuestions);

router.get('/subscribe', indexControllers.getSubscription);
router.post('/subscribe', indexControllers.postSubscription);

router.get('/subscribedContacts', indexControllers.getSubscribedContacts);

module.exports = router;

