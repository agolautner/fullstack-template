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
    //scope: process.env.SCOPE,
  },
  github: {
    client_id: process.env.GIT_CLIENT_ID,
    client_secret: process.env.GIT_CLIENT_SECRET,
    redirect_uri: process.env.GIT_REDIRECT_URI,
    token_endpoint: process.env.GIT_TOKEN_ENDPOINT,
    user_endpoint: "http://api.github.com/user",
    //scope: process.env.GIT_SCOPE,
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
    //scope: config[provider].scope,
  });

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);
  console.log("ACCESSTOKEN1: ", response.data);

  let openId;
  const onlyOauth = !response.data.id_token;
  if (onlyOauth) {
    let token = response.data.split("=")[1].split("&")[0];
    console.log("ACCESSTOKEN: ", token);
    const userResponse = await http.post(
      config[provider].user_endpoint,
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);
    console.log("userRESPONSE DATA: ", userResponse.data.id);
    openId = userResponse.data.id;
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  //megkeresi a user-t, ha nincs csinál egyet:
  const key = "providers." + provider;
  const user = await User.findOneAndUpdate(
    { [key]: openId },
    { providers: { [provider]: openId } },
    { new: true, upsert: true }
  );
  const sessionToken = jwt.sign(
    { userId: user._id, providers: user.providers },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ sessionToken });
});

module.exports = router;
