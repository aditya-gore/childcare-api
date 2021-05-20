const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 5,
      maxLength: 50,
    },
  })
);

// Validate user request-------
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(state, schema);
}

exports.User = User;
exports.validate = validateUser;
