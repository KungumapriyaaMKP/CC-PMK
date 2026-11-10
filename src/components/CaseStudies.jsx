import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircularGallery } from './ui/circular-gallery';
import { 
  Building2, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  MoveHorizontal,
  Compass,
  Flame,
  Eye,
  Users,
  Zap
} from 'lucide-react';
import { CASE_STUDIES } from '../data/content';
import CaseStudyModal from './CaseStudyModal';

const VERIFIED_MILESTONES = [
  {
    number: "11M",
    label: "Single Reel Peak",
    icon: Flame,
  },
  {
    number: "2 Cr+",
    label: "30-Day Campaign Views",
    icon: Eye,
  },
  {
    number: "46.5k",
    label: "Patient Community Built",
    icon: Users,
  },
  {
    number: "4,500+",
    label: "Followers in 7 Days",
    icon: Zap,
  }
];

// The 6 exact client Instagram reels provided by user
const CLIENT_PORTFOLIO_ITEMS = [
  {
    id: "invest-with-banu",
    common: "Invest With Banu",
    binomial: "Dubai Real Estate: Demystified offshore property investment with 2 Crore+ views across 30 days.",
    badge: "2 Crore+ Views",
    statusTag: "Client Work 01",
    category: "Real Estate",
    reelId: "Dd6dUTWTJ-V",
    reelUrl: "https://www.instagram.com/reel/Dd6dUTWTJ-V/?xtok=MXhha3Z4dGxheHlteQ==",
    photo: {
      url: "/assets/reel-dubai.jpg",
      text: "Invest With Banu Dubai Real Estate",
      pos: "center 40%",
      by: "Dubai Real Estate"
    }
  },
  {
    id: "resilio-pain-clinic",
    common: "Resilio The Pain Clinic",
    binomial: "Healthcare & Medicine: Built 46,500+ patient community with 7M views on clinical education.",
    badge: "46.5k Community",
    statusTag: "Client Work 02",
    category: "Healthcare",
    reelId: "DdMAXLhyh2z",
    reelUrl: "https://www.instagram.com/reel/DdMAXLhyh2z/?dlrf=MTVtYXY2NHh3NGFhMg==",
    photo: {
      url: "/assets/reel-healthcare.jpg",
      text: "Resilio Pain Clinic Healthcare",
      pos: "center 30%",
      by: "Healthcare & Medicine"
    }
  },
  {
    id: "eighteen-modesty",
    common: "Eighteen Modesty",
    binomial: "Fashion & Lifestyle: Modern modest wear brand storytelling and aesthetic product positioning.",
    badge: "Modest Fashion",
    statusTag: "Client Work 03",
    category: "Fashion & Lifestyle",
    reelId: "DdJdnOqyC7w",
    reelUrl: "https://www.instagram.com/reel/DdJdnOqyC7w/?dlrf=eGNuZW51ZXJrZzc1",
    photo: {
      url: "/assets/reel-fashion.jpg",
      text: "Eighteen Modesty Fashion",
      pos: "center 25%",
      by: "Fashion & E-Commerce"
    }
  },
  {
    id: "space-by-kv",
    common: "Space By KV",
    binomial: "Interior & Architecture: Architectural walkthroughs driving qualified high-ticket interior inquiries.",
    badge: "High-Ticket Inbound",
    statusTag: "Client Work 04",
    category: "Interior Design",
    reelId: "DdluK97z2PV",
    reelUrl: "https://www.instagram.com/reel/DdluK97z2PV/?rpxt=MTF5bWIyMmg3eTQ5bg==",
    photo: {
      url: "/assets/reel-interior.jpg",
      text: "Space By KV Architecture",
      pos: "center 50%",
      by: "Interior Architecture"
    }
  },
  {
    id: "founder-branding",
    common: "Executive Personal Brands",
    binomial: "Founders & Leadership: Translating deep founder expertise into category dominance and organic trust.",
    badge: "Thought Leadership",
    statusTag: "Client Vertical",
    category: "Personal Branding",
    reelId: "DdEOVvnz0Bm",
    reelUrl: "https://www.instagram.com/reel/DdEOVvnz0Bm/?xtok=Z3luOWJhaXlscjNm",
    photo: {
      url: "/assets/reel-strategy.jpg",
      text: "Executive Personal Branding",
      pos: "center 35%",
      by: "Founder Profiles"
    }
  },
  {
    id: "production-studio",
    common: "Viral Reel Architecture",
    binomial: "Creative Direction: 3-second hook structure, shoot companion coaching, and viral post-production.",
    badge: "11M Peak Reel",
    statusTag: "Studio Production",
    category: "Video Production",
    reelId: "Dd6dUTWTJ-V",
    reelUrl: "https://www.instagram.com/reel/Dd6dUTWTJ-V/?xtok=MXhha3Z4dGxheHlteQ==",
    photo: {
      url: "/assets/reel-creator.jpg",
      text: "Viral Reel Architecture",
      pos: "center 45%",
      by: "Chennai & Dubai"
    }
  }
];

