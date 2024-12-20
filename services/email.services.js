// Import necessary modules for Mailchimp, Nodemailer, and cron scheduling
const dotenv = require('dotenv');
const { getRandomQuestionsDB } = require("./question.services");
const { getEmailTemplate } = require("../utils/email.template")
const mailchimp = require('@mailchimp/mailchimp_marketing');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

// Configure Mailchimp API client using API key and server prefix
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMPKEY, // API key from .env
    server: "us22", // Mailchimp server prefix
  });

const listId = process.env.LIST_ID; // Mailchimp audience list ID

// Subscribe route to add a contact to Mailchimp list
const postSubscribe = async (req, res) => {
      // Placeholder email for testing 
  const email = req.body.email

  try {
    // Add new subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed", // New subscribers will be marked as "subscribed"
    });
    console.log(`Successfully added contact for the weekly question. ID: ${response.id}`);
    /* res.send("Successfully added to our contact list. Thank you for subscribing for a weekly dev question");  => CONSIDER USING FLASH TO RENDER A MESSAGE TO THE USER */ 
    return res.redirect('/');
  } catch (error) {
    console.error(error); // Log any errors during subscription
    /* res.send("There was an error at subscription. Please, try again later."); => CONSIDER USING FLASH TO RENDER A MESSAGE TO THE USER */
    return res.redirect('/');
  }
};

// Function to fetch subscribed contacts from Mailchimp
async function fetchSubscribedContacts(listId) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      status: "subscribed", // Filter for subscribed contacts only
      count: 100, // Limit to 100 contacts
    });
    return response.members.map((member) => member.email_address); // Return email addresses
  } catch (error) {
    console.error("Error fetching subscribed contacts:", error.response ? error.response.body : error.message);
    return []; // Return an empty array if an error occurs
  }
}

// Setup Nodemailer for sending emails via Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // Use TLS
  auth: {
    user: "codequestapi@gmail.com", // Gmail account for sending emails
    pass: process.env.APP_PASSWORD, // App-specific password from .env
  },
});

// Placeholder email options for sending emails
let mailOptions = {
  from: '"CodeQuestAPI"<codequestapi@gmail.com>',
  to: "", // Will be updated dynamically with recipient email
  subject: "Welcome to Our Weekly Code Quest!", // Email subject
  html: "", // Email body (HTML content)
};


// Function to send emails to subscribed contacts
async function sendEmails() {
    const questionRandom = await getRandomQuestionsDB(1); // Get a random question for the weekly dev question
    try {
      const subscribedContacts = await fetchSubscribedContacts(listId); // Get list of subscribed contacts
      if (!subscribedContacts.length) {
        return;
      }
      // Loop through contacts and send personalized emails
      for (const email of subscribedContacts) {
        const name = email.split("@")[0]; // Extract the username part of the email address
        const htmlTemplate = getEmailTemplate(name, questionRandom); // Get personalized HTML email template
        mailOptions.to = email; // Update recipient email
        mailOptions.html = htmlTemplate; // Set email body
        const info = await transporter.sendMail(mailOptions); // Send the email
        console.log("Email sent");
      }
    } catch (error) {
      console.error("Error sending emails:", error); // Log any errors during email sending
    }
  }


module.exports = {
    postSubscribe,
    sendEmails
  };
  
