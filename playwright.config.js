import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:8766',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 1200 },
  },
  webServer: {
    command: 'node tests/e2e/static-server.mjs',
    port: 8766,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
