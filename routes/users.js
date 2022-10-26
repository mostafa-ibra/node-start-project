import express from "express";
import _ from "lodash";
import bcrypt from "bcrypt";

import validator from "../middleware/validate.js";
import User, {
  validateUser as validate,
} from "../models/user.js";

const router = express.Router();

router.post(
  "/",
  [validator(validate)],
  async (req, res) => {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res
        .status(400)
        .send("User already registered.");
    }

    user = new User(
      _.pick(req.body, ["name", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.genAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  }
);

export default router;
