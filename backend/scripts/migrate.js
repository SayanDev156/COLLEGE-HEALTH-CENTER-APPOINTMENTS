import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';
import Appointment from '../models/Appointment.js';
import Feedback from '../models/Feedback.js';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for migration');

  const file = path.resolve(process.cwd(), 'data', 'fallback.json');
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);

  if (data.doctors && data.doctors.length) {
    await Doctor.insertMany(data.doctors);
    console.log('Inserted doctors');
  }
  if (data.services && data.services.length) {
    await Service.insertMany(data.services);
    console.log('Inserted services');
  }
  if (data.appointments && data.appointments.length) {
    await Appointment.insertMany(data.appointments);
    console.log('Inserted appointments');
  }
  if (data.feedbacks && data.feedbacks.length) {
    await Feedback.insertMany(data.feedbacks);
    console.log('Inserted feedbacks');
  }

  console.log('Migration completed');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