// Additional rich project data for items not in the initial CASE_STUDIES array
const EXTENDED_PROJECTS = {
  "founder-branding": {
    id: "founder-branding",
    title: "Executive Personal Brands",
    subtitle: "Founders | CEOs | Industry Consultants",
    category: "Personal Branding",
    role: "Strategic Executive Positioning & Narrative Architecture",
    heroImage: "/assets/reel-strategy.jpg",
    reelId: "DdEOVvnz0Bm",
    reelUrl: "https://www.instagram.com/reel/DdEOVvnz0Bm/?xtok=Z3luOWJhaXlscjNm",
    clientQuote: "Transforming technical leadership knowledge into magnetic, organic category authority that attracts enterprise partners and investors.",
    overview: "Founders frequently struggle to articulate their deep industry expertise in accessible short-form video. We structure executive thought leadership frameworks that highlight authentic insights without corporate vanity.",
    responsibilities: [
      "Founder narrative mapping and thought leadership pillars",
      "Translating complex engineering and business ideas into viral hooks",
      "Camera delivery direction and teleprompter-free coaching",
      "Executive profile SEO and LinkedIn-to-Instagram cross-pollination",
      "Weekly analytics reporting tracking inbound partnership inquiries"
    ],
    metrics: [
      { label: "Positioning", value: "Category Leader" },
      { label: "Inbound Deal Flow", value: "High-Ticket" },
      { label: "Content Cadence", value: "Consistent & Purposeful" }
    ],
    deliverables: ["Executive Narrative Roadmap", "Hook Architecture", "On-Camera Direction", "Strategic Authority"],
    takeaway: "True personal branding is not self-promotion: it is about broadcasting genuine domain value so clients perceive you as the natural solution."
  },
  "production-studio": {
    id: "production-studio",
    title: "On-Location Studio Video Production",
    subtitle: "Shoot Companion | Camera Coaching | High-Definition Production",
    category: "Video Production",
    role: "End-to-End Creative Direction & Production Studio",
    heroImage: "/assets/reel-creator.jpg",
    reelId: "Dd6dUTWTJ-V",
    reelUrl: "https://www.instagram.com/reel/Dd6dUTWTJ-V/?xtok=MXhha3Z4dGxheHlteQ==",
    clientQuote: "On-location creative direction that eliminates camera anxiety and turns everyday spaces into cinematic commercial assets.",
    overview: "For clients in Chennai, Dubai, and select travel locations, we provide complete on-ground shoot companionship: handling lighting, audio, styling, and real-time coaching so on-camera delivery feels natural and charismatic.",
    responsibilities: [
      "On-location physical shoot companion and staging",
      "Direct on-camera delivery coaching and pacing guidance",
      "Multi-angle 4K video recording and studio audio capture",
      "Kinetic vertical editing, pacing, and color grading",
      "Sound design, sound effects, and branded visual cues"
    ],
    metrics: [
      { label: "Locations", value: "Chennai & Dubai" },
      { label: "Camera Confidence", value: "100% Authentic" },
      { label: "Format", value: "Cinematic Vertical" }
    ],
    deliverables: ["On-Location Production", "Shoot Companion Coaching", "Kinetic Post-Production", "Viral Audio Design"],
    takeaway: "High production value creates an immediate subconscious trust signal that allows brands to charge premium rates."
  }
};

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleItemClick = (item) => {
    const baseProject = CASE_STUDIES.find(p => p.id === item.id) || EXTENDED_PROJECTS[item.id] || {};
    setSelectedProject({
      ...baseProject,
      ...item,
      title: baseProject.title || item.common,
      subtitle: baseProject.subtitle || item.binomial,
      category: baseProject.category || item.category,
      reelId: item.reelId || baseProject.reelId,
      reelUrl: item.reelUrl || baseProject.reelUrl,
      metrics: baseProject.metrics || [
        { label: "Channel", value: "Instagram Reel" },
        { label: "Status", value: "Documented Growth" }
      ],
      responsibilities: baseProject.responsibilities || [
        "Content Ideation & Scripting",
        "Algorithmic Hook Positioning",
        "Post-Production & Engagement Architecture"
      ],
      overview: baseProject.overview || item.binomial,
      clientQuote: baseProject.clientQuote || "Structured storytelling engineered for repeatable organic conversion."
    });
  };

  return (
    <section id="case-studies" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-3 mb-8">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
            Brands I've Worked With. Growth Stories I've Helped Create.
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Every brand has a different story, audience, and objective. Explore the high-impact client partnerships and data-driven growth results we've engineered.
          </p>

          <div className="inline-flex items-center gap-2 pt-2 text-xs font-medium text-slate-500 font-sans">
            <MoveHorizontal className="w-3.5 h-3.5 text-slate-700 animate-pulse" />
            <span>Drag or scroll to rotate client portfolio | Click any card to explore their work</span>
          </div>
        </div>

        {/* 3D Circular Client Portfolio Gallery with Embedded Instagram Reels */}
        <div className="w-full h-[450px] sm:h-[500px] relative overflow-hidden my-4">
          <CircularGallery 
            items={CLIENT_PORTFOLIO_ITEMS} 
            radius={320} 
            autoRotateSpeed={0.12} 
            onItemClick={handleItemClick}
          />
        </div>

        {/* Supporting Verified Milestone Strip Below Gallery with Interactive Hover Animations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200">
          {VERIFIED_MILESTONES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative p-4 sm:p-5 rounded-none border border-slate-200 bg-white hover:border-[#0F172A] hover:bg-slate-50/70 shadow-2xs hover:shadow-xl transition-all duration-300 text-center cursor-pointer overflow-hidden flex flex-col items-center justify-between min-h-[130px]"
              >
                {/* Top Radiant Glowing Line */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0F172A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(15,23,42,0.5)]" />

                {/* Subtle Ambient Particle Glow on Hover */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-slate-200/40 rounded-full blur-xl group-hover:scale-150 transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-slate-200/30 rounded-full blur-xl group-hover:scale-150 transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />

                {/* Micro Icon Badge with Hover Animation */}
                <div className="w-8 h-8 rounded-none border border-slate-200 group-hover:border-[#0F172A] bg-slate-50 group-hover:bg-[#0F172A] p-1.5 flex items-center justify-center text-slate-600 group-hover:text-white transition-all duration-300 shadow-2xs mb-2">
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* High-Impact Stat Number */}
                <div className="font-sans font-black text-2xl sm:text-3xl text-[#0F172A] tracking-tight group-hover:scale-105 transition-transform duration-300 leading-none">
                  {item.number}
                </div>

                {/* Label */}
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 group-hover:text-[#0F172A] font-mono font-bold mt-2.5 transition-colors">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal Detail View */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
