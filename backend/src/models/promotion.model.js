import mongoose from 'mongoose';

export default mongoose.model(
  "Promotions",
  new mongoose.Schema({
    title: String,
    subtext: String
  })
);