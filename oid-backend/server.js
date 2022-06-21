require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.once("open", function () {
  console.log("*** MongoDB got connected ***");
  console.log(
    `Our Current Database Name : ${mongoose.connection.db.databaseName}`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
