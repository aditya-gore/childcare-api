const Joi = require("joi");
const states = require("./routes/states");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/states", states);

const port = 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
