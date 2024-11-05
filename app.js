const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const { getRandomQuestion } = require('./services/question.services');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const MAILCHIMPKEY = process.env.MAILCHIMPKEY;

mailchimp.setConfig({
	apiKey: MAILCHIMPKEY, // API key in dotenv
	server: 'us22', // Prefijo del servidor del API key, final
  });
  const listId = '58371aa183'; // ID de tu lista de contactos de Mailchimp

  app.post('/subscribe', async (req, res) => {
    const email = req.body.email;
  
    try {
      const response = await mailchimp.lists.addListMember(listId, {
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

 


app.use('/', indexRouter);

app.get('/daily-question', async (req, res) => {

	// Obtener la pregunta correspondiente al día
	const question = await getRandomQuestion();

	// Renderizar la página con la pregunta y las opciones
	res.render('home', { question });
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server listening in port ${PORT}`)
})
