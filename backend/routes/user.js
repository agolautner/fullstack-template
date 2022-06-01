require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const httpModule = require("../utils/http");
const http = httpModule();

const config = {
  google: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    token_endpoint: process.env.TOKEN_ENDPOINT,
    //grant_type: "authorization_code",
  },
  /*   facebook: {
    clientId: "",
    clientSecret: "",
    redirectUri: "",
    tokenEndpoint: "",
  }, */
};

router.post("/login", async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).send("All inputs are required 1");

  const code = payload.code;
  const provider = payload.provider;
  if (!(code && provider)) return res.status(400).send("All inputs required 2");
  if (!Object.keys(config).includes(provider))
    return res.status(400).send("Wrong payload!");

  const response = await http.post(config[provider].token_endpoint, {
    code: code,
    client_id: config[provider].client_id,
    client_secret: config[provider].client_secret,
    redirect_uri: config[provider].redirect_uri,
    grant_type: "authorization_code",
    scope: "openid",
  });

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.sendStatus(500);

  //megkeresi a user-t, ha nincs csinál egyet:
  const key = "providers." + provider;
  const user = await User.findOneAndUpdate(
    { [key]: decoded.sub },
    { providers: { [provider]: decoded.sub } },
    { new: true }
  );
  const sessionToken = jwt.sign(
    { userId: user.id, providers: user.providers },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ sessionToken });
});

module.exports = router;
