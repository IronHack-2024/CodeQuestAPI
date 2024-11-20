const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { rateLimit } = require("express-rate-limit");
const { connectDB } = require("./utils/db");

const indexRouter = require("./routes/index.routes");
const apiRouter = require("./routes/api.routes");
const {
  getRandomQuestionWithoutCodeExamples,
} = require("./services/question.services");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.config');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  limit: 20, // limit each IP to 20 requests per `window` per 60 seconds
});

dotenv.config();

const app = express();

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
          "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css",
          "https://cdn.tailwindcss.com",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: [
          "'self'",
          "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js",
          "https://cdn.tailwindcss.com",
          "'unsafe-eval'",
          "'unsafe-inline'",
        ],
      },
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
});
