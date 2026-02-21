import { defineConfig, devices } from "@playwright/test";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const runRoot = process.env.PW_RUN_DIR || `test-runs/ad-hoc/${timestamp}`;
const baseURL = process.env.PORTAL_BASE_URL || "http://127.0.0.1:4000";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: `${runRoot}/artifacts`,
  reporter: [
    ["list"],
    ["html", { outputFolder: `${runRoot}/html-report`, open: "never" }],
    ["json", { outputFile: `${runRoot}/results.json` }],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "on",
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4000",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
