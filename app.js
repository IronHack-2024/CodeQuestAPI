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

mailchimp.setConfig({
	apiKey: 'd0389b472785394c8740e10a2158b513-us22', // Reemplaza con tu API key de Mailchimp
	server: 'us22', // Prefijo del servidor, por ejemplo "us1"
  });
  const listId = '58371aa183'; // Reemplaza con el ID de tu lista de Mailchimp

  app.post('/subscribe', async (req, res) => {
    const email = req.body.email;
  
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: 'subscribed',
      });
      console.log(`Successfully added contact as an audience member. ID: ${response.id}`);
      res.send('Suscripción exitosa. ¡Gracias por unirte a nuestra lista de newsletter!');
    } catch (error) {
      console.error(error);
      res.send('Hubo un error en la suscripción. Por favor, intenta nuevamente.');
    }
  });

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
