const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  //   defaultMeta: { service: "default-service" },
  transports: [
    new winston.transports.File({ filename: "err.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.APP_ENV != "prod") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
