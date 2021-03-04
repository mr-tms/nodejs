import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testPathIgnorePatterns: [
    '/build/'
  ]
};
export default config;
