require("dotenv").config();
const logger = require("./logger.js");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const route = require("./route/route.js");

app.use("/", route);

app.get("/", (req, res) => {
  res.send("Howdy");
});

const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString)
  .then(() => {
    app.listen(3000, function () {
      logger.log({
        level: "info",
        message: "The server is running on 3000",
      });
    });
    logger.log({
      level: "info",
      message: "Database Connected",
    });
  })
  .catch(() =>
    logger.log({
      level: "error",
      message: "Error connecting to database",
    })
  );
