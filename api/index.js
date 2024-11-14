const express = require("express");
const { rateLimit } = require("express-rate-limit");
const mongoose = require('mongoose');
/* const { connectDB } = require("../utils/db"); */
const dotenv = require("dotenv");
const path = require('path');

const indexRouter = require("../routes/index.routes");
const apiRouter = require("../routes/api.routes");
const {
  getRandomQuestionWithoutCodeExamples,
} = require("../services/question.services");
const { shuffleArray } = require("../utils/utils");
const cors = require("cors");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  limit: 20, // limit each IP to 20 requests per `window` per 60 seconds
});

dotenv.config();

const app = express();

// Enable trust proxy to allow Express to recognize IPs from the 'X-Forwarded-For' header
app.set('trust proxy', 1); // or app.set('trust proxy', 'loopback') if only allowing local traffic

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

const helmet = require("helmet");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "https://cdn.tailwindcss.com",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: [
          "'self'",
          "https://cdn.tailwindcss.com",
          "'unsafe-eval'",
          "'unsafe-inline'",
        ],
      },
    },
  })
);

app.use(express.urlencoded({ extended: true }));

// Set the views directory to the correct location
app.set('views', path.join(__dirname, '..', 'views')); 

app.set("view engine", "ejs");

app.use(express.static("public"));
app.options("/api/*", cors({ methods: ["GET"], origin: "*" }));

app.use(
  "/api",
  cors({
    methods: ["GET"],
    origin: "*",
  }),
  limiter,
  apiRouter
);
app.use("/", limiter, indexRouter);

app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
});

app.use("*", (req, res) => {
  res.status(404).render("404", {
    message: "The page you are looking for does not exist.",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    message: "An error has occurred on the server. Try again later.",
  });
});

// Function to connect to the database
async function connectDB() {
  try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to the database');
  } catch (err) {
      console.error('Database connection error:', err.message);
  }
}

// Call the connectDB function and catch any errors
connectDB().catch(err => console.log(err))

// Start the server and listen on the specified port
app.listen(3000, (req, res) => {
  console.log("Servidor escuchando correctamente en el puerto " + 3000);
}); 

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
}); */

module.exports = app