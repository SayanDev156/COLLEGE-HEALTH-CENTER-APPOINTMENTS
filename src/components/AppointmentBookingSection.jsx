import React, { useState } from 'react';
import './AppointmentBookingSection.css';
import { bookAppointment } from '../utils/api';

const services = [
  'General Consultation',
  'Cardiology',
  'Mental Wellness',
];

const AppointmentBookingSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
  });
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    try {
      await bookAppointment(form);
      setSuccess('Appointment booked successfully!');
      setForm({ name: '', email: '', phone: '', service: '', date: '' });
    } catch (err) {
      const msg = err && err.message && err.message.includes('NetworkError')
        ? 'Server unreachable — please start the backend server and try again.'
        : `Error: ${err.message}`;
      setSuccess(msg);
    }
    setLoading(false);
  };
  return (
    <section className="appointment-booking-section" id="appointment">
      <h2 className="booking-title">Schedule Your Visit</h2>
      <form className="booking-form animated fadeInUp" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <select name="service" value={form.service} onChange={handleChange} required>
          <option value="">Select a service</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="date-picker-wrapper">
          <input
            name="date"
            type="date"
            placeholder="dd-mm-yyyy"
            value={form.date}
            onChange={handleChange}
            required
            className="date-picker-input"
            pattern="\d{2}-\d{2}-\d{4}"
          />
          <span className="calendar-icon">📅</span>
        </div>
        <button type="submit" className="booking-btn">Book Appointment</button>
        {success && <div className="booking-success">{success}</div>}
      </form>
    </section>
  );
};

export default AppointmentBookingSection;