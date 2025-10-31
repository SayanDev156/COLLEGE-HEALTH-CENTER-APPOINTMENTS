import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college_health';

const doctors = [
  { name: 'Dr. Priya Sharma', specialty: 'General Physician', bio: 'Expert in preventive care and internal medicine. 10+ years experience.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Dr. Arjun Patel', specialty: 'Pediatrician', bio: 'Specializes in child health and vaccinations. Friendly and caring.', img: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Dr. Meera Gupta', specialty: 'Gynecologist', bio: 'Women’s health expert, compassionate and approachable.', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Dr. Rohan Singh', specialty: 'Dermatologist', bio: 'Skin, hair, and nail specialist. Modern treatment techniques.', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { name: 'Dr. Anjali Desai', specialty: 'Psychiatrist', bio: 'Mental health and wellness expert. Supportive and understanding.', img: 'https://randomuser.me/api/portraits/women/50.jpg' }
];

const services = [
  { name: 'General Consultation', description: 'Comprehensive health assessments with our expert physicians to address all your medical concerns.' },
  { name: 'Cardiology', description: 'Advanced cardiac care with cutting-edge diagnostics and personalized treatment plans.' },
  { name: 'Mental Wellness', description: 'Confidential counseling and therapy services to support your emotional and psychological well-being.' }
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  await Doctor.deleteMany({});
  await Service.deleteMany({});

  await Doctor.insertMany(doctors);
  await Service.insertMany(services);

  console.log('Seed completed');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
