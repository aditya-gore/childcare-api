const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
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
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    maxLength: 1024,
  },
  organization: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
  designation: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

// Validate user request-------
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    organization: Joi.string().min(3).max(50).required(),
    designation: Joi.string().min(3).max(50).required(),
  };
  return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
