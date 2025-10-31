import React from 'react';
import './HealthTipsSection.css';

const tips = [
  {
    title: 'Stay Hydrated',
    desc: 'Drink at least 8 glasses of water daily to keep your body healthy.'
  },
  {
    title: 'Regular Exercise',
    desc: 'Engage in physical activity for at least 30 minutes every day.'
  },
  {
    title: 'Eat Nutritious Food',
    desc: 'Include fruits, vegetables, and proteins in your diet.'
  },
  {
    title: 'Get Enough Sleep',
    desc: 'Aim for 7-8 hours of sleep every night for optimal health.'
  }
];

const HealthTipsSection = () => (
  <section className="health-tips-section">
    <h2>Health Tips</h2>
    <div className="tips-list">
      {tips.map((tip, idx) => (
        <div className="tip-card" key={idx}>
          <h3>{tip.title}</h3>
          <p>{tip.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HealthTipsSection;
