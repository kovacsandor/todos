import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest/presets/js-with-babel',
  testPathIgnorePatterns: ['dist'],
  verbose: true,
};

export default config;
