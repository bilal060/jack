require("dotenv").config();
import { test, devices, Page, BrowserContext } from "@playwright/test";
import * as fs from "fs";
// This is the test of login
const timeToLogin: number = 60000; // This is the max time you have to login manually, IF YOU NEED MORE TIME, CHANGE THIS VALUE TO A BIGGER ONE
test("Save session of TG", async ({ browser }) => {
  test.setTimeout(timeToLogin + 10000);
  const context: BrowserContext = await browser.newContext({
    ...devices["iPhone 12"],
  });
  const page: Page = await context.newPage();

  await page.goto("https://web.telegram.org/");
  console.log("Please, log in Telegram manually. (You have 60 seconds)");

  try {
    await Promise.race([
      page.waitForSelector("#main-columns", { timeout: timeToLogin }),
      page.waitForSelector("#Main", { timeout: timeToLogin }),
    ]);
    console.log("Login detected. Proceeding...");
  } catch (error) {
    console.error("Login not detected. Timeout or incorrect selectors.");
    throw new Error("Login failed: #main-columns or #Main not found.");
  }

  const storageState = await context.storageState();
  console.log("Session saved in: ", storageState);

  const cookiesString = JSON.stringify(storageState);
  const envPath = ".env";
  try {
    if (fs.existsSync(envPath)) {
      // Leer el contenido actual del archivo .env
      let envContent = fs.readFileSync(envPath, "utf8");

      // Reemplazar o agregar la línea de TELEGRAM_SESSION_COOKIE
      if (envContent.includes("TELEGRAM_SESSION_COOKIE=")) {
        envContent = envContent.replace(
          /TELEGRAM_SESSION_COOKIE=.*/g,
          `TELEGRAM_SESSION_COOKIE=${cookiesString}`
        );
      } else {
        envContent += `\nTELEGRAM_SESSION_COOKIE=${cookiesString}`;
      }

      // Escribir el contenido actualizado en el archivo .env
      fs.writeFileSync(envPath, envContent, { flag: "w" });
    } else {
      // Crear el archivo .env si no existe
      fs.writeFileSync(envPath, `TELEGRAM_SESSION_COOKIE=${cookiesString}\n`, {
        flag: "w",
      });
    }

    console.log("Cookies guardadas o actualizadas en el archivo .env");
  } catch (error) {
    console.error(
      "Error al guardar o actualizar las cookies en el archivo .env:",
      error
    );
  }
  await browser.close();
});
