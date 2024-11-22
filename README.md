# 🧠 **CodeQuest API**

## ✨ **Project Overview**

The **CodeQuest API** is a web service that offers a variety of programming questions for anyone looking to improve their coding skills, from beginners learning programming to experienced developers seeking new challenges. 

## 🌟 **Key Features**

### **🤖 AI-Powered Question Generation**
- Uses Google’s Generative AI (Gemini 1.5 Flash).
- Dynamic question creation based on specified topics.
- Supports multiple programming categories and topics.
- Returns up to 10 programming questions.

### **🎲 Question Generation**
- Random question retrieval with customizable parameters.
- Multiple programming categories.
- Random daily programming question.

### **📥 Question Management**
- Users can contribute by submitting new questions.
- Pending review system for AI-generated and user-submitted questions.
- Export questions to popular quiz platforms such as Kahoot or Blooket.

### **🔒 Security & Performance**
- Ensures a secure and fast experience for all users.

## 🛠️ **Technical Architecture**

### **Backend**
- **Framework:** Express.js
- **Language:** Node.js
- **Database:** MongoDB with Mongoose
- **AI Integration:** Google Generative AI

### **Question Model**
````
const questionSchema = new Schema({
  categories: {
    type: [String],
    enum: QUESTIONS_CATEGORIES,
    default: ["other"],
  },
  question: {
    type: String,
    required: true,
  },
  codeExamples: {
    type: [String],
    default: [],
  },
  answerOptions: [
    {
      answer: {
        type: String,
        required: true, // Texto de la opción de respuesta
      },
      isCorrect: {
        type: Boolean,
        required: true, // Indicación de si esta opción de respuesta es correcta
      },
    },
  ],
  explanation: {
    type: String,
    maxlength: 4000,
  },
  urlSource: {
    type: String,
  },
  status: {
    type: String,
    enum: ["approved", "pending"],
    default: "approved",
  },
});
````

## 🚀 **Quick Start**

### **Installation**

1. Clone repository `git clone https://github.com/IronHack-2024/CodeQuestAPI `

2. Install dependencies `npm install`

3. Set up environment variables `cp .env.example .env`

## 👥 **Code Contributors**

## 🤝 **Contributing**

1. For the repository.

2. Create a feature/bug branch.

3. Commit the changes with a very descriptive message.

4. Push changes and create a pull request.