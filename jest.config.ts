/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['<rootDir>/src/Logger.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/unit_test_coverage',

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/tests/src/**/*.test.js'],

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation
  transformIgnorePatterns: ['/dist/', '/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true
};
