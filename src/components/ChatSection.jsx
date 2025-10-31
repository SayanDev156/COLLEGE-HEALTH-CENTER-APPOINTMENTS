import React, { useState } from 'react';
import './ChatSection.css';

const ChatSection = () => {
  const [messages, setMessages] = useState([
    { sender: 'Support', text: 'Welcome! How can we help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { sender: 'Support', text: 'Thank you for your message! We will reply soon.' }]);
      }, 1000);
    }
  };

  return (
    <section className="chat-section" id="chat">
      <h2>Live Chat Support</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div className={`chat-message${msg.sender === 'You' ? ' user' : ''}`} key={idx}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSend}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." required />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ChatSection;
