
jest.mock('../models/question.model.js');


const { getRandomQuestion } = require('../services/question.services.js');

describe('getRandomQuestions service', () => {

	it('Devuelve una pregunta aleatoria', async () => {

		const result = await getRandomQuestion(1);

		expect(result).toHaveLength(1);
		const answerOptions = result[0].answerOptions;

		// Verifica si al menos una opción de respuesta tiene `isCorrect` en `true`
		const hasCorrectAnswer = answerOptions.some(option => option.isCorrect === true);

		expect(hasCorrectAnswer).toBe(true);

	});
});
