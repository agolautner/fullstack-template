const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

//creating user
router.post("/signup", async (req, res) => {
  if (!req.body?.username || !req.body.password) return res.sendStatus(400);

  const users = await User.find({username: req.body.username});
  console.log(users);
  if (users.length > 0) return res.sendStatus(409);

  const hash = await bcrypt.hash(req.body.password, 10)

  await User.create({
    username: req.body.username,
    password: hash
  });

  res.sendStatus(200)
});

module.exports = router;
