const environment = process.env.ENV || 'qa';
console.log('Running environment:', environment);
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // Folder where test files live
  testDir: './tests',

  // Maximum time allowed for each test
  timeout: 30 * 1000,
  // Assertion timeout
  expect: {
    timeout: 5000
  },

  // Allow independent tests to run in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  workers: process.env.CI ? 2 : undefined,

  // Reporting
  reporter: [
    ['html', { open: 'on-failure' }],
    ['list']
  ],
  use: {

    // Base URL for application
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Save screenshot when test fails
    screenshot: 'only-on-failure',

    // Keep video when test fails
    video: 'retain-on-failure',

    // Collect trace on first retry
    trace: 'on-first-retry'
  },

  projects: [

    // Step 1: Login and save authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Step 2: Run tests using saved authentication
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    }

  ]
});
