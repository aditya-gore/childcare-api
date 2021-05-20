const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

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

router.get("/", async (req, res) => {
  const states = await State.find().sort("state_name");
  res.send(states);
});

router.post("/", async (req, res) => {
  const { error } = validateState(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let state = new State({
    state_name: req.body.name,
  });
  state = await state.save();
  res.send(state);
});

router.put("/:state_id", async (req, res) => {
  const { error } = validateState(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const state = await State.findByIdAndUpdate(
    req.params.state_id,
    { state_name: req.body.name },
    {
      new: true,
    }
  );

  if (!state)
    return res.status(404).send("The state with the given id does not exist.");
  res.send(state);
});

router.delete("/:state_id", async (req, res) => {
  const state = await State.findByIdAndRemove(req.params.state_id);

  if (!state) return res.status(404).send("State with the given id not found.");

  res.send(state);
});

router.get("/:state_id", async (req, res) => {
  const state = await State.findById(req.params.state_id);

  if (!state) return res.status(404).send("State with the given id not found.");

  res.send(state);
});

// Validate state request-------
function validateState(state) {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  return Joi.validate(state, schema);
}

module.exports = router;
