const app = require("../app");
const mockserver = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../model/user");
const mongoose = require("mongoose");

test("reterns an empty list for new users", async () => {
  //given
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);

  const newUser = new User({
    username: "Macska",
    email: "ggg@ggg.gg",
    googleId: "12345",
  });
  const client = mockserver.agent(app);
  await newUser.save();
  client.set("authorization", newUser._id);

  //when
  const response = await client.get("/api/dashboards");

  //then
  expect(response.status).toBe(200);
  const responseData = response.body;
  expect(responseData.user.dashboards).toStrictEqual([]);
  await connection.disconnect();
  await mongod.stop();
});
