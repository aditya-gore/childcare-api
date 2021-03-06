const auth = require("../middleware/auth");
const express = require("express");
const { State, validate } = require("../models/state");
const router = express.Router();

router.get("/", async (req, res) => {
  const states = await State.find().sort("state_name");
  res.send(states);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let state = new State({
    state_name: req.body.state_name,
  });
  state = await state.save();
  res.send(state);
});

router.put("/:state_id", async (req, res) => {
  const { error } = validate(req.body);
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

router.delete("/:state_id", auth, async (req, res) => {
  const state = await State.findByIdAndRemove(req.params.state_id);

  if (!state) return res.status(404).send("State with the given id not found.");

  res.send(state);
});

router.get("/:state_id", async (req, res) => {
  const state = await State.findById(req.params.state_id);

  if (!state) return res.status(404).send("State with the given id not found.");

  res.send(state);
});

module.exports = router;
