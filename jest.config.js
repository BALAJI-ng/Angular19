module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  testPathIgnorePatterns: ['<rootDir>/tests/', '<rootDir>/playwright.config.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/polyfills.ts'
  ],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Angular 19 Jest Test Report',
        outputPath: './test-results/jest-report.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
        theme: 'defaultTheme'
      }
    ]
  ]
};