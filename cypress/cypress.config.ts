const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
  },
});
