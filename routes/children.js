const { Child, validateChild } = require("../models/child");
const { District, validate } = require("../models/district");
const { State } = require("../models/state");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const children = await Child.find();

  if (!children)
    return res.status(404).send("No children found in the database .");

  res.send(children);
});

router.post("/", async (req, res) => {
  const { error } = validateChild(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const district = await District.findById(req.body.district_id);
  if (!district) return res.status(400).send("Invalid district id.");
  //   console.log(district);

  const searchedState = await State.findById(
    mongoose.Types.ObjectId(district.state._id)
  );
  //   console.log(searchedState);

  let child = new Child({
    district: {
      _id: district._id,
      state: {
        _id: district.state._id,
        state_name: district.state.state_name,
      },
      district_name: district.district_name,
    },
    name: req.body.name,
    sex: req.body.sex,
    dob: new Date(req.body.dob),
    father_name: req.body.father_name,
    mother_name: req.body.mother_name,
  });
  await child.save();
  res.send(child);
});

module.exports = router;
