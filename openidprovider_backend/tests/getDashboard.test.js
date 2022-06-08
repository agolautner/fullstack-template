require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("/api/dashboards GET tests", () => {
  let connection;
  let mongod;
  let client;

  beforeAll(async () => {
    [connection, mongod] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, mongod);
  });

  test("returns an empty list for new users", async () => {
    //given
    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);

    //when
    const response = await client.get("/api/dashboards");

    //then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);
  });

  test("deleted user get returns nothing", async () => {
    //given

    const newUser = new User({
      username: "Macska",
    });
    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET)
    client.set("authorization", token);
    
    await User.deleteMany();

    //when
    const response = await client.get("/api/dashboards");

    //then
    expect(response.status).toBe(200);
    expect(response.body.user).toBeNull();
  });
});
