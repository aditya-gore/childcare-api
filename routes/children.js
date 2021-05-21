const { Child, validateChild } = require("../models/child");
const { District } = require("../models/district");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", async (req, res) => {
  const children = await Child.find();

  if (!children)
    return res.status(404).send("No children found in the database .");

  res.send(children);
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const { error } = validateChild(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const district = await District.findById(req.body.district_id);
  if (!district) return res.status(400).send("Invalid district id.");

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
    image: req.file.path,
  });
  await child.save();
  res.send(child);
});

module.exports = router;
