import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Footer from './components/Footer';
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Header />
      <HeroSection />
      <Services />
      <Footer />
  </div>
  );
};

export default LandingPage;
