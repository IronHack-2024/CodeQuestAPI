const { sendEmails } = require("../services/email.services")
const cron = require('node-cron'); // For scheduling emails

// Schedule emails to be sent at a regular time (e.g., every Wednesday at 8 AM)
const startEmailCronJob = () => {
    cron.schedule("0 8 * * 3", async () => { // Runs every Wednesday at 8 AM
      try {
        await sendEmails(); // Call the function to send emails
        console.log("Emails have been sent successfully.");
      } catch (error) {
        console.error("Error sending emails:", error); // Handle any errors in the email-sending process
      }
    });
  };

  module.exports = {
    startEmailCronJob
  };
  
