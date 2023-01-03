import { afterAll, beforeAll, beforeEach, jest } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { mockKafkaSend } from 'src/helper';
import { EnvironmentVariables, mockKafka } from 'todos-shared-microservices';

let mongoServer: MongoMemoryServer;

const kafka = mockKafka(jest);
kafka(mockKafkaSend);

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
