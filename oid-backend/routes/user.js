const router = require("express").Router();
const User = require("../models/user");
const Client = require("../models/client");
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/signup", async (req, res) => {
  if (!req.body?.username || !req.body.password) return res.sendStatus(400);

  const users = await User.find({username: req.body.username});
  console.log(users);
  if (users.length > 0) return res.sendStatus(409);

  // const hash = await bcrypt.hash(req.body.password, 10)

  await User.create({
    username: req.body.username,
    password: req.body.password
  });

  res.sendStatus(200)
});

router.post("/login", async (req, res) => {
  if (!req.body?.username || !req.body.password || !req.body.client || !req.body.redirectUri) return res.sendStatus(400);

  const users = await User.find({username: req.body.username, password: req.body.password});
  if(!users.length) return res.sendStatus(401);
  console.log(users);
  
  const client = await Client.findOne({ client_id: req.body.client });

  if (!client) return res.sendStatus(401);
  if (client.redirect_uri !== req.body.redirectUri) return res.sendStatus(401);

  const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  client.users.push({
    userId: users[0]._id,
    code
  });

  await client.save();

  res.json({ code })
});

router.post("/token", async (req, res) => {
  if (!req.body.code || !req.body.client_id || !req.body.redirect_uri || !req.body.client_secret) return sendStatus(400);
  const client = await Client.findOne({ client_id: req.body.client_id, client_secret: req.body.client_secret });
  if (!client ) return sendStatus(401);
  const user = client.users.find(u => u.code === req.body.code);
  if (!user) res.sendStatus(401);
  
  const token = jwt.sign({ sub: user.userId }, "shhh", {expiresIn: "1h"});
  res.json({ id_token: token });
});

module.exports = router;
