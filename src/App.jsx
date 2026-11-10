import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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
  // Initialize Lenis physics-based smooth inertia scrolling animation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Smoothly animate all hash navigation clicks with physics easing
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -70, duration: 1.3 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  const scrollToCalculator = () => {
    const el = document.getElementById('growth-calculator');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70, duration: 1.3 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContactWithService = (service) => {
    const el = document.getElementById('contact');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70, duration: 1.3 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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
