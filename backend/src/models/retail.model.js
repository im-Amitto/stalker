const mongoose = require("mongoose");

const Retail = mongoose.model(
  "Retail",
  new mongoose.Schema({
    name: String,
    inventory: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        promotionId: mongoose.Schema.Types.ObjectId,
        qty: Number,
      }
    ]
  })
);

module.exports = Retail;