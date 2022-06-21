const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, minlength: 5 },
  password: { type: String, minlength: 5 }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
