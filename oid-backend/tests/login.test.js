require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require('./util/httpMock');

describe("/api/login POST tests", () => {
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

  test("returns 400 when no request body is sent", async () => {
    //given

    //when
    const response = await client.post("/api/user/login");

    //then
    expect(response.status).toBe(400);
  });

  test("returns 400 when code is not sent", async () => {
    //given
    const provider = 'github';

    //when
    const response = await client.post("/api/user/login").send({
      provider
    });

    //then
    expect(response.status).toBe(400);
  });

  test("returns 400 when provider is not sent", async () => {
    //given
    const code = 'random';

    //when
    const response = await client.post("/api/user/login").send({
      code
    });

    //then
    expect(response.status).toBe(400);
  });

  test("returns 400 with invalid provider data. (user not created)", async () => {
    //given
    const code = 'random';
    const provider = 'gitlab';

    //when
    const response = await client.post("/api/user/login").send({
      code, provider
    });

    //then
    expect(response.status).toBe(400);
  });

  test("returns 200 with JWT with valid provider (user not created)", async () => {
    //given
    const code = 'random';
    const provider = 'google';
    const googleUserId = '1232343245'

    setupGoogleSuccessResponse(googleUserId);

    //when
    const response = await client.post("/api/user/login").send({
      code, provider
    });

    //then
    expect(response.status).toBe(200);
    const responseToken = jwt.decode(response.body.sessionToken);
    expect(responseToken.providers.google).toBe(googleUserId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });

  test("returns 401 with JWT with invalid code (user not created)", async () => {
    //given
    const code = 'random';
    const provider = 'google';
    const googleUserId = '1232343245'

    setupGoogleErrorResponse(googleUserId);

    //when
    const response = await client.post("/api/user/login").send({
      code, provider
    });
    
    //then
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({});
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });
});
