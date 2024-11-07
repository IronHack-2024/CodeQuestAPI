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

 /* async function listTemplates() {
    try {
      const response = await mailchimp.templates.list();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  listTemplates();*/
  // listTemplates nos busca y da la lista de templates de mailchimp. nuestro newsletter tiene id:2
  
  
app.use('/', indexRouter);

app.get('/daily-question', async (req, res) => {

	// Obtener la pregunta correspondiente al día
	const question = await getRandomQuestion();

	// Renderizar la página con la pregunta y las opciones
	res.render('home', { question });

})

/*
async function updateTemplate() {
  const templateId = '4';
  
  try {
    const response = await mailchimp.templates.updateTemplate(templateId, {
      name: 'NEW TEST EVA 2',
      html: '<html><body>EVA2</body></html>'
    });
    console.log('Template updated successfully:', response);
  } catch (error) {
    console.error('Error updating template:', error);
  }
}

updateTemplate(); */



this.updateTemplateWithHttpInfo = function(templateId, body) {
 var postBody = body;

 // verify the required parameter 'templateId' is set
 if (templateId === undefined || templateId === null) {
   throw new Error("Missing the required parameter 'templateId' when calling ");
 }

 // verify the required parameter 'body' is set
 if (body === undefined || body === null) {
   throw new Error("Missing the required parameter 'body' when calling ");
 }

 var pathParams = {
   'template_id': 4
 };
 
 /*
  The following block building queryParams is going to look a little odd, we're going look for values in $opts with both
  camelCase and snake_case format (which will be the same if singular word). This is because the API docs use snake_case
  but early versions of these SDKs used camelCase. So to be backward compatible we'll use both. 
 */
 var queryParams = {html: 'EVA'
 };
 var headerParams = {html:'NEW UPDATED BY CODE DOCS'
 };



 var authNames = ['basicAuth'];
 var contentTypes = ['application/json'];
 var accepts = ['application/json', 'application/problem+json'];
 var returnType = 'application/json';

 return this.apiClient.callApi(
   '/templates/{4}', 'PATCH',
   pathParams, queryParams, headerParams, postBody,
   authNames, contentTypes, accepts, returnType
 );
}
/**
* Update template
* Update the name, HTML, or `folder_id` of an existing template.
* @param {String} templateId The unique id for the template.
* @param {module:model/TemplateInstance2} body 
* @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/TemplateInstance}
*/
this.updateTemplate = function(templateId, body) {
 return this.updateTemplateWithHttpInfo(templateId, body)
   .then(function(response_and_data) {
     return response_and_data.data;
   });
}


const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server listening in port ${PORT}`)
})
