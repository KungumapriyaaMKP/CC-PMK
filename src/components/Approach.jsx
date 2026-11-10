import React, { useState } from 'react';
import { 
  BarChart2, 
  Compass, 
  Brain, 
  TrendingUp, 
  Layers, 
  Video, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { AGENCY_INFO } from '../data/content';

const ROCKET_PILLARS = [
  {
    number: "01",
    badge: "ANALYTICAL EDGE",
    title: "Data-Driven Strategies",
    deployText: "DATA-DRIVEN STRATEGIES",
    oneLiner: "6 years of enterprise data analytics turning drop-off curves into predictable revenue growth.",
    statusText: "Algorithmic Precision Active"
  },
  {
    number: "02",
    badge: "PURPOSEFUL PLANNING",
    title: "Creativity Meets Strategy",
    deployText: "CREATIVITY MEETS STRATEGY",
    oneLiner: "Every reel, hook, and narrative is planned with a clear commercial conversion objective.",
    statusText: "Strategic Intent Aligned"
  },
  {
    number: "03",
    badge: "BEHAVIORAL SCIENCE",
    title: "Audience Psychology",
    deployText: "AUDIENCE PSYCHOLOGY",
    oneLiner: "Decoding viewer psychology to capture immediate attention and build lasting buyer trust.",
    statusText: "Curiosity Engine Calibrated"
  },
  {
    number: "04",
    badge: "AUTHENTIC REACH",
    title: "Organic Growth Focus",
    deployText: "ORGANIC GROWTH FOCUS",
    oneLiner: "Compounding authentic audience reach and distribution without relying on wasteful paid ads.",
    statusText: "Distribution Optimized"
  },
  {
    number: "05",
    badge: "FULL CYCLE",
    title: "End-to-End Production",
    deployText: "END-TO-END PRODUCTION",
    oneLiner: "Full-cycle execution from on-location companion shoots to high-retention post-production.",
    statusText: "Cinema 4K Pipeline Ready"
  },
  {
    number: "06",
    badge: "CREATOR FIRST",
    title: "Creator Experimentation",
    deployText: "CREATOR EXPERIMENTATION",
    oneLiner: "Tested and refined on personal creator channels before deploying to client accounts.",
    statusText: "Field-Tested Formats"
  }
];

function RocketItem({ pillar }) {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    // Reset the animation state after 1.5 seconds (from user spec)
    setTimeout(() => {
      setIsLaunching(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-between p-6 bg-white border border-slate-200/90 hover:border-[#0F172A] rounded-none shadow-2xs hover:shadow-md transition-all duration-300 w-full group">
      {/* Top Number & Category Tag */}
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-[#0F172A] border border-slate-300">
          {pillar.number}
        </span>
        <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          {pillar.badge}
        </span>
      </div>

      {/* The Rocket Launch Button Container */}
      <button
        type="button"
        onClick={handleLaunch}
        disabled={isLaunching}
        className="relative group/btn overflow-hidden w-full bg-[#0F172A] hover:bg-black text-white font-medium py-3.5 px-4 rounded-none transition-all duration-300 shadow-sm active:scale-95 disabled:opacity-90 disabled:scale-100 flex items-center justify-center gap-2.5 cursor-pointer"
        title="Click to deploy growth pillar"
      >
        {/* Rocket Icon Container with Launch Physics */}
        <div
          className={`transition-all duration-700 ease-in-out transform ${
            isLaunching 
              ? '-translate-y-16 translate-x-16 scale-75 opacity-0' 
              : 'group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-white drop-shadow-[0_2px_5px_rgba(255,255,255,0.3)] shrink-0"
          >
            <path d="M12.817 2.125a3 3 0 0 0-1.634 0l-3.47 1.04a.75.75 0 0 0-.513.712v3.08a5.215 5.215 0 0 0-.964.444l-2.073-.691a.75.75 0 0 0-.923.498l-.736 2.208a.75.75 0 0 0,.397.94l2.13.853c.045.419.141.826.284 1.217l-1.393 2.089a.75.75 0 0 0,.21.1l2.553.85a7.355 7.355 0 0 0 4.148 4.149l.85 2.553a.75.75 0 0 0 1.01.423l2.089-1.393c.39.143.798.24 1.217.284l.853 2.13a.75.75 0 0 0 .94.397l2.208-.736a.75.75 0 0 0 .498-.923l-.691-2.073c.176-.307.324-.63.444-.964h3.08a.75.75 0 0 0 .712-.513l1.04-3.47a3 3 0 0 0 0-1.634l-1.04-3.47a.75.75 0 0 0-.712-.513h-3.08c-.12-.333-.268-.657-.444-.964l.691-2.073a.75.75 0 0 0-.498-.923l-2.208-.736a.75.75 0 0 0-.94.397l-.853 2.13a5.215 5.215 0 0 0-1.217.284l-2.089-1.393a.75.75 0 0 0-.1-.21l-.85-2.553ZM15.75 9.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </div>

        {/* Button Text */}
        <span className="relative z-10 select-none tracking-wider font-bold text-xs uppercase truncate">
          {isLaunching ? 'DEPLOYING SYSTEM...' : pillar.deployText}
        </span>

        {/* Exhaust Particle Animation (visible on click) */}
        {isLaunching && (
          <div className="absolute left-1/4 bottom-0 flex gap-1 transform translate-y-full animate-bounce">
            <span className="w-2 h-4 bg-slate-900 rounded-full animate-ping opacity-75"></span>
            <span className="w-1.5 h-3 bg-slate-700 rounded-full animate-ping opacity-100 delay-75"></span>
            <span className="w-2 h-5 bg-slate-500 rounded-full animate-ping opacity-50 delay-150"></span>
          </div>
        )}
      </button>

      {/* Under each rocket: EXACTLY ONE LINE */}
      <p className="mt-4 text-xs font-semibold text-slate-700 text-center leading-snug">
        {pillar.oneLiner}
      </p>

      {/* Optional Status Tracking Subtext */}
      <div className="mt-3 text-[10px] font-mono text-slate-400 text-center">
        {isLaunching ? (
          <span className="text-[#0F172A] font-bold animate-pulse">Pushing strategic roadmap live...</span>
        ) : (
          <span>{pillar.statusText}</span>
        )}
      </div>
    </div>
  );
}

export default function Approach() {
  const [activeTab, setActiveTab] = useState('foundations');

  const displayedPillars = activeTab === 'foundations' 
    ? ROCKET_PILLARS.slice(0, 3) 
    : activeTab === 'engines' 
    ? ROCKET_PILLARS.slice(3, 6) 
    : ROCKET_PILLARS;

  return (
    <section id="approach" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-200">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 rounded-none text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 bg-[#0F172A] rounded-none shrink-0" />
              <span>Core Value Proposition</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
              Why Choose Me for Your Brand?
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg font-sans">
              Social media is crowded. Your brand needs more than regular posts to stand out.
            </p>
          </div>

          <div className="max-w-xs text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-none border border-slate-200 shadow-2xs">
            <span className="font-bold text-[#0F172A] block mb-1 font-mono uppercase tracking-wider">Guiding Principle:</span>
            {AGENCY_INFO.coreQuote}
          </div>
        </div>

        {/* Horizontal Navigation Pills to Switch Rocket Sets */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('foundations')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none border transition-all ${
                activeTab === 'foundations'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-[#0F172A] hover:text-[#0F172A]'
              }`}
            >
              01 - 03 Strategic Foundations
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('engines')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none border transition-all ${
                activeTab === 'engines'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-[#0F172A] hover:text-[#0F172A]'
              }`}
            >
              04 - 06 Execution Engines
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none border transition-all ${
                activeTab === 'all'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
              }`}
            >
              All (6)
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Click any rocket to deploy strategic sequence
          </div>
        </div>

        {/* Horizontal Rocket Grid (Exactly 3 Horizontally Side-by-Side on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayedPillars.map((pillar) => (
            <RocketItem key={pillar.number} pillar={pillar} />
          ))}
        </div>

        {/* Bottom Direct CTA Band */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="font-serif font-bold text-lg text-[#0F172A] uppercase tracking-[-0.01em]">
              Ready to deploy your customized brand growth system?
            </h4>
            <p className="text-xs text-slate-600 font-sans">
              Eliminate guesswork with proven data-backed content distribution frameworks.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-black text-white text-xs font-bold uppercase tracking-[0.16em] rounded-none transition-all shadow-xs shrink-0"
          >
            <span>Request Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
