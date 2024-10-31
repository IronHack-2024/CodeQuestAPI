
describe('Testing about "/api/v1/question/random" endpoint', () => {
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
			answerOptions: expect.arrayContaining([ 
				expect.objectContaining({
					answer: expect.any(String), 
					isCorrect: expect.any(Boolean) 
				})
			]),
			urlSource: expect.any(String)
		};
		expect(data.results[0]).toMatchObject(mockQuestionModel);
		
	})
})


