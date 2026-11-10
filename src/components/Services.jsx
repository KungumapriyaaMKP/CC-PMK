import React from 'react';
import ServiceGrid from './ui/service-grid';

// 10 Custom Curated Services for Career Compass Social
const CAREER_COMPASS_SERVICES = [
  {
    id: "management",
    name: "Social Media Management",
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Full Execution",
    serviceIndex: 0
  },
  {
    id: "growth-strategy",
    name: "Growth Strategy & Audits",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Data Roadmaps",
    serviceIndex: 1
  },
  {
    id: "content-strategy",
    name: "Content Strategy & Creation",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Viral Hooks",
    serviceIndex: 2
  },
  {
    id: "production",
    name: "Photography & Videography",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Cinema 4K",
    serviceIndex: 3
  },
  {
    id: "video-editing",
    name: "Retention Video Editing",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Viral Pacing",
    serviceIndex: 4
  },
  {
    id: "personal-branding",
    name: "Founder Personal Branding",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Authority",
    serviceIndex: 6
  },
  {
    id: "auditing-consultation",
    name: "1-on-1 Strategy Consulting",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Diagnostic",
    serviceIndex: 5
  },
  {
    id: "reels-production",
    name: "Viral Reels & Short-Form",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "1M+ Views",
    serviceIndex: 2
  },
  {
    id: "seo-optimization",
    name: "Profile Bio & SEO Structuring",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Discovery",
    serviceIndex: 1
  },
  {
    id: "paid-ads",
    name: "High-Converting Ad Creatives",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=320&auto=format&fit=crop&q=80",
    href: "#contact",
    badge: "Targeted ROI",
    serviceIndex: 0
  }
];

export default function Services({ onSelectService }) {
  const handleServiceClick = (service) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Service Grid */}
        <ServiceGrid
          title="Complete Social Media Solutions for Growing Brands"
          subtitle="From algorithmic audit to on-location shoots and high-retention post-production, we provide the full stack of modern social media infrastructure."
          services={CAREER_COMPASS_SERVICES}
          onServiceClick={handleServiceClick}
          className="py-0 md:py-0 lg:py-0"
        />

      </div>
    </section>
  );
}
