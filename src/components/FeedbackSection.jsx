import React, { useEffect, useState } from 'react';
import './FeedbackSection.css';
import { getFeedbacks, postFeedback, pingBackend } from '../utils/api';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    getFeedbacks()
      .then(list => {
        if (mounted) setFeedbacks(Array.isArray(list) ? list : []);
      })
      .catch(err => {
        if (mounted) setError(err.message || 'Could not load feedbacks');
      });
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const created = await postFeedback(form);
      setFeedbacks(prev => [...prev, created || form]);
      setSuccess('Thank you for your feedback!');
      setForm({ name: '', message: '' });
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    }
  };

  const handleRetry = async () => {
    setError('');
    try {
      await pingBackend();
      const list = await getFeedbacks();
      setFeedbacks(Array.isArray(list) ? list : []);
      setError('');
    } catch (err) {
      setError(err.message || 'Backend still unreachable');
    }
  };

  return (
    <section className="feedback-section" id="feedback">
      <h2>Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Feedback" rows="3" value={form.message} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {success && <p style={{ color: '#009e60', fontWeight: 600, marginTop: '1rem' }}>{success}</p>}
      {error && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: '#d9534f', fontWeight: 600 }}>{error}</p>
          <button onClick={handleRetry} style={{ marginTop: '0.75rem', padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2575fc', color: '#fff', cursor: 'pointer' }}>Retry</button>
        </div>
      )}
      <div className="feedback-list">
        {feedbacks.map((f) => (
          <div className="feedback-card" key={f._id || f.id || Math.random()}>
            <strong>{f.name}:</strong> {f.message}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
