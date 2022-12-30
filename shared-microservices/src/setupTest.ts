import { beforeAll } from '@jest/globals';
import { EnvironmentVariables } from 'src/type';

beforeAll(async () => {
  const environmentVariables: EnvironmentVariables = {
    JWT_SECRET: 'JWT_SECRET',
  };

  process.env = {
    ...process.env,
    ...environmentVariables,
  };
});
