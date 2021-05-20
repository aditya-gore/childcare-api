const express = require("express");
const router = express.Router();

const states = [
  { state_id: 1, name: "Madhya Pradesh" },
  { state_id: 2, name: "Uttar Pradesh" },
  { state_id: 3, name: "Himachal Pradesh" },
  { state_id: 4, name: "Andhra Pradesh" },
];

router.get("/", (req, res) => {
  res.send(states);
});

router.get("/:state_id", (req, res) => {
  const state = states.find(
    (s) => s.state_id === parseInt(req.params.state_id)
  );
  if (!state) return res.status(404).send("State with the given id not found.");
  res.send(state);
});

router.post("/", (req, res) => {
  const { error } = validateState(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const state = {
    id: states.length + 1,
    name: req.body.name,
  };
  states.push(state);
  res.send(state);
});

router.put("/:state_id", (req, res) => {
  const state = states.find(
    (s) => s.state_id === parseInt(req.params.state_id)
  );
  if (!state) return res.status(404).send(error.details[0].message);
  state.name = req.body.name;
  res.send(state);
});

router.delete("/:state_id", (req, res) => {
  const state = states.find(
    (s) => s.state_id === parseInt(req.params.state_id)
  );
  if (!state) return res.status(404).send("State with the given id not found.");
  const index = states.indexOf(state);
  states.splice(index, 1);
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
