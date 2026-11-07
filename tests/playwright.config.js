// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 120_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173/',
    // Uses the Google Chrome already installed on the machine; no browser download needed.
    channel: 'chrome',
    viewport: { width: 390, height: 900 },
  },
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:4173/',
    reuseExistingServer: true,
  },
});
