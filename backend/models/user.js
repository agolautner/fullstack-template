const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true }, //empty string NONO!
  content: { type: String, required: true }, //empty string is enough
  isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
  title: { type: String, required: true }, //empty string NONO!
  todos: [todoSchema], //empty list as default?
});

const userSchema = new mongoose.Schema({
  username: { type: String }, //empty string NONO!  !!unique
  providers: {
    google: { type: String, sparse: true, unique: true },
    oid: { type: String, sparse: true, unique: true },
    github: { type: String, sparse: true, unique: true }
  },
  dashboards: [dashboardSchema], //empty list as default?
});

const User = mongoose.model("user", userSchema);

module.exports = User;
