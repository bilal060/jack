require("dotenv").config();
import { test, devices, Page, BrowserContext } from "@playwright/test";

// Your TG tests
test.describe("Pruebas de Telegram Web", () => {
  test("Verificar estado logueado", async ({ browser }) => {
    const context: BrowserContext = await browser.newContext({
      ...devices["iPhone 12"],
      storageState: JSON.parse(process.env.BULLPEN_SESSION_COOKIE || "{}"), // Here we use the decrypted session to restore the state and have our session inside the browser
    });
    const page: Page = await context.newPage();

    await page.goto("https://staging-app.bullpen.fi/home");
    await page.waitForTimeout(10000);

    await browser.close();
  });
});
