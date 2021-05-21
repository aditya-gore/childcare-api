const Joi = require("joi");
const mongoose = require("mongoose");
const { stateSchema } = require("./state");

const districtSchema = new mongoose.Schema({
  state: {
    type: stateSchema,
    required: true,
  },
  district_name: {
    type: String,
    required: true,
    uppercase: true,
    minLength: 2,
    maxLength: 50,
  },
});
const District = mongoose.model("Districts", districtSchema);

function validateDistrict(district) {
  const schema = {
    state_id: Joi.objectId().required(),
    district_name: Joi.string().min(2).max(50).required(),
  };
  return Joi.validate(district, schema);
}

exports.districtSchema = districtSchema;
exports.District = District;
exports.validate = validateDistrict;
