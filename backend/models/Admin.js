import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'admins' });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema, 'admins');
