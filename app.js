const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const port = process.env.PORT || 1000;

//parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//static middleware
app.use(express.static("public"));

//template engine
app.engine(".hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", "./views");

const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
