const Questions = require("../models/question.model");

const getRandomQuestion = async (amount = 1) => {
  const questions = await Questions.aggregate([{ $sample: { size: amount } }]);
  return questions;
};

module.exports = {
  getRandomQuestion,
};
