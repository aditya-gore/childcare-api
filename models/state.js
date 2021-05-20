const mongoose = require("mongoose");
const Joi = require("joi");

const State = mongoose.model(
  "State",
  new mongoose.Schema({
    state_name: {
      type: String,
      required: true,
      uppercase: true,
      minLength: 2,
      maxLength: 50,
    },
  })
);

// Validate state request-------
function validateState(state) {
  const schema = {
    state_name: Joi.string().min(2).required(),
  };
  return Joi.validate(state, schema);
}

exports.State = State;
exports.validate = validateState;
