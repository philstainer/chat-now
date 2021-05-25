module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.(test|spec)\\.ts$',
  // transform: {
  //   '^.+\\.(t|j)s$': 'ts-jest',
  // },
  collectCoverageFrom: ['**/*.(t|j)s'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/test/*': ['src/test/*'],
    '@/graphql/*': ['src/graphql/*'],
    '@/lib/*': ['src/lib/*'],
    '@/utils/*': ['src/utils/*'],
  },
  modulePathIgnorePatterns: ['<rootDir>/build', '<rootDir>/pgdata'],
}
