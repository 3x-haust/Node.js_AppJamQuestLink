import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  image: { type: String },
  schoolName: { type: String },
  points: { type: Number, default: 0 },
  questsInProgress: { type: [String], default: [] },
  questsCompleted: { type: [String], default: [] },
  friends: { type: [Number], default: [] },
});

export default mongoose.model('User', userSchema);
