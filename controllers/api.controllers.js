const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { generateQuestions, getRandomQuestionsDB } = require('../services/question.services');
const jsonFile = require("../config/test.js")


/**
 * Get random questions from the service.
 *
 * This function retrieves a specified number of random questions from the question service.
 * It validates the 'amount' query parameter, ensuring it is a valid number between 1 and 30.
 * If 'amount' is not provided or is invalid, a default value of 10 is used. The maximum number
 * of questions that can be requested is capped at 30 to prevent overloading the service.
 *
 * @async
 * @function getRandomQuestions
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.amount - The number of questions requested. This parameter is optional.
 * @param {Object} res - Express response object used to send back the response.
 * @returns {Promise<void>} Sends a JSON response with the requested random questions or an error message.
 *
 * @throws {Error} If an unexpected error occurs, a 500 status code is returned with the error message.
 */
const getRandomQuestions = async (req, res) => {
  try {
    let { amount, categories } = req.query;
    amount = parseInt(amount, 10);

    //validation of amount
    if (isNaN(amount) || amount < 1) {
      amount = 10;
    } else if (amount > 30) {
      amount = 30;
    }

    //const randomQuestion = await getRandomQuestionsDB(amount, {categories : categories});
    const randomQuestion = categories
      ? await getRandomQuestionsDB(amount, { categories: categories })
      : await getRandomQuestionsDB(amount);

    res.status(200).json({
      message: "Random questions delivered successfully",
      results: randomQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching random questions",
    });
  }
};

// Controller function to handle requests for generating AI-based questions
const getAiQuestions = async (req, res) => {
  // Get the topic from the query parameters, or set a default value
  const topic = req.query.topic || "Frontend and Backend programming";
  // Parse the "amount" query parameter, setting a default of 1 and ensuring it's between 1 and 10
  const amount = Math.min(Math.max(parseInt(req.query.amount) || 1, 1), 10);
  try {
    // Call the generateQuestions service to create the specified number of questions based on the topic
    const questions = await generateQuestions(topic, amount);
    // Send a successful response with a message and the generated questions
    return res.status(200).json({
      message: "Random questions delivered successfully.",
      results: questions,
    });
  } catch (error) {
    // Log error details to the console for debugging
    console.error(
      "Error generating the questions:",
      /*  error.response ? error.response.data : */ error.message
    );
    // Send a 400 error response with a custom error message if generation fails
    return res.status(400).json({
      message:
        error.message || "An error occurred while generating the questions.",
    });
  }
};

const getTestSwaggerOption = async(req, res) => {
	res.json(jsonFile)
};

module.exports = {
	getRandomQuestions,
	getAiQuestions,
	getTestSwaggerOption
};
