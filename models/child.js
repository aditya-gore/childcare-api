const Joi = require("joi");
const mongoose = require("mongoose");
const { districtSchema } = require("./district");

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 2,
    maxLength: 50,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
  },
  dob: {
    type: Date,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 2,
    maxLength: 50,
  },
  mother_name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 2,
    maxLength: 50,
  },
  district: {
    type: districtSchema,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Child = mongoose.model("Children", childSchema);

function validateChild(child) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    sex: Joi.string().min(1).max(10).required(),
    dob: Joi.string().min(3).max(20).required(),
    father_name: Joi.string().min(2).max(50).required(),
    mother_name: Joi.string().min(2).max(50).required(),
    district_id: Joi.objectId().required(),
    image: Joi.string().max(1024),
  };
  return Joi.validate(child, schema);
}

exports.childSchema = childSchema;
exports.Child = Child;
exports.validateChild = validateChild;
