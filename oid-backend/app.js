const express = require("express");
require('express-async-errors');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, 
  optionsSuccessStatus: 200
};

morgan.token("host", function (req, res) {
  return req.hostname
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const clientRoutes = require("./routes/client");
app.use("/api/client", clientRoutes);
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

app.get("", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;
