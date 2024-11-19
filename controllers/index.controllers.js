// const express = require("express");
const connectDB = require("../config/db");
const dotenv = require("dotenv");
const indexRouter = require("../routes/index");
const { getRandomQuestion } = require("../services/question.services");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const { getEmailTemplate} = require("../emailtemplate.js");
const cron = require("node-cron");
const Questions = require("../models/question.model.js");
const questionService = require('../services/question.services')
require('dotenv').config();
const getRandomQuestions = async (req, res) => {
	try {
		let { amount } = req.query;
		amount = parseInt(amount, 10);

		//validation of amount
		if (isNaN(amount) || amount < 1) {
			amount = 10;
		} else if (amount > 30) {
			amount = 30;
		}

		const randomQuestion = await questionService.getRandomQuestion(amount);

		res.status(200).json({
			message: "Random questions delivered successfully",
			results: randomQuestion
		});

	} catch (error) {
		res.status(500).json({
			message: "Error fetching random questions",


		})
	}

}

const listId = "58371aa183";

const getSubscription = (req, res) => {
	res.render('subscribe');
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


// añade contacto al audience list y mailchimp comprueba si contacto ya existe.
// Function to Fetch Audience Contacts from Mailchimp

const getSubscribedContacts = async (req,res) => {
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

 

async function sendEmails() {
  const questionRandom = await getRandomQuestion(1);

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
}
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



module.exports = { 
	getRandomQuestions,
	postSubscription,
	getSubscription,
	getSubscribedContacts
 };
