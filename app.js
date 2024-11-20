const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
});
