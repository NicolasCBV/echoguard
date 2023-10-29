import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "jest.config.ts",
    "jest.e2e.config.ts",
    "jest.global.config.ts",
    "/src/test.ts",
    "/src/app.module.ts",
    "/src/app/repositories/",
    "/node_modules/",
    "/dist/",
    "/build/",
    "/src/infra/storages/lmdb/seed.ts",
    "/public/",
    "/views/"
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
