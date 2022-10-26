import app from "./app.js";
import logger from "./startups/logging.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Listening to port ${port} ...`);
});
