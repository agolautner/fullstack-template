const router = require("express").Router();
const Client = require("../models/client");

router.post("/register", async (req, res) => {
  if(req.get('authorization') !== process.env.ADMIN_SECRET) return res.sendStatus(401);

  const client = await Client.create({
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
    redirect_uri: req.body.redirect_uri
  });
  res.sendStatus(200);
});

module.exports = router;
