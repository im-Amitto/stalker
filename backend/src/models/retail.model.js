import mongoose from 'mongoose';

export default mongoose.model(
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