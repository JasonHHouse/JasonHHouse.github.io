import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = defineConfig({
  // Test directory
  testDir: './e2e',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure
    video: 'retain-on-failure',
    
    // Global timeout for all tests (faster for local dev)
    actionTimeout: process.env.CI ? 30 * 1000 : 15 * 1000,
    
    // Navigation timeout (faster for local dev)
    navigationTimeout: process.env.CI ? 30 * 1000 : 15 * 1000,
  },
  
  // Global timeout for each test (2 minutes)
  timeout: 2 * 60 * 1000,
  
  // Expect timeout for assertions (10 seconds)
  expect: {
    timeout: 10 * 1000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Use Chrome in headless mode for faster execution
        launchOptions: {
          args: [
            '--disable-dev-shm-usage', 
            '--disable-extensions',
            '--no-sandbox', // Faster startup
            '--disable-setuid-sandbox',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding'
          ],
        },
      },
    },

    // Only run other browsers in CI or when explicitly requested
    ...(process.env.CI || process.env.ALL_BROWSERS ? [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },

      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },

      /* Test against mobile viewports. */
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
      },
      {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 12'] },
      },
    ] : []),

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Run your local dev server before starting the tests (only in non-CI environments)
  ...(process.env.CI ? {} : {
    webServer: {
      command: 'npm run dev',
      url: 'http://localhost:3000',
      reuseExistingServer: true,
      timeout: 120 * 1000, // 2 minutes to start the server
    }
  }),
  
  // Output directory for test artifacts
  outputDir: 'test-results/',
  
  // Glob patterns or regular expressions that match test files.
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts'],
  
  // Glob patterns or regular expressions that match test files to be ignored.
  testIgnore: ['**/node_modules/**', '**/build/**', '**/.next/**'],
  
});

// Add environment-specific properties conditionally
if (process.env.CI) {
  config.workers = 2; // Increased from 1 for better CI performance
  config.maxFailures = 10;
} else {
  // Use optimal workers for local development (CPU cores - 1)
  config.workers = Math.max(1, os.cpus().length - 1);
}

export default config;