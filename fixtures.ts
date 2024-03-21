import { test } from "@playwright/test";
import { Application } from "./app";

export const baseFixture = test.extend<{
  app: Application;
}>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
});
