import React, { useState } from 'react';
import './NotificationSection.css';

const initialNotifications = [
  { id: 1, message: 'Your appointment with Dr. Smith is confirmed for tomorrow.' },
  { id: 2, message: 'Health Center will be closed on Sunday.' },
  { id: 3, message: 'New health tips added! Check the Health Tips section.' }
];

const NotificationSection = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [show, setShow] = useState(true);

  return (
    <section className={`notification-section${show ? '' : ' hide'}`} id="notifications">
      <div className="notification-header">
        <h2>Notifications</h2>
        <button className="close-btn" onClick={() => setShow(false)}>×</button>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          notifications.map((n) => (
            <div className="notification-card" key={n.id}>
              <span role="img" aria-label="bell">🔔</span> {n.message}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default NotificationSection;
