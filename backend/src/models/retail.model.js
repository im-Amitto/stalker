import mongoose from 'mongoose';

export default mongoose.model(
  "Retail",
  new mongoose.Schema({
    name: String,
    inventory: [
      {
        product: { type: mongoose.Schema.Types.ObjectId , ref: 'Product' },
        promotion: { type: mongoose.Schema.Types.ObjectId , ref: 'Promotion' },
        qty: Number,
        price: Number,
      }
    ]
  })
);