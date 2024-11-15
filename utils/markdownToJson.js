const fs = require("fs");
const { QUESTIONS_CATEGORIES } = require("./constants");
//const fetch = require('node-fetch');
// ** IMPORTANTE - La URL de linkedin-skill-assessments-quizzes debe ser la RAW.
//Permite pasar parámetors por script. Ej se ejecute. node /nombre_del_archivo URL nombre_fichero_json category

//Ignora los dos primeros parámetro introducidos en línea de comando "node" y "/nombre_del_archivo"
const args = process.argv.slice(2);

const MARKDOWN_URL = args[0];
let titulo = args[1];
let categories = args[2];
// Default to null if not provided
const amount = parseInt(args[3], 10) || null;

// Función asíncrona para descargar el Markdown y llamar a la función que lo convierte a json y lo guarda en un archivo
async function descargarMarkdown() {
  try {
    const response = await fetch(MARKDOWN_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();

    convertiraJson(markdown);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Función para convertir el Markdown a JSON y guardarlo en un archivo

function convertiraJson(markdown) {
  const questions = [];
  let match;
  //add question count for keep track haw many question have been processed
  let questionCount = 0;

  // Expresiones regulares para extraer acada parte del documento desde formato markdown que se utiliza en las preguntas de LinkedIn

  const titleRegex = /^## (.+)$/gm; // Obtener los títulos que en nuestra API serán las categorias (de momento  NO LO USAMOS). Es uno por documento. Ejemplo: JS, CSS, HTML, etc
  const questionRegex = /#### Q\d+[\s\S]*?(?=#### Q\d+|$)/g; // Obtener preguntas
  const codeExamplesRegex = /```([\s\S]*?)```/g; // Ejercicios entre ``` ```
  const correctAnswerRegex = /- \[x\] (.+)/g; // Respuesta correcta
  const incorrectAnswerRegex = /- \[ \] (.+)/g; // Respuestas erróneas

  // Procesar cada bloque de preguntas
  while ((match = questionRegex.exec(markdown)) !== null) {
    // Stop if we've reached the desired amount
    if (amount && questionCount >= amount) {
      break;
    }

    const questionBlock = match[0]; // Bloque de preguntas
    let questionText = questionBlock
      .replace(/#### Q\d+\s*./, "")
      .split("\n")[0]
      .trim(); // Quitar la primera parte

    // Bloques de código
    const codeExamples = [...questionBlock.matchAll(codeExamplesRegex)].map(
      (m) => m[1]
    ); // Bloque de ejercicios en preguntas
    // Opciones
    const correctAnswers = [...questionBlock.matchAll(correctAnswerRegex)].map(
      (m) => m[1]
    );
    const incorrectAnswers = [
      ...questionBlock.matchAll(incorrectAnswerRegex),
    ].map((m) => m[1]);

    //llama a la funcion crea el array de opciones, poniendo las tres incorrectas primero y la correcta (True) al final
    const answerOptions = getAnswersOptions(correctAnswers, incorrectAnswers);
    if (!QUESTIONS_CATEGORIES.includes(categories)) {
      categories = [titulo];
    }
    // Crear el objeto
    const question = {
      categories,
      question: questionText,
      codeExamples,
      answerOptions,
      urlFont: MARKDOWN_URL,
    };

    questions.push(question); // Añadimos al array
    questionCount++;
  }

  //Crea la carpeta ListaJson si no existe
  const path = "output";
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // Guardar el array de objetos en un archivo JSON
  // To be able to save the file correctly this is what you have to execute in the terminal: node markdownToJson.js RAW  testrawjs
  fs.writeFileSync(`output/${titulo}.json`, JSON.stringify(questions, null, 2));
  console.log(`Se convirtió a JSON y se guardó en ${titulo}.json`);
}

//funcion que crea el array de opciones, poniendo las tres incorreectas primero y la correcta (True) al final
function getAnswersOptions(correctAnswers, incorrectAnswers) {
  // Map incorrect answers
  const incorrectOptions = incorrectAnswers.map((answer) => ({
    answer,
    isCorrect: false,
  }));

  // Map correct answers
  const correctOptions = correctAnswers.map((answer) => ({
    answer,
    isCorrect: true,
  }));

  // Combine incorrect options first, then correct options
  const answersOptions = incorrectOptions.concat(correctOptions);

  return answersOptions;
}

// Ejecutar la descarga y conversión
descargarMarkdown();
