const jwt = require("jsonwebtoken");

const auth =
  ({ block }) =>
  (req, res, next) => {
    const token = req.header("authorization");
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error && block) return res.sendStatus(401);
      res.locals.user = user;
      next();
    });
  };

  module.exports = auth