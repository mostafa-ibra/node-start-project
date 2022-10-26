import winston from "winston";
import "express-async-errors";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app_logs.log",
    }),
  ],
});

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  throw new Error(ex);
});

export default logger;
