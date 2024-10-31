const Questions = require('../models/question.model');

const getRandomQuestion = async (amount) => {

	const questions = await Questions.aggregate([
		{ $sample: { size: amount } }
	]);
	return questions;
};


const postQuestion = async (question) => {
	// TODO
}

const getRandomQuestionsFromIA = (amount, topic) => {
	// TODO
}


module.exports = {
	getRandomQuestion
}