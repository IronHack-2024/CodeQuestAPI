// const express = require("express");
const dotenv = require("dotenv");
const indexRouter = require("../routes/index.routes");
//const { getRandoQuestion m} = require("../services/question.services");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const { getEmailTemplate} = require("../emailtemplate.js");
const cron = require("node-cron");
// const Questions = require("../models/question.model.js");
// const questionService = require('../services/question.services')
dotenv.config();

const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const {
  getRandomQuestionsDB,
  insertQuestion,
} = require("../services/question.services");
const { shuffleArray } = require("../utils/utils");

const getHome = async (req, res) => {
  res.render("home");
};

const getAboutUs = async (req, res) => {
  res.render("about-us");
};

const getDocs = async (req, res) => {
  res.render("docs");
};

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

const MAILCHIMPKEY = process.env.MAILCHIMPKEY;
mailchimp.setConfig({
  apiKey: MAILCHIMPKEY, // API key in dotenv
  server: "us22", // Prefix of of API Server, found in Key end
});

const listId = "58371aa183";

const APP_PASSWORD = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, 
  secure: false,
  auth: {
    user: "codequestapi@gmail.com",
    pass: APP_PASSWORD,
  },
});

let mailOptions = {
  from: '"CodeQuestAPI"<codequestapi@gmail.com>',
  to: "", // Placeholder, will be updated dynamically
  subject: "Welcome to Our Weekly Code Quest!",
  html: "", // Placeholder, will be updated dynamically
};

 

const sendEmails = async () => {
  const questionRandom = await getRandomQuestionsDB(1);

  try {

    const Contacts = await getSubscribedContacts(); // Pass the listId to fetchContacts

    if (!Contacts.length) {
      console.log("No contacts found in the audience.");
      return;
    }
    // Loop through contacts and send personalized emails
    for (const email of Contacts) {
      console.log(`Sending email to ${email}`);
      const name = email.split("@")[0]; // Use the part before '@' as a name
      const htmlTemplate = getEmailTemplate(name, questionRandom);
    //   console.log(htmlTemplate);

      mailOptions.to = email;
      mailOptions.html = htmlTemplate;

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};
//sending Emails with cron on scheduled time when opening endpoint
// ("/sendEmails")
const weeklyCrono = async (req, res) => {
	console.log("Cron job started. It will run every Wednesday at 8 AM.");
  try {
    cron.schedule("* 8 * * 3", async () => {
      console.log("Running scheduled weekly email job...");
      await sendEmails();
      res.send("Emails have been successfully sent!");
    });
  } catch (error) {
    console.error("Error in /sendEmails route:", error);
    res.status(500).send("Failed to send emails.");
  }
};

weeklyCrono();




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
  res.render("daily-question", { questionsWithShuffledAnswers });
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

const getSubscription = async (req, res) => {
	res.render("subscribe");
}

const postSubscription = async (req, res) => { 

  //subscribe route to add contact to audience/ 58371aa183 is the listId from Chimp
  
    const email = req.body.email;
  
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
      });
      console.log(
        `Successfully added contact for the weekly question. ID: ${response.id}`
      );
      res.send(
        "Successfully added to our contact list. Thank you for subscribing for a weekly dev question"
      );
    } catch (error) {
      console.error(error);
      res.send("There was an error at subsciption. Please, try again later.");
    }
    
  };

const getSubscribedContacts = async (req, res) => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      status: "subscribed",
      count: 100, // limit Fetch up to 100 contacts
    });
    console.log(
      "Contacts with subscribed status:", response.members.map(member => member.email_address));
    return response.members.map((member) => member.email_address); // Return email addresses
  } catch (error) {
    console.error(
      "Error fetching subscribed contacts:",
      error.response ? error.response.body : error.message
    );
    return []; // Return an empty array if there's an error
  }
};




module.exports = {
  getHome,
  getAboutUs,
  getDocs,
  newQuestionForm,
  createNewQuestion,
  getTemplateQuestions,
  getFormTemplate,
  getDailyQuestion,
  getRandomQuestionsDB,
  getSubscribedContacts,
  getSubscription,
	postSubscription
  
};

