import mongoose from "mongoose";
import config from "config";

const dbConnection = config.get("db");
export default function (logger) {
  mongoose.connect(dbConnection).then(() => {
    logger.info(`connected to ${dbConnection} ...`);
  });
}
