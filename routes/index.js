const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/index.controllers");

router.get("/", indexControllers.renderHomePage);
router.get("/subscribe", indexControllers.getSubscription);
router.post("/subscribe", indexControllers.postSubscription);
router.get("/daily-question", indexControllers.getDailyQuestion);
router.get("/sendEmails", indexControllers.weeklyCrono);
router.get("/api/v1/questions/random", indexControllers.getRandomQuestions);

module.exports = router;
