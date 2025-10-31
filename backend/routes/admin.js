import express from 'express';
import { authRequired } from '../middleware/auth.js';
import Appointment from '../models/Appointment.js';
import Feedback from '../models/Feedback.js';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';

const router = express.Router();

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

router.get('/appointments', authRequired, adminOnly, async (req, res) => {
  const list = await Appointment.find().lean().exec();
  res.json(list);
});

router.delete('/appointments/:id', authRequired, adminOnly, async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id).exec();
  res.json({ ok: true });
});

router.get('/feedback', authRequired, adminOnly, async (req, res) => {
  const list = await Feedback.find().lean().exec();
  res.json(list);
});

router.delete('/feedback/:id', authRequired, adminOnly, async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id).exec();
  res.json({ ok: true });
});

router.get('/doctors', authRequired, adminOnly, async (req, res) => {
  const list = await Doctor.find().lean().exec();
  res.json(list);
});

router.get('/services', authRequired, adminOnly, async (req, res) => {
  const list = await Service.find().lean().exec();
  res.json(list);
});

export default router;
