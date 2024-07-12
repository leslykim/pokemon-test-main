import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './',
  timeout: 30000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }]
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};

export default config;