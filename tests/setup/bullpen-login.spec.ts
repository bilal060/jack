require("dotenv").config();
import { test, devices, Page, BrowserContext } from "@playwright/test";
import * as fs from "fs";
// This is the test of login
const timeToLogin: number = 60000; // This is the max time you have to login manually, IF YOU NEED MORE TIME, CHANGE THIS VALUE TO A BIGGER ONE
test("Save session of Bullpen", async ({ browser }) => {
  test.setTimeout(timeToLogin + 10000);
  const context: BrowserContext = await browser.newContext({
    ...devices["iPhone 12"],
  });
  const page: Page = await context.newPage();

  await page.goto("https://staging-app.bullpen.fi/login");
  console.log("Please, log in Telegram manually. (You have 60 seconds)");

  await page.waitForSelector(
    "#__next > div > div.bg-custom-black.border-bp-secondary-background.flex.h-\\[92px\\].w-full.border-t.pt-5.pb-6.backdrop-blur-\\[4px\\]",
    { timeout: timeToLogin }
  );

  // Save the session creating a .env file
  const storageState = await context.storageState();
  console.log("Session saved in: ", storageState);

  const cookiesString = JSON.stringify(storageState);
  const envPath = ".env";
  try {
    if (fs.existsSync(envPath)) {
      // Leer el contenido actual del archivo .env
      let envContent = fs.readFileSync(envPath, "utf8");

      // Reemplazar o agregar la línea de TELEGRAM_SESSION_COOKIE
      if (envContent.includes("BULLPEN_SESSION_COOKIE=")) {
        envContent = envContent.replace(
          /BULLPEN_SESSION_COOKIE=.*/g,
          `BULLPEN_SESSION_COOKIE=${cookiesString}`
        );
      } else {
        envContent += `\nBULLPEN_SESSION_COOKIE=${cookiesString}`;
      }

      // Escribir el contenido actualizado en el archivo .env
      fs.writeFileSync(envPath, envContent, { flag: "w" });
    } else {
      // Crear el archivo .env si no existe
      fs.writeFileSync(envPath, `BULLPEN_SESSION_COOKIE=${cookiesString}\n`, {
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
