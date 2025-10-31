import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BackendStatus from './components/BackendStatus';
import FeatureSection from './components/FeatureSection';
import NotificationSection from './components/NotificationSection';
import PremiumServicesSection from './components/PremiumServicesSection';
import FooterSection from './components/FooterSection';
import AppointmentBookingSection from './components/AppointmentBookingSection';
import FeedbackSection from './components/FeedbackSection';
import ChatSection from './components/ChatSection';
import HeroSection from './components/HeroSection';
import DoctorsSection from './components/DoctorsSection';
import HealthTipsSection from './components/HealthTipsSection';
import AuthSection from './components/AuthSection';

function App() {
  return (
    <>
      <Navbar />
      <BackendStatus />
      <div id="hero">
        <HeroSection />
        <AuthSection />
      </div>
      <NotificationSection />
      <FeatureSection />
      <PremiumServicesSection />
      <AppointmentBookingSection />
      <div id="doctors">
        <DoctorsSection />
      </div>
      <div id="health-tips">
        <HealthTipsSection />
      </div>
      <div id="feedback">
        <FeedbackSection />
      </div>
      <div id="chat">
        <ChatSection />
      </div>
      <FooterSection />
    </>
  );
}
export default App;
