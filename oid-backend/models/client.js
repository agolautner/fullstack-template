const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  client_id: { type: String, unique: true},
  client_secret: { type: String},
  redirect_uri: { type: String },
  users: {type: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    code: String 
  }], required: true}
});

const Client = mongoose.model("client", clientSchema);

// Client.create({client_id: '12345', client_secret: '54321', redirect_uri: 'http://localhost:3000/oid-callback'})
module.exports = Client;