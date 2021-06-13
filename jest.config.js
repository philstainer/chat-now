module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/src/$1'],
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageDirectory: '<rootDir>/src/coverage',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/build', '<rootDir>/pgdata'],
  testPathIgnorePatterns: ['/node_modules/', 'setupTests'],
}
