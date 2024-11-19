const express = require('express');
const questions = require('../models/question.model');
const { rateLimit } = require("express-rate-limit");
const router = express.Router();
const apiControllers = require("../controllers/api.controllers");

// this limits the amount of requests to the "/api/v1/questions/ai" endpoint to 15 requests per minute

const customLimiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  limit: 15,
  handler: (req, res) => {
    res.status(429).json({
      error: "You have exceeded the request limit for this endpoint.",
    });
  },
});

router.get("/v1/questions/random", apiControllers.getRandomQuestions);

router.get("/v1/questions/ai", customLimiter, apiControllers.getAiQuestions);

router.get('/v1/test-swagger', apiControllers.getTestSwaggerOption);

module.exports = router;
