import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  quest: { type: Object, required: true },
});

const model = mongoose.model('Quest', questSchema);

export default model;
