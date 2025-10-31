import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB:', mongoose.connection.name || '(unknown db)');
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await Admin.findOne({ email }).exec();
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ name: 'Admin', email, passwordHash: hash, role: 'admin' });
  await admin.save();
  const coll = admin.collection && admin.collection.name ? admin.collection.name : '(unknown collection)';
  console.log('Admin created:', email, 'password:', password, '-> saved to collection:', coll);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
