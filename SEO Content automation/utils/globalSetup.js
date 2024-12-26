const { FullConfig } = require("@playwright/test");
const dotenv = require("dotenv");

async function globalSetup(config) {
  dotenv.config({
    path: `./config/.env.${process.env.test_env}`,
    override: true,
  });
}

module.exports = globalSetup;
