import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

import validator from "../middleware/validate.js";
import User from "../models/user.js";
const router = express.Router();

router.post("/", [validator(validate)], async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.genAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

export default router;
