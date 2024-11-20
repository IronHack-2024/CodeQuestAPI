const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  codeExamples: {
    type: [String],
  },
  answerOptions: [
    {
      answer: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  urlSource: {
    type: String,
  },
});

const Questions = model("question", questionSchema);

module.exports = Questions;
