const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    brandId: mongoose.Schema.Types.ObjectId, 
  })
);

module.exports = Product;