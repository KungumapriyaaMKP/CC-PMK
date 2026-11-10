import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import StatsCounter from './components/StatsCounter';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import DataAdvantage from './components/DataAdvantage';
import ProcessTimeline from './components/ProcessTimeline';
import GrowthCalculator from './components/GrowthCalculator';
import FAQSection from './components/FAQSection';
import ContactWithGlobe from './components/ui/contact-with-globe';
import Skiper39 from './components/ui/skiper39';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  const scrollToCalculator = () => {
    const el = document.getElementById('growth-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContactWithService = (service) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] flex flex-col font-sans selection:bg-slate-200 selection:text-[#0F172A]">
      {/* Top Fixed Navigation */}
      <Navbar onOpenAudit={scrollToCalculator} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenAudit={scrollToCalculator} />

        {/* Dedicated About Me Section (Section 02) */}
        <AboutSection />

        {/* Verified Campaign Metrics & Milestones */}
        <StatsCounter />

        {/* Comprehensive Services with Interactive Switcher */}
        <Services onSelectService={scrollToContactWithService} />

        {/* Case Studies & Client Projects (3D Circular Client Portfolio) */}
        <CaseStudies />

        {/* 6-Year Technical Data Analyst Advantage */}
        <DataAdvantage />

        {/* 7-Step Work Process Framework */}
        <ProcessTimeline />

        {/* Interactive Growth Scope Calculator */}
        <GrowthCalculator />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact with Interactive 3D Wireframe Globe */}
        <ContactWithGlobe />
      </main>

      {/* Real Audience Reach Crowd Canvas with clean white background */}
      <Skiper39 />

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Chatbot for Poojaa & Career Compass */}
      <Chatbot />
    </div>
  );
}
