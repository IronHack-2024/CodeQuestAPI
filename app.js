const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const { getRandomQuestion } = require('./services/question.services');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const nodemailer = require('nodemailer');
const { getEmailTemplate } = require('./emailtemplate.js');
const cron = require('node-cron');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.use('/', indexRouter);

app.get('/daily-question', async (req, res) => {

	// Obtener la pregunta correspondiente al día
	const question = await getRandomQuestion();

	// Renderizar la página con la pregunta y las opciones
	res.render('home', { question });

})

//subscribe route to add contact to audience/ 58371aa183 is the listId from Chimp 
app.post('/subscribe', async (req, res) => {
  const email = req.body.email;

  try {
    const response = await mailchimp.lists.addListMember('58371aa183', {
      email_address: email,
      status: 'subscribed',
    });
    console.log(`Successfully added contact for the weekly question. ID: ${response.id}`);
    res.send('Successfully added to our contact list. Thank you for subscribing for a weekly dev question');
  } catch (error) {
    console.error(error);
    res.send('There was an error at subsciption. Please, try again later.');
  }
});// añade contacto al audience list y mailchimp comprueba si contacto ya existe. 

const MAILCHIMPKEY = process.env.MAILCHIMPKEY;

mailchimp.setConfig({
	apiKey: MAILCHIMPKEY, // API key in dotenv
	server: 'us22', // Prefijo del servidor del API key, final
  });
  //const listId = '58371aa183'; // ID de la lista de contactos de Mailchimp-Pero con el codigo no necesitamos. Solo hay una lista.


// Function to Fetch Audience Contacts from Mailchimp
async function fetchContacts(listId) {
  try {
    const response = await mailchimp.lists.getListMembersInfo(listId, {
      count: 100, // Fetch up to 100 contacts
    });
    console.log("Contacts:", response.members.map(member => member.email_address));
    return response.members.map(member => member.email_address); // Return email addresses
  } catch (error) {
    console.error("Error fetching contacts:", error.response ? error.response.body : error.message);
    return []; // Return an empty array if there's an error
  }
}


// Fetch Audiences
async function fetchAudiences() {
  try {
    const response = await mailchimp.lists.getAllLists();
    console.log("Audiences:", response.lists);
    return response.lists;
  } catch (error) {
    console.error("Error fetching audiences:", error.response ? error.response.body : error.message);
  }
}

(async () => {
  const audiences = await fetchAudiences(); // Fetch all audiences
  if (audiences.length > 0) {
    await fetchContacts(audiences[0].id); // Fetch contacts from the first audience, so no id needs to be entered
  } else {
    console.log("No audiences found.");
  }
})();

const APP_PASSWORD = process.env.APP_PASSWORD;
//para enviar de nuestro email proveedor
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: 'smtp.gmail.com', // Replace with your SMTP server
  port: 587,               // 587 for TLS
  secure: true,    
  auth: {
    user: 'codequestapi@gmail.com',
    pass: APP_PASSWORD,
  },
});

app.get('/sendEmails', async (req, res) => {
  try {
    await sendEmails();
    res.send("Emails have been successfully sent!");
  } catch (error) {
    console.error("Error in /sendEmails route:", error);
    res.status(500).send("Failed to send emails.");
  }
});

async function sendEmails() {
  try {
    // Fetch all audiences to get the first list ID
    const audiences = await fetchAudiences();
    if (!audiences.length) {
      console.log("No audiences found.");
      return;
    }

    const listId = audiences[0].id; // Use the first audience's ID
    const contacts = await fetchContacts(listId); // Pass the listId to fetchContacts

    if (!contacts.length) {
      console.log("No contacts found in the audience.");
      return;
    }

    // Loop through contacts and send personalized emails
    for (const email of contacts) {
      console.log(`Sending email to ${email}`);
      const name = email.split("@")[0]; // Use the part before '@' as a name
      const htmlTemplate = (getEmailTemplate(name));
      
      const mailOptions = {
        from: '"CodeQuestAPI"<codequestapi@gmail.com>',
        to: email,
        subject: "Welcome to Our Newsletter TEST!",
        html: htmlTemplate,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}
 
/*/ Schedule the task to run every Monday at 8 AM
cron.schedule('0  8* * 2', async () => {
  console.log('Runn0ing weekly email job...');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
});*/

console.log('Cron job started. Waiting for next execution...');

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server listening in port ${PORT}`)
})
