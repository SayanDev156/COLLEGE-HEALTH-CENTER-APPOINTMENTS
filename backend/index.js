import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Doctor from './models/Doctor.js';
import Service from './models/Service.js';
import Appointment from './models/Appointment.js';
import Feedback from './models/Feedback.js';
import User from './models/User.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

let useDb = false;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      useDb = true;
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('MongoDB connection error, falling back to in-memory:', err.message);
    });
}

const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Physician', bio: 'Expert in preventive care and internal medicine. 10+ years experience.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 2, name: 'Dr. Arjun Patel', specialty: 'Pediatrician', bio: 'Specializes in child health and vaccinations. Friendly and caring.', img: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { id: 3, name: 'Dr. Meera Gupta', specialty: 'Gynecologist', bio: 'Women’s health expert, compassionate and approachable.', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: 4, name: 'Dr. Rohan Singh', specialty: 'Dermatologist', bio: 'Skin, hair, and nail specialist. Modern treatment techniques.', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 5, name: 'Dr. Anjali Desai', specialty: 'Psychiatrist', bio: 'Mental health and wellness expert. Supportive and understanding.', img: 'https://randomuser.me/api/portraits/women/50.jpg' }
];

const services = [
  { id: 1, name: 'General Consultation', description: 'Comprehensive health assessments with our expert physicians to address all your medical concerns.' },
  { id: 2, name: 'Cardiology', description: 'Advanced cardiac care with cutting-edge diagnostics and personalized treatment plans.' },
  { id: 3, name: 'Mental Wellness', description: 'Confidential counseling and therapy services to support your emotional and psychological well-being.' }
];

app.get('/api/doctors', async (req, res) => {
  if (useDb) {
    const list = await Doctor.find().lean().exec();
    return res.json(list);
  }
  res.json(doctors);
});

app.post('/api/register', async (req, res) => {
  const { name, email, password, role, adminKey } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (!useDb) return res.status(503).json({ message: 'Database not available' });
  
  try {
    if (role === 'admin') {
      const serverKey = process.env.ADMIN_CREATION_KEY;
      if (!serverKey) return res.status(500).json({ message: 'Admin registration not configured on server' });
      if (!adminKey || adminKey !== serverKey) return res.status(403).json({ message: 'Invalid admin creation key' });
      
      const existingAdmin = await Admin.findOne({ email }).exec();
      if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });
      
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) return res.status(400).json({ message: 'Email already registered as user' });
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const admin = new Admin({ name, email, passwordHash: hash });
      await admin.save();
      return res.status(201).json({ id: admin._id, email: admin.email, name: admin.name, role: 'admin' });
    }
    
    const existing = await User.findOne({ email }).exec();
    if (existing) return res.status(400).json({ message: 'User already exists' });
    
    const existingAdmin = await Admin.findOne({ email }).exec();
    if (existingAdmin) return res.status(400).json({ message: 'Email already registered as admin' });
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, passwordHash: hash });
    await user.save();
    return res.status(201).json({ id: user._id, email: user.email, name: user.name, role: 'user' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const roleHint = req.body && req.body.role ? req.body.role : null;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  if (!useDb) return res.status(503).json({ message: 'Database not available' });
  
  try {
    let actor = null;
    let actorType = null;
    
    if (roleHint === 'admin') {
      actor = await Admin.findOne({ email }).exec();
      actorType = 'admin';
      if (!actor) return res.status(400).json({ message: 'Invalid admin credentials' });
    } else if (roleHint === 'user') {
      actor = await User.findOne({ email }).exec();
      actorType = 'user';
      if (!actor) return res.status(400).json({ message: 'Invalid user credentials' });
    } else {
      actor = await User.findOne({ email }).exec();
      actorType = 'user';
      if (!actor) {
        actor = await Admin.findOne({ email }).exec();
        actorType = 'admin';
      }
      if (!actor) return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const ok = await bcrypt.compare(password, actor.passwordHash || '');
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign(
      { id: actor._id, email: actor.email, role: actorType }, 
      process.env.JWT_SECRET || 'change_this_secret', 
      { expiresIn: '7d' }
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/api/services', async (req, res) => {
  if (useDb) {
    const list = await Service.find().lean().exec();
    return res.json(list);
  }
  res.json(services);
});

app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, service, date } = req.body;
  if (useDb) {
    try {
      const apptData = { name, email, phone, service, date };
      const auth = req.headers.authorization;
      if (auth) {
        try {
          const token = auth.split(' ')[1];
          const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
          if (payload && payload.id) apptData.user = payload.id;
        } catch (e) {}
      }
      const appt = new Appointment(apptData);
      await appt.save();
      return res.status(201).json(appt);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  if (!global.__appointments) global.__appointments = [];
  const appointments = global.__appointments;
  const newAppointment = { id: appointments.length + 1, name, email, phone, service, date };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

app.get('/api/appointments', async (req, res) => {
  if (useDb) {
    try {
      const auth = req.headers.authorization;
      if (auth) {
        try {
          const token = auth.split(' ')[1];
          const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
          if (payload && payload.role === 'admin') {
            const list = await Appointment.find().lean().exec();
            return res.json(list);
          }
          if (payload && payload.id) {
            const list = await Appointment.find({ user: payload.id }).lean().exec();
            return res.json(list);
          }
        } catch (e) {}
      }
      // public: return all appointments (or consider empty list)
      const list = await Appointment.find().lean().exec();
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  res.json(global.__appointments || []);
});

app.post('/api/feedback', async (req, res) => {
  const { name, message } = req.body;
  if (useDb) {
    try {
      const f = new Feedback({ name, message });
      await f.save();
      return res.status(201).json(f);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  if (!global.__feedbacks) global.__feedbacks = [];
  const feedbacks = global.__feedbacks;
  const newFeedback = { id: feedbacks.length + 1, name, message };
  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

app.get('/api/feedback', async (req, res) => {
  if (useDb) {
    const list = await Feedback.find().lean().exec();
    return res.json(list);
  }
  res.json(global.__feedbacks || []);
});

app.get('/', (req, res) => {
  res.send('College Health Center Backend Running');
});

app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
