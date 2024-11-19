const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const { getRandomQuestion } = require("./services/question.services");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const { getEmailTemplate} = require("./emailtemplate.js");
const cron = require("node-cron");
const Questions = require("./models/question.model.js");

dotenv.config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);

app.get("/daily-question", async (req, res) => {
  // Obtener la pregunta correspondiente al día
  const question = await getRandomQuestion();

  // Renderizar la página con la pregunta y las opciones
  res.render("home", { question });
});


const MAILCHIMPKEY = process.env.MAILCHIMPKEY;
mailchimp.setConfig({
  apiKey: MAILCHIMPKEY, // API key in dotenv
  server: "us22", // Prefix of of API Server, found in Key end
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
});
