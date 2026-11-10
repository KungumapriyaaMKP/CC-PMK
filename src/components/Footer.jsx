import React from 'react';
import { 
  Compass, 
  Mail, 
  Phone, 
  ArrowUp,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Globe
} from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from './BrandIcons';
import { AGENCY_INFO } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="bg-[#0F172A] text-white pt-16 pb-12 border-t border-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          
          {/* Column 1: Brand, Mission, & Circular Socials */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none border border-slate-700 bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
                <img 
                  src="/assets/logo.jpg" 
                  alt="Career Compass" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-[20px] font-semibold text-white leading-none">
                  Career Compass
                </span>
                <span className="text-[9px] font-sans font-normal tracking-[0.2em] uppercase text-slate-300 px-1.5 py-0.5 border border-slate-700 rounded-none bg-slate-800/80">
                  Social
                </span>
              </div>
            </div>

            {/* Description Narrative */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
              Fine-tuned social media growth strategy designed with intention and executed with quantitative precision. Turning content into connections. Connections into growth.
            </p>

            <div className="text-[11px] text-slate-400 font-mono">
              <p className="font-bold text-white">{AGENCY_INFO.founder}</p>
              <p>{AGENCY_INFO.founderTitle}</p>
            </div>

            {/* Outlined Social Icon Circles */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={AGENCY_INFO.agencyInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agency Instagram"
                className="w-11 h-11 rounded-full border border-slate-700 hover:border-slate-400 bg-slate-900/60 hover:bg-white flex items-center justify-center transition-all shadow-sm hover:scale-110 group"
                title="Agency Instagram"
              >
                <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={AGENCY_INFO.personalInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Personal Instagram"
                className="w-11 h-11 rounded-full border border-slate-700 hover:border-slate-400 bg-slate-900/60 hover:bg-white flex items-center justify-center transition-all shadow-sm hover:scale-110 group"
                title="Personal Instagram"
              >
                <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={AGENCY_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-full border border-slate-700 hover:border-slate-400 bg-slate-900/60 hover:bg-white flex items-center justify-center transition-all shadow-sm hover:scale-110 group"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to discuss social media growth for my brand.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="w-11 h-11 rounded-full border border-slate-700 hover:border-slate-400 bg-slate-900/60 hover:bg-white text-slate-200 hover:text-[#0F172A] flex items-center justify-center transition-all shadow-sm hover:scale-110 group"
                title="WhatsApp Contact"
              >
                <MessageCircle className="w-5 h-5 text-slate-200 group-hover:text-[#0F172A] transition-colors" />
              </a>

              <a
                href={`mailto:${AGENCY_INFO.email}`}
                aria-label="Email Us"
                className="w-11 h-11 rounded-full border border-slate-700 hover:border-slate-400 bg-slate-900/60 hover:bg-white text-slate-200 hover:text-[#0F172A] flex items-center justify-center transition-all shadow-sm hover:scale-110 group"
                title="Email Us"
              >
                <Mail className="w-5 h-5 text-slate-200 group-hover:text-[#0F172A] transition-colors" />
              </a>
            </div>

          </div>

          {/* Column 2: SOLUTIONS */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="#services" className="hover:text-white transition-colors">Growth Strategy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Video Production</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Scripting & Shoots</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Retention Editing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Account Audits</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Brand Identity</a></li>
            </ul>
          </div>

          {/* Column 3: NAVIGATION */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="#about" className="hover:text-white transition-colors">About Poojaa</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Client Work</a></li>
              <li><a href="#results" className="hover:text-white transition-colors">Verified Results</a></li>
              <li><a href="#data-advantage" className="hover:text-white transition-colors">Data Edge</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Work Process</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Client FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: CONNECT */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-white">
              Connect
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <p>
                <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {AGENCY_INFO.email}
                </a>
              </p>
              <p>
                <a href={`https://wa.me/${AGENCY_INFO.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {AGENCY_INFO.phone}
                </a>
              </p>
              <p className="text-slate-400 pt-1">
                {AGENCY_INFO.location}
              </p>
              <p className="text-slate-400">
                Serving Clients Globally
              </p>
              <div className="pt-2">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline uppercase tracking-wider"
                >
                  <span>Request Audit Diagnostic</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Thin Hairline Divider */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div>
            &copy; 2026 Career Compass Social. All rights reserved.
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border border-white/40 text-white hover:bg-white hover:text-[#0F172A] rounded-none bg-transparent transition-all shadow-2xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>

        </div>

      </div>
    </footer>
  );
}