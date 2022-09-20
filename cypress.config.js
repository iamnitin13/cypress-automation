const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "m6hxo4",
  reporter: "mochawesome",
  retries: 0, //change number to retry failed testcase n number of time for both run & open command
  // global url must in env key
  env: {
    url: "https://rahulshettyacademy.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber()); // for cypress cucumber preprocessor
    },
    specPattern: [
      "**/*.feature",
      "cypress/integration/**/*.js",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    ], // match pattern and show on cypress dashboard which files to test
  },
});
