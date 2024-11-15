const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const {
  getRandomQuestionsDB,
  insertQuestion,
} = require("../services/question.services");
const { shuffleArray } = require("../utils/utils");

const validateCheckboxNewQuestion = (obj) => {
  //Function receives information from req.body and validate checkbox status
  //1) Validate exists at least one correct answer
  const hasCorrectAnswer = Object.values(obj).some((element) => {
    //If some checkbox (boolean data) is true we validate correctly the answer
    return element == "true" && element;
  });
  console.log(hasCorrectAnswer);
  return hasCorrectAnswer;
};
const getFormTemplate = async (req, res) => {
  res.render("template-form", {});
};

const getTemplateQuestions = async (req, res) => {
  const { numberQuestions } = req.query;

  if (isNaN(numberQuestions) || numberQuestions <= 0) {
    return res.status(400).render("download-error", {
      message:
        "Invalid number of questions requested. Please provide a positive integer in the format: /export-questions?numberQuestions=[number].",
    });
  }

  const templateType = req.query.templateType;

  let row = templateType == "excel" ? 9 : 3;
  console.log("🚀 ~ getTemplateQuestions ~ row:", row);

  //lee el template
  const originalFilePath =
    templateType == "excel"
      ? "./resources/kahoot-template.xlsx"
      : "./resources/blooket-template.xlsx";
  const workbook = xlsx.readFile(originalFilePath);

  // creamos el nuevo documento

  const worksheet = workbook.Sheets["Sheet1"];
  const newWorkbook = xlsx.utils.book_new();

  // Agregar la copia de la hoja al nuevo archivo
  xlsx.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");

  const randomQuestions = await getRandomQuestionsDB(Number(numberQuestions), {
    codeExamples: [],
  });
  console.log(
    "🚀 ~ getTemplateQuestions ~ randomQuestions:",
    randomQuestions.length
  );

  for (let i = 0; i < randomQuestions.length; i++) {
    const randomQuestion = randomQuestions[i];

    const correctIndex = randomQuestion.answerOptions.findIndex(
      (option) => option.isCorrect
    );
    const correctAnswerNumber = correctIndex + 1;

    newWorkbook.Sheets["Sheet1"][`B${row}`] = {
      v: randomQuestion.question,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`C${row}`] = {
      v: randomQuestion.answerOptions[0].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`D${row}`] = {
      v: randomQuestion.answerOptions[1].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`E${row}`] = {
      v: randomQuestion.answerOptions[2].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`F${row}`] = {
      v: randomQuestion.answerOptions[3].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`G${row}`] = { v: 30, t: "n" };
    newWorkbook.Sheets["Sheet1"][`H${row}`] = {
      v: correctAnswerNumber,
      t: "s",
    };

    row += 1;
  }

  const newFilePath =
    templateType == "excel"
      ? "./resources/temporary_excel.xlsx"
      : "./resources/temporary_csv.csv";

  if (templateType == "excel") {
    xlsx.writeFile(newWorkbook, newFilePath);

    console.log(`Archivo xlsx guardado correctamente en ${newFilePath}`);
  } else {
    xlsx.writeFile(newWorkbook, newFilePath, { bookType: "csv" });

    console.log(`Archivo CSV guardado correctamente en ${newFilePath}`);
  }

  const nameFile =
    templateType == "excel"
      ? `${numberQuestions}_questions_for_kahoot.xlsx`
      : `${numberQuestions}_questions_for_blooket.csv`;

  res.download(newFilePath, nameFile, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(500).send("Error al descargar el archivo");
    } else {
      fs.unlinkSync(newFilePath);
    }
  });
};

const getDailyQuestion = async (req, res) => {
  // Obtener la pregunta correspondiente al día
  const questions = await getRandomQuestionsDB(1, { codeExamples: [] });
  const questionsWithShuffledAnswers = questions.map((question) => {
    return {
      ...question,
      answerOptions: shuffleArray(question.answerOptions),
    };
  });
  // Renderizar la página con la pregunta y las opciones
  res.render("home", { questionsWithShuffledAnswers });
};

const newQuestionForm = (req, res) => {
  let message = "";
  res.render("new-question", { message });
};

const createNewQuestion = async (req, res) => {
  try {
    const {
      question,
      answer1Text,
      answer1CheckBox,
      answer2CheckBox,
      answer2Text,
      answer3CheckBox,
      answer3Text,
      answer4CheckBox,
      answer4Text,
    } = req.body;
    //If validation of checkbox is passed
    console.log("esto es la validacion", validateCheckboxNewQuestion(req.body));
    if (validateCheckboxNewQuestion(req.body)) {
      const newQuestion = {
        question: question,
        answerOptions: [
          {
            answer: answer1Text,
            isCorrect: answer1CheckBox ? true : false,
          },
          {
            answer: answer2Text,
            isCorrect: answer2CheckBox ? true : false,
          },
          {
            answer: answer3Text,
            isCorrect: answer3CheckBox ? true : false,
          },
          {
            answer: answer4Text,
            isCorrect: answer4CheckBox ? true : false,
          },
        ],
        status: "pending",
      };

      await insertQuestion(newQuestion);
      console.log(newQuestion);
      let message =
        "Thank you for submitting a new question. Our team will revise it and, if correct, include it in our database.";
      res.status(201).render("new-question.ejs", { message });
    } else {
      let message =
        "We cannot save your question. You must mark at least one correct answer.";
      res.status(200).render("new-question.ejs", { message }); //Check status with Oscar
    }

    // let message = 'We cannot save your question. You must mark at least one correct answer.'
    // res.status(200).render('new-question.ejs', {message}); //Check status with Oscar

    // res.redirect('/submit-new-question');
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: "An error has ocurred while saving the question." });
  }
};

module.exports = {
  newQuestionForm,
  createNewQuestion,
  getTemplateQuestions,
  getFormTemplate,
  getDailyQuestion,
};
