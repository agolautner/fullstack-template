const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const http = require("../utils/http");
const auth = require('../middlewares/auth');
const config = require('../app.config');

router.post("/login", auth({block: false}), async (req, res) => {
  const payload = req.body;
  if (!payload) return res.sendStatus(400);

  const code = payload.code;
  const provider = payload.provider;
  if (!(code && provider)) return res.sendStatus(400);
  if (!Object.keys(config.auth).includes(provider)) return res.sendStatus(400);

  const response = await http.post(
    config.auth[provider].token_endpoint,
    {
      code: code,
      client_id: config.auth[provider].client_id,
      client_secret: config.auth[provider].client_secret,
      redirect_uri: config.auth[provider].redirect_uri,
      grant_type: "authorization_code",
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401); //amit a google ad, nem 200-as, akkor nem tudjuk azonositani
  console.log(response.data);

  //github oauth flowjahoz
  let openId;
  const onlyOauth = !response.data.id_token;

  if (onlyOauth) {
    //let token = response.data.split("=")[1].split("&")[0];
    let token = response.data.access_token;
    const userResponse = await http.post(
      config.auth[provider].user_endpoint,
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.status(401).send('oid provider error');
    const id = config.auth[provider].user_id;
    openId = userResponse.data[id];
  } else {
    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    openId = decoded.sub;
  }

  //finding user
  const key = "providers." + provider;
  let user = await User.findOne(
    { [key]: openId }
  );
  if (user && res.locals.user?.providers) {
    user.providers = { ...user.providers, ...res.locals.user.providers };
    user = await user.save();
  }

  const sessionToken = jwt.sign(
    { userId: user?._id, // the use of ?. is an example of optional chaining
      providers: user ? user.providers : { [provider]: openId} },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ sessionToken }); //visszakuldjuk neki stringkent (sessionToken), de kuldhetjuk objectben is ({sessionToken})/{"sessionToken: sessionToken"}
});

//creating user
router.post("/create", auth({ block: true }), async (req, res) => {
  if (!req.body?.username) return res.sendStatus(400);
  const user = await User.create({
    username: req.body.username,
    providers: res.locals.user.providers,
  });

  const sessionToken = jwt.sign(
    {
      userId: user._id,
      providers: user.providers,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ sessionToken });
});

module.exports = router;
