exports.auth =
  ({ block }) =>
  (req, res, next) => {
    console.log("épp autentikálok...");
    const userId = req.header("authorization");
    res.locals.userId = userId;
    if (block && !res.locals.userId) return res.sendStatus(401);
    next();
  };
