describe('Testing the "/api/v1/questions/ai" endpoint', () => {
  it('Should connect to the API endpoint and return a 200 status', async () => {
    const response = await fetch('http://localhost:3000/api/v1/questions/ai')
    expect(response.status).toBe(200)
  });
  it('Should return 10 AI generated questions when performing a GET request to the API endpoint and the amount query is more than 10', async () => {
    const response = await fetch('http://localhost:3000/api/v1/questions/ai/?amount=12');
    const data = await response.json();
    expect(data.results).toHaveLength(10);
  }, 30000);
  it('Should retrun 1 AI generated question if the amount given is a negative number', async () => {
    const response = await fetch('http://localhost:3000/api/v1/questions/ai/?amount=-2');
    const data = await response.json();
    expect(data.results).toHaveLength(1);
  });
  it('Should return a question with the specified topic "HTML"', async () => {
    const response = await fetch('http://localhost:3000/api/v1/questions/ai/?topic=HTML');
    const data = await response.json();
    expect(data.results[0].question).toMatch(/HTML/i)
  });
  it('Should return an error if topic is longer than 140 characters', async () => {
    const longTopic = 'A'.repeat(145); // Generates a string with 145 'A' - Exceeds the max limit
    const response = await fetch(`http://localhost:3000/api/v1/questions/ai?topic=${longTopic}`);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toMatch(/not exceed 140 characters/i);
  });
  it('Should return an error if topic is shorter than 2 characters', async () => {
    const response = await fetch(`http://localhost:3000/api/v1/questions/ai?topic=H`);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toMatch(/Topic must be at least 2 characters/i);
  });
  it('Should return a 200 status if topic is exactly 140 characters long', async () => {
    const longTopic = 'A'.repeat(140);
    const response = await fetch(`http://localhost:3000/api/v1/questions/ai?topic=${longTopic}`);
    expect(response.status).toBe(200);
  });
})
