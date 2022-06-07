const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const startDb = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const connection = await mongoose.connect(uri);
  return [connection, mongod];
};

const stopDb = async (connection, mongod) => {
  await connection.disconnect();
  await mongod.stop();
};

const deleteAll = async (...collections) => {
  /*   for (const collection of collections) {
    await collection.deleteMany();
  } */
  const promises = collections.map((collection) => collection.deleteMany());
  await Promise.all(promises);
};

module.exports = { startDb, stopDb, deleteAll };
