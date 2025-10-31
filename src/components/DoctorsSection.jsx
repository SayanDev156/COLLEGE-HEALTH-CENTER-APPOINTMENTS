
import React from 'react';
import './DoctorsSection.css';

const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    bio: 'Expert in preventive care and internal medicine. 10+ years experience.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'Dr. Arjun Patel',
    specialty: 'Pediatrician',
    bio: 'Specializes in child health and vaccinations. Friendly and caring.',
    img: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    id: 3,
    name: 'Dr. Meera Gupta',
    specialty: 'Gynecologist',
    bio: 'Women’s health expert, compassionate and approachable.',
    img: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 4,
    name: 'Dr. Rohan Singh',
    specialty: 'Dermatologist',
    bio: 'Skin, hair, and nail specialist. Modern treatment techniques.',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 5,
    name: 'Dr. Anjali Desai',
    specialty: 'Psychiatrist',
    bio: 'Mental health and wellness expert. Supportive and understanding.',
    img: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
];

const DoctorsSection = () => {
  return (
    <section className="doctors-section">
      <h2>Our Doctors</h2>
      <div className="doctors-list">
        {doctors.map((doc, idx) => (
          <div className={`doctor-card animated fadeInUp`} style={{ animationDelay: `${0.2 + idx * 0.15}s` }} key={doc.id}>
            <img src={doc.img} alt={doc.name} className="doctor-img" />
            <h3>{doc.name}</h3>
            <p className="specialty">{doc.specialty}</p>
            <p>{doc.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsSection;
