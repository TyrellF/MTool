require("dotenv").config(); // Load environment variables from .env file
const puppeteer = require("puppeteer");
const fs = require("fs");

async function fetchAndUpdateToken() {
  let authorizationToken = null;

  while (authorizationToken === null || authorizationToken === "undefined") {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Navigating to the login page...");

    // Navigate to the login page
    await page.goto("https://app.meltwater.com/login");

    // Read the email address and password from the .env file
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    console.log("Logging in...");

    // Enter the email address
    await page.type('input[type="email"]', email);

    console.log('Entering email and clicking "Remember Me" (if available)...');

    // Check if the "Remember Me" checkbox exists on the page by name
    const rememberMeCheckbox = await page.$("md-checkbox");
    if (rememberMeCheckbox) {
      // Click the "Remember Me" checkbox
      await rememberMeCheckbox.click();
    } else {
      console.log("Remember Me checkbox not found. Proceeding without it.");
    }

    // Click the "Next" button
    await page.click("button.mw-app-login__login-button");

    // Wait for the password input field to appear with an extended timeout
    await page.waitForSelector('input[type="password"][name="password"]', {
      timeout: 60000,
    });

    // Enter the password
    await page.type('input[type="password"][name="password"]', password);

    // Click the "Log In" button using the class and wait for navigation to complete
    await page.click("button._button-login-password", {
      waitUntil: "networkidle0",
    });

    // Wait for navigation to the "app.meltwater.com/home" page with an extended timeout
    await page.waitForNavigation({
      url: "https://app.meltwater.com/home",
      timeout: 60000,
    });

    // Wait for successful login (you can adjust this wait as needed)
    console.log("Logged in successfully. Extracting token...");

    // Intercept network responses to capture the token
    page.on("request", async (request) => {
      const headers = request.headers();
      if (headers["authorization"]) {
        authorizationToken = headers["authorization"];
      }
    });

    // Continue to navigate to the desired page
    await page.goto("https://app.meltwater.com/home"); // Replace with the desired page URL

    // Wait for a short duration to ensure all network requests are captured
    await page.waitForTimeout(5000);

    // Close the browser
    await browser.close();
  }

  if (authorizationToken && authorizationToken !== "undefined") {
    // Update the .env file with the new token
    const envFilePath = ".env"; // Adjust the path to your .env file
    const currentEnvContent = fs.readFileSync(envFilePath, "utf-8");
    const newEnvContent = currentEnvContent.replace(
      /NSW_PRINT_PDF_TOKEN=.*/,
      `NSW_PRINT_PDF_TOKEN=${authorizationToken}`
    );

    fs.writeFileSync(envFilePath, newEnvContent);

    console.log("Token updated in .env file:", authorizationToken);
  } else {
    console.error(
      "Token not found in headers. Login may not have been successful."
    );
  }
}

module.exports = fetchAndUpdateToken;
