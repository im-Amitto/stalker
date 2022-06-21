const mongoose = require("mongoose");

const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Brand;