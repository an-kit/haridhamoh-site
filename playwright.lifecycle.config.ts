import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: false,
  testDir: "./tests",
  testMatch: "lifecycle-navigation.e2e.ts",
  timeout: 180_000,
  use: {
    browserName: "chromium",
    headless: true,
  },
  workers: 1,
});
