const { connectDB, disconnectDB }  = require("../utils/db");
const { getRandomQuestionsDB } = require("../services/question.services");
const dotenv = require("dotenv");
dotenv.config();

describe('Testing about "/api/v1/questions/random" endpoint', () => {
	it('Should connect to the API endpoint for a random question and return a 200 status', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random')
		expect(response.status).toBe(200)
	})
	it('Should return 10 questions when performing a GET request to the API endpoint', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random');
		const data = await response.json();
		const numberOfResults = 10;
		expect(data.results).toHaveLength(numberOfResults);
	});
	it('Should return 30 questions when performing a GET request to the API endpoint and the amount query is 34', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random?amount=34');
		const data = await response.json();
		const numberOfResults = 30;
		expect(data.results).toHaveLength(numberOfResults);
	});
	it('Should return an object response with the same structure that question model', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random');
		const data = await response.json();
		const mockQuestionModel = {
			question: expect.any(String),
			codeExamples: expect.arrayContaining([]),
			answerOptions: expect.arrayContaining([ 
				expect.objectContaining({
					answer: expect.any(String), 
					isCorrect: expect.any(Boolean) 
				})
			]),
			status: expect.stringMatching(/^(approved|pending)$/),
			explanation: expect.any(String),
	/* 		urlSource: expect.any(String) */
		};
		if (data.results[0].codeExamples) {
            expect(Array.isArray(data.results[0].codeExamples)).toBe(true); // Ensure codeExamples is an array
        }

        if (data.results[0].status) {
            expect(['approved', 'pending']).toContain(data.results[0].status); // Ensure status is one of the expected values
        }
/*         if (data.results[0].urlSource) {
            expect(typeof data.results[0].urlSource).toBe('string'); // Ensure urlSource is a string
        } */

		expect(data.results[0]).toMatchObject(mockQuestionModel);
	})
})

describe('Testing getRandomQuestionsDB service', () => {
	beforeAll(async () => {
		await connectDB(); // Conecta a la base de datos antes de todos los tests
	});

	afterAll(async () => {
		await disconnectDB(); // Desconecta la base de datos después de todos los tests
	});

	it('Should return 1 when the parameter is 1', async () => {
		const result = await getRandomQuestionsDB(1);
		expect(result).toHaveLength(1);
	});

	it('Should return 20 when the parameter is 20, and codeExamples should be defined in each question from DB', async () => {
		const result = await getRandomQuestionsDB(20);
		expect(result).toHaveLength(20);
		expect(result[0].codeExamples).toBeDefined();
	});

	it('Should return an exception when the parameter is "patata"', async () => {
		await expect(getRandomQuestionsDB("patata")).rejects.toThrow("Amount must be a positive number.");
	});

	it('Should return a question that does not include codeExamples when fetching from "daily-question" endpoint"', async () => {
		const result = await getRandomQuestionsDB(1, {codeExamples:[]})
		expect(result[0].codeExamples).toHaveLength(0)
	});

})

