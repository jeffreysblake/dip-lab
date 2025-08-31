module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/main/classes/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testMatch: [
    '**/*.test.ts'
  ],
  transform: {
    '^.+\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/'
  }
};
