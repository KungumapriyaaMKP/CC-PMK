import React from 'react';
import { 
  ArrowRight, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from './BrandIcons';
import { AGENCY_INFO } from '../data/content';
import {
  FloatingIconsWrapper,
  IconInstagram,
  IconYouTube,
  IconLinkedIn,
  IconFigma,
  IconX,
  IconSpotify
} from './ui/floating-icons-hero-section';

// Platform icons positioning exactly matching the reference showcase in image 3 with responsive mobile offsets
const ABOUT_FLOATING_ICONS = [
  { id: 1, icon: IconInstagram, className: '-top-4 -left-2 sm:-top-6 sm:-left-6', label: 'Instagram & Reels Growth' },
  { id: 2, icon: IconYouTube, className: '-top-4 -right-2 sm:-top-6 sm:-right-6', label: 'YouTube Video Strategy' },
  { id: 3, icon: IconX, className: 'top-[110px] -left-3 sm:-left-8', label: 'Brand Narrative & Reach' },
  { id: 4, icon: IconFigma, className: 'top-[140px] -right-3 sm:-right-8', label: 'Creative Content Direction' },
  { id: 5, icon: IconLinkedIn, className: 'top-[220px] -left-3 sm:-left-8', label: 'LinkedIn Personal Branding' },
  { id: 6, icon: IconSpotify, className: 'top-[260px] -right-3 sm:-right-8', label: 'Podcasts & Multi-Platform Audio' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 rounded-none text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 bg-[#0F172A] rounded-none shrink-0" />
            <span>About The Strategist</span>
          </div>
        </div>

        {/* Section Header */}
        <h2 className="text-center font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase mb-4">
          The Creative Mind Behind the Strategy
        </h2>

        <p className="text-center font-sans text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-14">
          I am passionate about understanding what makes people stop scrolling, connect with a brand, and eventually become its customers.
        </p>

        {/* Side-by-Side: The Exact 3rd One Design Card on Left + Editorial Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: The EXACT Card from Image 3 with Floating Repelling Platform Icons */}
          <div className="lg:col-span-5 relative flex justify-center py-6 px-4">
            <FloatingIconsWrapper icons={ABOUT_FLOATING_ICONS} className="w-full max-w-[350px] sm:max-w-[375px]">
              
              {/* Soft Ambient Halo */}
              <div className="absolute inset-0 bg-slate-100/40 rounded-none filter blur-xl -z-10" />

              {/* Main Card Container with Sharp Border */}
              <div className="rounded-none bg-white shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-[#0F172A]">
                
                {/* Portrait Image Portal */}
                <div className="relative overflow-hidden aspect-[4/4.8] w-full bg-slate-100 max-h-[350px] sm:max-h-[375px]">
                  <img
                    src="/assets/poojaa-muthukumar.jpg"
                    alt="Poojaa Muthukumar: Founder and Social Media Growth Strategist"
                    className="w-full h-full object-cover object-[center_16%]" loading="lazy" decoding="async"
                  />
                  
                  {/* Top-Right Brand Logo Tag */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-none bg-white/95 backdrop-blur-md p-1 shadow-sm border border-slate-900/40 flex items-center justify-center">
                      <img 
                        src="/assets/logo.jpg" 
                        alt="Career Compass" 
                        className="w-full h-full object-contain" loading="lazy" decoding="async"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Card Metadata & Metrics Panel */}
                <div className="p-4 sm:p-5 space-y-3 bg-white">
                  
                  {/* Name and Role */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div>
                      <h3 className="font-sans font-black text-xl sm:text-[22px] text-[#0F172A] tracking-tight leading-snug">
                        Poojaa Muthukumar
                      </h3>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-600 tracking-wide mt-0.5">
                        Founder: Career Compass Social | Growth Strategist
                      </p>
                    </div>

                    <a
                      href={AGENCY_INFO.personalInstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-none text-[10.5px] font-mono font-bold text-slate-700 bg-slate-50 hover:bg-[#0F172A] hover:text-white transition-colors shrink-0 border border-slate-300 hover:border-[#0F172A]"
                    >
                      <span>@{AGENCY_INFO.personalInstagram}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {/* Three-Column Milestone Row */}
                  <div className="grid grid-cols-3 gap-1 pt-2.5 border-t border-slate-200 text-center divide-x divide-slate-100">
                    <div className="px-1">
                      <div className="font-sans font-black text-base sm:text-lg text-[#0F172A] leading-tight">
                        2 Cr+
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 font-mono">
                        Views
                      </div>
                    </div>

                    <div className="px-1">
                      <div className="font-sans font-black text-base sm:text-lg text-[#0F172A] leading-tight">
                        11M
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 font-mono">
                        Peak Reel
                      </div>
                    </div>

                    <div className="px-1">
                      <div className="font-sans font-black text-base sm:text-lg text-[#0F172A] leading-tight">
                        6 Yrs
                      </div>
                      <div className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 font-mono">
                        Analytics
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </FloatingIconsWrapper>
          </div>

          {/* Right Column: Editorial Narrative & Action Handshake */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Hairline Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#0F172A] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]">
                  FOUNDER & LEAD STRATEGIST
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                <span>Chennai, India</span>
                <span>|</span>
                <span className="text-[#0F172A] font-bold">Serving Clients Globally</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Executive Background
              </span>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F172A] tracking-[-0.01em] uppercase leading-tight">
                Data-Driven Systems Engineered for Commercial Scale
              </h3>

              <p className="text-base text-slate-700 leading-relaxed font-sans">
                I'm a Social Media Growth Strategist, Content Creator, Data Analyst with 6 years of professional enterprise experience, and Founder of <span className="font-bold text-[#0F172A] border-b border-[#0F172A]">Career Compass Social</span>.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                I combine creativity, audience psychology, and data-driven insights to engineer social content that does not just look good, but serves a clear commercial business purpose.
              </p>
            </div>

            {/* Three Core Directives */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 bg-slate-50 border border-slate-200 text-left">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500">01</div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">Do not just post. Position.</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 text-left">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500">02</div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">Do not just chase views. Build trust.</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 text-left">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500">03</div>
                <div className="text-xs font-bold text-[#0F172A] mt-0.5">Do not just follow trends. Build a brand.</div>
              </div>
            </div>

            {/* Action Handshake Row */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <a
                href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to consult with you on social media growth.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded-none transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start A Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={AGENCY_INFO.personalInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border border-slate-300 hover:border-[#0F172A] bg-white hover:bg-slate-50 transition-all flex items-center justify-center shadow-2xs hover:shadow-xs group"
                  title="Instagram Profile"
                >
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={AGENCY_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border border-slate-300 hover:border-[#0F172A] bg-white hover:bg-slate-50 transition-all flex items-center justify-center shadow-2xs hover:shadow-xs group"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}