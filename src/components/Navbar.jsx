import React, { useState } from 'react';
import './Navbar.css';

const sections = [
  { name: 'Home', href: '#hero' },
  { name: 'Appointment', href: '#appointment' },
  { name: 'Services', href: '#services' },
  { name: 'Doctors', href: '#doctors' },
  { name: 'Health Tips', href: '#health-tips' },
  // Contact removed
];

// My Appointments link removed

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`navbar${open ? ' open' : ''}`}>
      <div className="navbar-brand">🏥 College Health Center</div>
      <button className="navbar-toggle" onClick={() => setOpen(!open)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links${open ? ' show' : ''}`}>
        {sections.map((sec) => (
          <li key={sec.name}>
            <a href={sec.href} onClick={() => setOpen(false)}>{sec.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
