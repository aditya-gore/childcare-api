const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const states = require("./routes/states");
const districts = require("./routes/districts");
const children = require("./routes/children");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

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
app.use("/api/children", children);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
