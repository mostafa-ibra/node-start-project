import express from "express";

import error from "../middleware/error.js";

import products from "../routes/products.js";
import users from "../routes/users.js";
import auth from "../routes/auth.js";

export default function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  // We should add this middleware function at the end of middleware functions
  app.use(error);
}
