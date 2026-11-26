import { defineConfig, devices } from "@playwright/test";

/**
 * Two production servers are started from the same build:
 *  - :3101  enquiry webhook configured (points at the mock receiver started by the tests on :4010)
 *  - :3102  nothing configured → /api/enquiry must answer 503 and the form must show an honest error
 * Run `npm run build` first.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "tests/results.json" }]],
  use: { baseURL: "http://localhost:3101", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    { command: "node tests/mock-webhook.mjs", url: "http://127.0.0.1:4010/_received", reuseExistingServer: false },
    {
      command: "npx next start -p 3101",
      url: "http://localhost:3101",
      reuseExistingServer: false,
      env: { ENQUIRY_WEBHOOK_URL: "http://127.0.0.1:4010/hook" },
    },
    { command: "npx next start -p 3102", url: "http://localhost:3102", reuseExistingServer: false },
  ],
});
