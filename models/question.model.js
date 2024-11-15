const { Schema, model } = require('mongoose');
const { QUESTIONS_CATEGORIES } = require('../utils/constants');

const questionSchema = new Schema({
	categories: {
		type: [String],
		enum: QUESTIONS_CATEGORIES,
		default: ['other']
	},
	question: {
		type: String,
		required: true
	},
	codeExamples: {
		type: [String],
		default:[]
	},
	answerOptions: [
		{
			answer: {
				type: String,
				required: true // Texto de la opción de respuesta 
			},
			isCorrect: {
				type: Boolean,
				required: true // Indicación de si esta opción de respuesta es correcta 
			}
		},
	],
	explanation: {
		type: String,
		maxlength: 4000
	},
	urlSource: {
		type: String
	},
});

const Questions = model('question', questionSchema);

module.exports = Questions