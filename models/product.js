import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  image: {
    type: String,
    maxLength: 255,
  },
  defaultPrice: {
    type: Schema.Types.Decimal128,
    required: true,
    min: 2,
  },
  discount: {
    type: Number,
    default: 0,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 1,
  },
});

export default mongoose.model("Product", productSchema);

export function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    image: Joi.string().max(255),
    defaultPrice: Joi.Decimal128().min(2).required(),
    discount: Joi.number(),
    numberInStock: Joi.number().min().required(),
  });
  return schema.validate(product);
}
