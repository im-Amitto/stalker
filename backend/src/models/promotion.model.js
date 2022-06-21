const mongoose = require("mongoose");

const Promotions = mongoose.model(
  "Promotions",
  new mongoose.Schema({
    title: String,
    subtext: String,
    addedBy: mongoose.Schema.Types.ObjectId,
  })
);

module.exports = Promotions;