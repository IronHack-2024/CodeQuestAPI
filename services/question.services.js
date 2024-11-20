const Questions = require("../models/question.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createPrompt } = require("../utils/aiPrompt");
const { QUESTIONS_CATEGORIES } = require("../utils/constants");

// Function to generate a multiple-choice question using the AI model
const getQuestionsFromAI = async (topic) => {
  // Create the prompt string based on the provided topic
  const prompt = createPrompt(topic);
  // Initialize the Google Generative AI model with the provided API key
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  // Specify the generative model to use
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    // Request content generation from the AI model using the created prompt
    const response = await model.generateContent(prompt);
    // Retrieve the generated text from the model's response
    const generatedText = response.response.text();
    // Find the positions of the first and last JSON brackets in the generated text
    const jsonStart = generatedText.indexOf("{");
    const jsonEnd = generatedText.lastIndexOf("}") + 1;
    // Parse and return the valid JSON portion of the generated text
    return JSON.parse(generatedText.slice(jsonStart, jsonEnd));
  } catch (error) {
    // Log any errors that occur during question generation for debugging
    console.error(
      "Error generating the question:",
      error.response ? error.response.data : error.message
    );
    // Rethrow the error for further handling upstream
    throw error;
  }
};

const insertQuestion = async (q) => {
  // q -> question to be introduced
  try {
    await Questions.create(q);
  } catch {
    throw new Error("We could not create the question.");
  }
};

// Function to generate a specified number of questions based on a given topic
const generateQuestions = async (topic, amount) => {
  // Validate the topic length to ensure it meets the requirements
  if (topic.length < 2 || topic.length > 140) {
    throw new Error(
      "Topic must be at least 2 characters and not exceed 140 characters."
    );
  }
  // Initialize an array to hold the generated questions
  const questions = [];
  // Loop to generate the specified amount of questions
  for (let i = 0; i < amount; i++) {
    // Call the getQuestionsFromAI function to generate a single question
    const quizData = await getQuestionsFromAI(topic);
    console.log("QuizData:", quizData);

    // Ensure correct answer is last
    quizData.answerOptions = moveCorrectAnswerToEnd(quizData.answerOptions);

    let { categories } = quizData;
    categories = QUESTIONS_CATEGORIES.includes(categories)
      ? categories
      : "other";
    // Add the generated question to the questions array with a status of "pending"
    questions.push({
      ...quizData,
      categories,
      status: "pending",
    });
  }
  // Insert the generated questions into the database
  await Questions.insertMany(questions);
  // Return the array of generated questions
  return questions;
};

// Helper function to move correct answer to end
function moveCorrectAnswerToEnd(answerOptions) {
  const incorrectOptions = answerOptions.filter((option) => !option.isCorrect);
  const correctOptions = answerOptions.filter((option) => option.isCorrect);

  return incorrectOptions.concat(correctOptions);
}

const getRandomQuestionsDB = async (amount, filter = {}) => {
  console.log("🚀 ~ getRandomQuestionsDB ~ amount:", amount, "filter:", filter);

  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    throw new Error("Amount must be a positive number.");
  }

  try {
    // Inicia con la condición de status y agrega cualquier otro filtro pasado como parámetro
    let matchCondition = { status: { $ne: "pending" }, ...filter };
    const questions = await Questions.aggregate([
      { $match: matchCondition },
      { $sample: { size: amount } },
    ]);

    return questions;
  } catch (error) {
    throw new Error("Error fetching random questions from the database.");
  }
};

module.exports = {
  getRandomQuestionsDB,
  getQuestionsFromAI,
  generateQuestions,
  insertQuestion,
};
