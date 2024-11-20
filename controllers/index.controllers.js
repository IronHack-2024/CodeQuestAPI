const mailchimp = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const questionService = require("../services/question.services");
const { getEmailTemplate } = require("../emailtemplate");
const { shuffleArray } = require("../utils/utils");
require("dotenv").config();

// Настройка Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMPKEY,
  server: "us22",
});

const listId = "58371aa183"; // Замените на ваш актуальный List ID

// Рендеринг главной страницы
const renderHomePage = (req, res) => {
  res.render("home"); // Предполагается, что у вас есть шаблон 'home.ejs'
};

// GET запрос для страницы подписки
const getSubscription = (req, res) => {
  res.render("subscribe"); // Ваш существующий шаблон 'subscribe.ejs'
};

// POST запрос для подписки
const postSubscription = async (req, res) => {
  const email = req.body.email;

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });
    console.log(`Successfully added contact: ${response.id}`);
    res.send(
      "Successfully added to our contact list. Thank you for subscribing for a weekly dev question"
    );
  } catch (error) {
    console.error(error);
    res.send("There was an error at subscription. Please, try again later.");
  }
};

// Получение ежедневного вопроса
const getDailyQuestion = async (req, res) => {
  try {
    const questions = await questionService.getRandomQuestion(1);
    const question = questions[0]; // Получаем первый вопрос из массива
    res.render("home", { question });
  } catch (error) {
    res.status(500).send("Error fetching daily question");
  }
};

// Получение случайных вопросов
const getRandomQuestions = async (req, res) => {
  try {
    let { amount } = req.query;
    amount = parseInt(amount, 10);

    if (isNaN(amount) || amount < 1) {
      amount = 10;
    } else if (amount > 30) {
      amount = 30;
    }

    const randomQuestions = await questionService.getRandomQuestion(amount);

    res.status(200).json({
      message: "Random questions delivered successfully",
      results: randomQuestions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching random questions",
    });
  }
};

// Получение подписанных контактов
const getSubscribedContacts = async () => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      status: "subscribed",
      count: 100,
    });
    console.log(
      "Contacts with subscribed status:",
      response.members.map((member) => member.email_address)
    );
    return response.members.map((member) => member.email_address);
  } catch (error) {
    console.error(
      "Error fetching subscribed contacts:",
      error.response ? error.response.body : error.message
    );
    return [];
  }
};

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "codequestapi@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

// Функция для отправки писем
const sendEmails = async () => {
  const questionRandom = await questionService.getRandomQuestion(1);

  try {
    const contacts = await getSubscribedContacts();

    if (!contacts.length) {
      console.log("No contacts found in the audience.");
      return;
    }

    for (const email of contacts) {
      console.log(`Sending email to ${email}`);
      const name = email.split("@")[0];
      const htmlTemplate = getEmailTemplate(name, questionRandom);

      const mailOptions = {
        from: '"CodeQuestAPI"<codequestapi@gmail.com>',
        to: email,
        subject: "Welcome to Our Weekly Code Quest!",
        html: htmlTemplate,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

// Планирование отправки писем
const weeklyCrono = (req, res) => {
  console.log("Cron job started. It will run every Wednesday at 8 AM.");
  try {
    cron.schedule("0 8 * * 3", async () => {
      console.log("Running scheduled weekly email job...");
      await sendEmails();
    });
    res.send("Cron job scheduled successfully.");
  } catch (error) {
    console.error("Error in /sendEmails route:", error);
    res.status(500).send("Failed to schedule cron job.");
  }
};

module.exports = {
  renderHomePage,
  getSubscription,
  postSubscription,
  getDailyQuestion,
  getRandomQuestions,
  weeklyCrono,
};
