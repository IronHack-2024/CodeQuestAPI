const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const { getRandomQuestion } = require("./services/question.services");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const { getEmailTemplate} = require("./emailtemplate.js");
const cron = require("node-cron");
const Questions = require("./models/question.model.js");



//subscribe route to add contact to audience/ 58371aa183 is the listId from Chimp
const listId = "58371aa183";
app.post("/subscribe", async (req, res) => {
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
}); // añade contacto al audience list y mailchimp comprueba si contacto ya existe.

const MAILCHIMPKEY = process.env.MAILCHIMPKEY;

mailchimp.setConfig({
  apiKey: MAILCHIMPKEY, // API key in dotenv
  server: "us22", // Prefix of of API Server, found in Key end
});

// Function to Fetch Audience Contacts from Mailchimp

const fetchSubscribedContacts = async function fetchSubscribedContacts(listId) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      status: "subscribed",
      count: 100, // limit Fetch up to 100 contacts
    });
    console.log("Contacts with subscribed status:", response.members.map(member => member.email_address));
    return response.members.map((member) => member.email_address); // Return email addresses
  } catch (error) {
    console.error(
      "Error fetching subscribed contacts:",
      error.response ? error.response.body : error.message
    );
    return []; // Return an empty array if there's an error
  }
}

const APP_PASSWORD = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, 
  secure: true,
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

//sendEmails();

async function sendEmails() {
  const questionRandom = await getRandomQuestion(1);

  try {

    const subscribedContacts = await fetchSubscribedContacts(listId); // Pass the listId to fetchContacts

    if (!subscribedContacts.length) {
      console.log("No contacts found in the audience.");
      return;
    }
    // Loop through contacts and send personalized emails
    for (const email of subscribedContacts) {
      console.log(`Sending email to ${email}`);
      const name = email.split("@")[0]; // Use the part before '@' as a name
      const htmlTemplate = getEmailTemplate(name, questionRandom);
      //console.log(htmlTemplate);

      mailOptions.to = email;
      mailOptions.html = htmlTemplate;

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}
//sending Emails with cron on scheduled time when opening endpoint

app.get("/sendEmails", async (req, res) => {
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
});

console.log("Cron job started. It will run every Wednesday at 8 AM.");

module.exports = {
	
}