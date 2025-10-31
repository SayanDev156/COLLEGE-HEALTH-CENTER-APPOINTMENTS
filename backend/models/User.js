import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');
