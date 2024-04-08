// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// connect to the database
require("./db");

require("dotenv");
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Start handling routes here
const indexRoutes = require("./routes/index.routes");

app.use("/", indexRoutes);

module.exports = app;
