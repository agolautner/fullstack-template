const express = require("express");
const cors = require("cors");

const { logger } = require("./middlewares/logger");
const { auth } = require("./middlewares/auth");
const { errorHandler } = require("./middlewares/errorHandler");
const dashboard = require("./routes/dashboard");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
  })
);
app.use(express.json());

app.use(logger);

app.use("/api/dashboards", dashboard);

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

module.exports = app;
