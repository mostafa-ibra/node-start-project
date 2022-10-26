import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
});

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

export default mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
