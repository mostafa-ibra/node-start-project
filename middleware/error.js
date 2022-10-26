import logger from "../startups/logging.js";

export default function (err, req, res, next) {
  // Log the Exception
  // error
  // warn
  // info - if we set logging level to this also error and warn will log
  // verbose
  // debug
  // silly
  logger.error(err.message, err);
  res.status(500).send("Something Failed.");
}
