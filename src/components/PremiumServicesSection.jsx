import React from 'react';
import './PremiumServicesSection.css';

const services = [
  {
    title: 'General Consultation',
    description: 'Comprehensive health assessments with our expert physicians to address all your medical concerns.',
    btn: 'Book Now',
  },
  {
    title: 'Cardiology',
    description: 'Advanced cardiac care with cutting-edge diagnostics and personalized treatment plans.',
    btn: 'Book Now',
  },
  {
    title: 'Mental Wellness',
    description: 'Confidential counseling and therapy services to support your emotional and psychological well-being.',
    btn: 'Book Now',
  },
];

const PremiumServicesSection = () => (
  <section className="premium-services-section" id="services">
    <h2 className="premium-title">Our Premium Services</h2>
    <p className="premium-sub">Exceptional care tailored to your needs</p>
    <div className="premium-cards">
      {services.map((s, i) => (
        <div className="premium-card" key={s.title} style={{animationDelay: `${0.2 + i * 0.15}s`}}>
          <h3 className="premium-card-title">{s.title}</h3>
          <p className="premium-card-desc">{s.description}</p>
          <button className="premium-card-btn">{s.btn}</button>
        </div>
      ))}
    </div>
  </section>
);

export default PremiumServicesSection;