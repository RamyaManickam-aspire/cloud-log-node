const express = require("express");
const { LoggingWinston } = require("@google-cloud/logging-winston");
const winston = require("winston");

// Create a Winston logger that streams to Google Cloud Logging
const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console(), new LoggingWinston()],
});

// Create an Express application
const app = express();

// Define a simple route
app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Hello, World!");
});

// Define an error route
app.get("/error", (req, res) => {
  logger.error("Error route accessed");
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
