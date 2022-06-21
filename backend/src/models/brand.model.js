import mongoose from 'mongoose';

export default mongoose.model(
  "Brand",
  new mongoose.Schema({
    name: String,
  })
);