import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Menu, 
  X, 
  ArrowUpRight 
} from 'lucide-react';
import { AGENCY_INFO } from '../data/content';

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "PORTFOLIO", href: "#case-studies" },
  { label: "DATA EDGE", href: "#data-advantage" },
  { label: "PROCESS", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar({ onOpenAudit }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("ABOUT");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const section = document.querySelector(link.href);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(link.label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, label) => {
    e.preventDefault();
    setActiveSection(label);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5 text-slate-900' 
          : 'bg-black/40 backdrop-blur-md border-b border-white/10 py-3 text-white'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo and Brand */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-none border p-1 flex items-center justify-center transition-colors shrink-0 shadow-2xs ${
              isScrolled ? 'border-slate-300 bg-white group-hover:border-slate-900' : 'border-white/30 bg-white/10 group-hover:border-white'
            }`}>
              <img 
                src="/assets/logo.jpg" 
                alt="Career Compass" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center bg-slate-900 text-white">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-2.5 whitespace-nowrap">
                <span className={`font-serif text-[19px] sm:text-[21px] font-semibold tracking-[-0.01em] leading-none ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  Career Compass
                </span>
                <span className={`text-[9px] font-sans font-normal tracking-[0.2em] uppercase px-1.5 py-0.5 border rounded-none ${
                  isScrolled ? 'border-slate-300 text-slate-600 bg-white' : 'border-white/30 text-white/90 bg-white/10'
                }`}>
                  Social
                </span>
              </div>
              <span className={`text-[8px] sm:text-[8.5px] font-sans font-normal tracking-[0.22em] uppercase mt-1 ${
                isScrolled ? 'text-slate-500' : 'text-slate-300'
              }`}>
                Navigate Your Future / Social Strategy
              </span>
            </div>
          </a>

          {/* Clean Minimalist Horizontal Navbar with reduced size */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`relative text-[11px] xl:text-[11.5px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-200 py-1 ${
                    isScrolled 
                      ? (isActive ? 'text-[#0F172A] font-bold' : 'text-slate-600 hover:text-[#0F172A]')
                      : (isActive ? 'text-white font-bold' : 'text-slate-200 hover:text-white')
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Underline indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-200 ${
                      isActive 
                        ? (isScrolled ? 'bg-[#0F172A] opacity-100 scale-x-100' : 'bg-white opacity-100 scale-x-100')
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAudit}
              className={`inline-flex items-center justify-center px-3 py-1.5 text-[11px] font-semibold border rounded-none transition-all uppercase tracking-[0.14em] whitespace-nowrap ${
                isScrolled 
                  ? 'text-slate-700 hover:text-[#0F172A] bg-white hover:bg-slate-50 border-slate-300 hover:border-[#0F172A]'
                  : 'text-white hover:text-white bg-white/10 hover:bg-white/20 border-white/30'
              }`}
            >
              <span>Free Audit</span>
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I saw your Career Compass website and would like to discuss social media growth strategy for my brand.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 text-[11px] sm:text-[11.5px] font-semibold rounded-none shadow-2xs hover:shadow-sm transition-all duration-200 group whitespace-nowrap uppercase tracking-[0.16em] ${
                isScrolled
                  ? 'text-[#0F172A] hover:text-white bg-white hover:bg-[#0F172A] border border-[#0F172A]'
                  : 'text-[#0F172A] hover:bg-slate-100 bg-white border border-white'
              }`}
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[1.75]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-700 hover:text-[#0F172A] hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-5 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-100 text-[#0F172A] font-bold border-l-2 border-[#0F172A]' 
                      : 'text-slate-700 hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />}
                </a>
              );
            })}
          </div>
          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 rounded-none border border-slate-300 uppercase tracking-[0.14em]"
            >
              Free Audit
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to schedule a strategy consultation for my brand.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-900 hover:text-white bg-white hover:bg-[#0F172A] rounded-none border border-[#0F172A] uppercase tracking-[0.16em] transition-colors group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[1.75]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
