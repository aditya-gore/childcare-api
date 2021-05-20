const mongoose = require("mongoose");
const states = require("./routes/states");
const users = require("./routes/users");
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
app.use("/api/users", users);

const port = 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
