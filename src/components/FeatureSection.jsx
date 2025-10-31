import React from 'react';
import './FeatureSection.css';

const features = [
  {
    icon: '🗓️',
    title: 'Easy Booking',
    desc: 'Book appointments in seconds with a simple, intuitive interface.'
  },
  {
    icon: '🔒',
    title: 'Secure Data',
    desc: 'Your health information is protected with top security.'
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    desc: 'Access the health center from any device, anywhere.'
  },
  {
    icon: '⚡',
    title: 'Fast Support',
    desc: 'Get instant help and answers from our support team.'
  },
  {
    icon: '🌟',
    title: 'Luxurious Design',
    desc: 'Enjoy a vibrant, beautiful, and modern user experience.'
  }
];

const FeatureSection = () => (
  <section className="feature-section" id="features">
    <h2>Why Choose Us?</h2>
    <div className="feature-list">
      {features.map((f, idx) => (
        <div className="feature-card" key={idx}>
          <span className="feature-icon">{f.icon}</span>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureSection;
