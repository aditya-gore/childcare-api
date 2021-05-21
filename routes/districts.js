const { District, validate } = require("../models/district");
const { State } = require("../models/state");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const searchedState = await State.findById(
    mongoose.Types.ObjectId(req.body.state_id)
  );
  if (!searchedState) return res.status(400).send("Invalid state id.");

  const districts = await District.find({
    state: {
      _id: searchedState._id,
      state_name: searchedState.state_name,
    },
  }).select({ _id: 1, district_name: 1 });

  if (!districts)
    return res.status(404).send("No districts found in the given state id .");

  res.send(districts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const state = await State.findById(req.body.state_id);
  if (!state) return res.status(400).send("Invalid state id.");

  let district = new District({
    state: {
      _id: state._id,
      state_name: state.state_name,
    },
    district_name: req.body.district_name,
  });
  await district.save();
  res.send(district);
});

module.exports = router;
