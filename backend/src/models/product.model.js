import mongoose from 'mongoose';

export default mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    brandId: mongoose.Schema.Types.ObjectId, 
    minPrice: Number,
    brand: { type: mongoose.Schema.Types.ObjectId , ref: 'Brand' }
  })
);