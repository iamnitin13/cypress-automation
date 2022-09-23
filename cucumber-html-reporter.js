const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "cypress/cucumber-json",
  reportPath: "./reports/cucmber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "105",
    },
    device: "Local test machine",
    platform: {
      name: "macOS",
      version: "12.6",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      {
        label: "Execution Start Time",
        value: `${new Date().toLocaleString()}`,
      },
      {
        label: "Execution End Time",
        value: `${new Date().toLocaleString()}`,
      },
    ],
  },
});
