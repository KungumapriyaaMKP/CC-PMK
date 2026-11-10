import React from 'react';
import { 
  Compass, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Target
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { AGENCY_INFO } from '../data/content';

export default function AgencyShowcase() {
  const agencyServices = [
    "Social Media Management",
    "Social Media Growth Strategy",
    "Content Creation & Planning",
    "Professional Photography & Videography",
    "Video Editing",
    "Social Media Auditing",
    "Brand Consultation",
    "Personal Branding",
    "Digital Marketing Support"
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Background soft ambient compass watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] opacity-5 pointer-events-none">
        <Compass className="w-full h-full text-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Card Frame */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-8 sm:p-12 lg:p-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand Emblem & Visual Statement */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none bg-white p-2 shadow-2xs border border-slate-300 flex items-center justify-center">
                <img 
                  src="/assets/logo.jpg" 
                  alt="Career Compass Social" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A]">
                  Agency Division
                </span>
                <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F172A] tracking-[-0.01em] uppercase mt-1 mb-2">
                  Career Compass Social
                </h3>
                <p className="font-sans text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  "{AGENCY_INFO.tagline}"
                </p>
              </div>

              {/* Philosophy Triptych */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  The Three Core Directives
                </div>
                {AGENCY_INFO.philosophy.map((line, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-none bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-sm font-bold text-[#0F172A]"
                  >
                    <Target className="w-4 h-4 text-[#0F172A] shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              {/* Direct Agency Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={AGENCY_INFO.agencyInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0F172A] border border-slate-200 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#0F172A]" />
                  <span>@{AGENCY_INFO.agencyInstagram}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={AGENCY_INFO.agencyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0F172A] border border-slate-200 transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#0F172A]" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Right Column: Mission & Full Offerings Matrix */}
            <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-slate-100 lg:pl-12">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-slate-100 border border-slate-300 text-[#0F172A] text-xs font-semibold uppercase tracking-wider font-mono">
                  <Compass className="w-3.5 h-3.5 text-[#0F172A]" />
                  <span>Vision & Mission</span>
                </div>
                
                <h4 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F172A] tracking-[-0.01em] uppercase">
                  Building Brands With Direction, Creativity & Strategy
                </h4>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Career Compass Social is a social media and creative strategy venture founded with one clear vision: helping businesses navigate the digital world with the right direction.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  We believe every business has a story worth telling. Our job is to help brands communicate that story through strategic content, professional creative execution, and meaningful digital experiences.
                </p>
              </div>

              {/* Offerings Grid */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  What Career Compass Social Offers
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {agencyServices.map((service, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-none bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Band */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0F172A] hover:bg-black rounded-none shadow-xs transition-all group uppercase tracking-wider"
                >
                  <span>Explore Agency Partnership</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to explore working with Career Compass Social.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#0F172A] bg-white hover:bg-slate-50 rounded-none border border-slate-300 hover:border-[#0F172A] transition-colors"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
