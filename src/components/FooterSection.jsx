import React from 'react';
import './FooterSection.css';

const FooterSection = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <div className="footer-col">
        <h2 className="footer-title">College Health Center</h2>
        <p>Transforming campus healthcare through expert care and modern technology.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook" className="footer-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffd200"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.326-1.325-1.326z"/></svg>
          </a>
          <a href="#" aria-label="Twitter" className="footer-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffd200"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.95 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.031-.928-.088.627 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.809 2.101-6.102 2.101-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.215 7.557 2.215 9.054 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className="footer-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffd200"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07z"/><circle cx="12" cy="12" r="3.5"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="footer-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffd200"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.002 3.6 4.604v5.592z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#appointment">Book Appointment</a></li>
          <li><a href="#doctors">Our Doctors</a></li>
          <li><a href="#health-tips">Health Tips</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Resources</h3>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#chat">Live Chat</a></li>
          <li><a href="#auth">Login/Register</a></li>
          <li><a href="#features">Features</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>Contact Us</h3>
        <ul className="footer-contact">
          <li><span className="footer-contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd200"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </span> 123 Health Avenue, Medicity</li>
          <li><span className="footer-contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd200"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 22 2 16.39 2 9.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
          </span> +1 (555) 123-4567</li>
          <li><span className="footer-contact-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd200"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5v12h16V6zm-8 7l8-5H4l8 5z"/></svg>
          </span> info@collegehealthcenter.com</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; 2025 College Health Center. All rights reserved.
    </div>
  </footer>
);

export default FooterSection;