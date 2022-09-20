const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "m6hxo4",
  reporter: "mochawesome",
  retries: 1,
  // global url must in env key
  env: {
    url: "https://rahulshettyacademy.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/**/*.js", // match pattern and show on cypress dashboard which files to test
  },
});
