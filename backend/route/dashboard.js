const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const User = require("../model/user");

router.get("/api/dashboards", auth({ block: true }), async (req, res) => {
  const user = User.findById(res.locals.userId);
  res.json({ user });
});

/* router.get("/api/dashboards/:id", async (req, res) => {
  //send :id daschboard
});

router.get("/api/dashboards/:id/todos", async (req, res) => {
  // send :id dashpoard todos
}); */

router.get("/api/dashboards/:id/todos/:todoId", async (req, res) => {
  // send :id dashpoard todos
});

router.post("/api/dashboards", async (req, res) => {
  //create a dashboard, send cerated id
});

router.post("/api/dashboards/:id/todos/", async (req, res) => {
  // create todo ,
});

router.patch("/api/dashboards/:id", async (req, res) => {
  //update existing dashboard
});

router.delete("/api/dashboards/:id", async (req, res) => {
  //delete :id dashboard
});

router.delete("/api/dashboards/:id/todos/:todoId", async (req, res) => {
  //delete todo
});
