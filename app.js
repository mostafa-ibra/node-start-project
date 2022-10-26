import express from "express";

// import config from "config";
import logger from "./startups/logging.js";
import db from "./startups/db.js";
import routes from "./startups/routes.js";

// console.log(config.get("jwtPrivateKey"));
db(logger);
const app = express();
routes(app);

export default app;
