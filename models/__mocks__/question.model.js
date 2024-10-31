const Questions = {
    aggregate: jest.fn(async () => [
        {
            "_id": {
                "$oid": "67213a010da50ae0541d0704"
            },
            "question": "What is the default port number for HTTP?",
            "answerOptions": [
                {
                    "answer": "80",
                    "isCorrect": true
                },
                {
                    "answer": "443",
                    "isCorrect": false
                },
                {
                    "answer": "21",
                    "isCorrect": false
                },
                {
                    "answer": "25",
                    "isCorrect": false
                }
            ],
            "urlSource": "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol"
        },
    ]),
};

module.exports = Questions;
