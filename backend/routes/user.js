const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const httpModule = require("../utils/http");
const http = httpModule();

const config = {
  google: {
    client_id: "",
    client_secret: "",
    redirect_uri: "",
    token_ndpoint: "",
    grant_type: "authorization_code",
  },
  /*   facebook: {
    clientId: "",
    clientSecret: "",
    redirectUri: "",
    tokenEndpoint: "",
  }, */
};

router.post("/api/login", async (req, res) => {
  const { payload } = req.body;
  if (!payload) return res.status(400).send("All inputs are required");

  const code = payload.code;
  const provider = payload.provider;
  if (!(code && provider)) return res.status(400).send("All inputs required");
  if (!Object.keys(config).includes(provider))
    return res.status(400).send("Wrong payload!");

  const response = await http.post(config[provider].token_endpoint, {
    code: code,
    client_id: config[provider].client_id,
    client_secret: config[provider].client_secret,
    redirect_uri: config[provider].redirect_uri,
    grant_type: "authorization_code",
  });

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.sendStatus(500);

  const key = "providers." + provider;
  const user = await User.find({ [key]: decoded.sub });
});
