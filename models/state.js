const mongoose = require("mongoose");
const Joi = require("joi");

const stateSchema = new mongoose.Schema({
  state_name: {
    type: String,
    required: true,
    uppercase: true,
    minLength: 2,
    maxLength: 50,
  },
});

const State = mongoose.model("State", stateSchema);

// Validate state request-------
function validateState(state) {
  const schema = {
    state_name: Joi.string().min(2).required(),
  };
  return Joi.validate(state, schema);
}

exports.stateSchema = stateSchema;
exports.State = State;
exports.validate = validateState;
