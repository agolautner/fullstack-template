require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
};

const myLogger = (req, res, next) => {
  console.log("épp loggolok...");
  next();
};

const myAuth = (req, res, next) => {
  console.log("épp autentikálok...");
  const userId = 1;
  //req.userId = userId;
  res.locals.userId = userId;
  next();
};

const myBusinessLogic = (req, res) => {
  // if (!req.userId) return res.sendStatus(401);
  if (!res.locals.userId) return res.sendStatus(401);
  console.log("épp fut az üzleti logika...");
  res.json("Siker!");
};

app.use(myLogger);
app.use(myAuth);
app.use(myBusinessLogic);

/* app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
