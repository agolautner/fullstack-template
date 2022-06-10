const router = require("express").Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");

router.get("/", auth({ block: true }), async (req, res) => {
  const user = await User.findById(res.locals.user.userId);
  //if (!user) return res.status(404);
  res.json({ user });
});

/* router.get("/api/dashboards/:id", async (req, res) => {
  //send :id daschboard
});

router.get("/api/dashboards/:id/todos", async (req, res) => {
  // send :id dashpoard todos
}); */

router.get("/:id/todos/:todoId", async (req, res) => {
  // send :id dashpoard todos
});

router.post("/", async (req, res) => {
  //create a dashboard, send cerated id
});

router.post("/:id/todos", async (req, res) => {
  // create todo ,
});

router.patch("/:id", async (req, res) => {
  //update existing dashboard
});

router.delete("/:id", async (req, res) => {
  //delete :id dashboard
});

router.delete("/:id/todos/:todoId", async (req, res) => {
  //delete todo
});

module.exports = router;
