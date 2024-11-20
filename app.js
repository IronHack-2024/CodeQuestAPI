const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Application routes.
 */
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

/**
 * Starts the server and connects to the database.
 *
 * @constant {number} PORT - The port on which the server listens.
 * @function
 * @async
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening on port ${PORT}`);
});
