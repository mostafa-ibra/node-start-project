import mongoose from "mongoose";

export default (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    if (req.params.id) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send("Invalid ID.");
    }
    next();
  };
};
