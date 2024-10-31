const { Schema, model } = require('mongoose');

const questionSchema = new Schema({

	question: {
		type: String,
		required: true
	},
	codeExamples: {
		type: [String]
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

	urlSource: {
		type: String

	}

});

const Questions = model('question', questionSchema);

module.exports = Questions;