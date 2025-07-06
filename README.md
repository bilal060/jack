# INSTRUCTIONS TO EXECUTE THE TEST:

- Clone this repository from **Github**.
- Open the folder in you favourite **IDE** (like **Visual Studio Code**) and open the **CMD** to execute the next commands.
- Install the next commands so you can use playwright in your machine:

  ```bash
  npm install playwright
  ```

  ```bash
  npm install dotenv
  ```

  ```bash
  npx install playwright
  ```

  **(⚠️ MAKE SURE TO HAVE NODE INSTALLED: https://nodejs.org/es ⚠️)**

- We need to log in Telegram manually to save the cookies in your local folder. The command you have to execute is:

  ```bash
  npx playwright test tests/login.spec.ts
  ```

  **(⚠️ Also make sure you are inside the clone folder ⚠️)**

- You have 60 seconds to log-in. If you need more time, modify the script inside the tests files changing the values. **Once you log-in, the test will finish automatically**
- After that, the cookies will be saved inside a folder called **.env** inside your repository. **(⚠️ THAT IS YOUR SESSION OF TELEGRAM, BE SURE TO NOT SHARE ANY OF THE .ENV DATA ⚠️)**
- After checking if the JSON is created. Enjoy making your tests with your account already logged executing this command:
  ```bash
  npx playwright test tests/already-logged.spec.ts
  ```

# ⚠️ THINGS TO CONSIDER ⚠️

Remember that cookies can expire! So, if your session does not work, delete the telegram-session.json and log-in again.

<div align="center">
  <img src="./images/Playwright-logo.png" alt="Playwright Logo" width="400">
</div>
