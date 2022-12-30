import { afterAll, beforeAll, beforeEach } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { EnvironmentVariables } from 'todos-shared-microservices';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  const environmentVariables: EnvironmentVariables = {
    JWT_SECRET: 'JWT_SECRET',
  };

  process.env = {
    ...process.env,
    ...environmentVariables,
  };

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});
