import React from 'react';
import { CircularGallery } from './ui/circular-gallery';
import { Film, Sparkles, TrendingUp, Compass, MoveHorizontal } from 'lucide-react';

const HIGH_REACH_REELS = [
  {
    common: "11M Views: Dubai Real Estate",
    binomial: "Invest With Banu: Viral Peak Reel generating over 2 Crore views across 30 days.",
    badge: "11 Million Views",
    photo: {
      url: "/assets/reel-dubai.jpg",
      text: "Dubai Real Estate Viral Reel",
      pos: "center 40%",
      by: "Invest With Banu"
    }
  },
  {
    common: "7M Views: Chronic Pain Science",
    binomial: "Resilio The Pain Clinic: Patient-focused education demystifying anatomical therapy.",
    badge: "7 Million Views",
    photo: {
      url: "/assets/reel-healthcare.jpg",
      text: "Healthcare Medical Consultation Reel",
      pos: "center 30%",
      by: "Resilio The Pain Clinic"
    }
  },
  {
    common: "Luxury Space Transformation",
    binomial: "Space By KV: Architectural walkthrough driving qualified high-ticket interior inquiries.",
    badge: "High-Ticket Inbound",
    photo: {
      url: "/assets/reel-interior.jpg",
      text: "Interior Architecture Reel",
      pos: "center 50%",
      by: "Space By KV"
    }
  },
  {
    common: "4,500 Followers in 7 Days",
    binomial: "Rapid authority scaling starting from a modest base of ~6,500 followers.",
    badge: "4,500+ New Followers",
    photo: {
      url: "/assets/reel-strategy.jpg",
      text: "Data-Driven Growth Strategy",
      pos: "center 35%",
      by: "Invest With Banu"
    }
  },
  {
    common: "Modern Modesty Styling",
    binomial: "Eighteen Modesty: Emotional brand storytelling and lifestyle-first product positioning.",
    badge: "E-Commerce Growth",
    photo: {
      url: "/assets/reel-fashion.jpg",
      text: "Modest Fashion Styling Reel",
      pos: "center 25%",
      by: "Eighteen Modesty"
    }
  },
  {
    common: "On-Location Shoot Direction",
    binomial: "End-to-end shoot companion guidance, camera confidence, and hook choreography.",
    badge: "Production Studio",
    photo: {
      url: "/assets/reel-creator.jpg",
      text: "Studio Video Production Reel",
      pos: "center 45%",
      by: "Career Compass Social"
    }
  },
  {
    common: "46,500+ Community Built",
    binomial: "Resilio Clinic scaled an authentic, highly trusting patient community in ~30 reels.",
    badge: "46.5k Community",
    photo: {
      url: "/assets/poojaa-alternate.jpg",
      text: "Healthcare Practice Growth",
      pos: "center 20%",
      by: "Poojaa Muthukumar"
    }
  },
  {
    common: "Algorithmic Hook Frameworks",
    binomial: "Testing viral retention curves, audio cues, and audience drop-off diagnostics.",
    badge: "Analytics Edge",
    photo: {
      url: "/assets/poojaa-muthukumar.jpg",
      text: "Creator Dimension Reel",
      pos: "center 18%",
      by: "Poojaa Muthukumar"
    }
  }
];

export default function HighReachReels() {
  return (
    <section id="high-reach-reels" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <div className="max-w-3xl mx-auto space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-slate-700" />
            <span>Viral Campaign Archives</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            High-Reach Viral Reels Showcase
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            From 11 Million peak views in Dubai real estate to 7 Million in clinical healthcare, explore our highest performing short-form video campaigns.
          </p>

          <div className="inline-flex items-center gap-2 pt-2 text-xs font-medium text-slate-400 font-sans">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#0F172A] animate-pulse" />
            <span>Drag or scroll to rotate through the 3D reel gallery</span>
          </div>
        </div>

        {/* 3D Circular Gallery Viewport */}
        <div className="w-full h-[380px] sm:h-[430px] relative overflow-hidden my-2">
          <CircularGallery items={HIGH_REACH_REELS} radius={450} autoRotateSpeed={0.05} />
        </div>

        {/* Supporting Milestone Strip Below Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 pt-8 border-t border-slate-200 text-center">
          <div className="p-3">
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#0F172A]">11M</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-0.5 font-sans font-semibold">Single Reel Peak</div>
          </div>
          <div className="p-3">
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#0F172A]">2 Cr+</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-0.5 font-sans font-semibold">30-Day Campaign Views</div>
          </div>
          <div className="p-3">
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#0F172A]">46.5k</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-0.5 font-sans font-semibold">Patient Community Built</div>
          </div>
          <div className="p-3">
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#0F172A]">4,500+</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-0.5 font-sans font-semibold">Followers in 7 Days</div>
          </div>
        </div>

      </div>
    </section>
  );
}
