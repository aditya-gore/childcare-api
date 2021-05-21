const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const states = require("./routes/states");
const districts = require("./routes/districts");
const users = require("./routes/users");
const children = require("./routes/children");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/childcare", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB."));

app.use(express.json());
app.use("/api/states", states);
app.use("/api/districts", districts);
app.use("/api/users", users);
app.use("/api/children", children);

const port = 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
