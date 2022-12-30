import type { Config } from 'jest';

const config: Config = {
  detectOpenHandles: true,
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest/presets/js-with-babel',
  setupFilesAfterEnv: ['./src/setupTest.ts'],
  verbose: true,
};

export default config;
