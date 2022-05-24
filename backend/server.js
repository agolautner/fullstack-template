require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { logger } = require("./middlewares/logger");
const { auth } = require("./middlewares/auth");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

app.use(logger);

app.get("/api/public", (req, res) => {
  console.log("public");
  res.send("Hello Public World ! ");
});
app.get("/api/private", auth({ block: true }), (req, res) => {
  console.log("private");
  res.send(`Hello Private world, your user id is: ${res.locals.userId} !`);
});
app.get("/api/prublic", auth({ block: false }), (req, res) => {
  console.log("private");
  if (!res.locals.userId)
    return res.send("Hello Prublic World, you're not logged in ! ");
  res.send(`Hello Prublic World, your user id is: ${res.locals.userId} !`);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
