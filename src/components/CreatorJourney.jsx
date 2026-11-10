import React from 'react';
import { 
  ExternalLink, 
  Video, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { AGENCY_INFO } from '../data/content';

export default function CreatorJourney() {
  const contentPillars = [
    "Social media growth & algorithmic insights",
    "Content creation frameworks & storytelling",
    "Personal branding & thought leadership",
    "Business observations & marketing critiques",
    "Creator experiences & behind-the-scenes",
    "Digital trends & platform updates",
    "Career & professional growth",
    "Lifestyle & relatable modern narratives"
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Creator Identity & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 rounded-none text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 bg-[#0F172A] rounded-none shrink-0" />
              <span>Dual Perspective Advantage</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
              Not Just a Strategist. <br />
              <span className="text-[#0F172A]">I'm a Creator Too.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              I enjoy being on both sides of the camera: creating content for myself and engineering growth blueprints for high-performing brands.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Being an active content creator gives me firsthand experience of the real hurdles: camera confidence, script retention, algorithm volatility, and audience engagement. I don't give textbook advice; I test new formats on my own platforms first before rolling them out to clients.
            </p>

            {/* Core Pillars Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Topics & Content Pillars Explored
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {contentPillars.map((pillar, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-none bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:bg-white hover:border-[#0F172A] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to follow personal account */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={AGENCY_INFO.personalInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 rounded-xl shadow-md transition-all group"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow My Journey: @{AGENCY_INFO.personalInstagram}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-navy-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
              >
                <span>See Client Results</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Creator Profile Card & Reel Simulation */}
          <div className="lg:col-span-5">
            <div className="max-w-md mx-auto rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-7 shadow-xl space-y-5">
              
              {/* Profile Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-0.5 shrink-0">
                    <div className="w-full h-full bg-white rounded-full p-0.5 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/assets/poojaa-muthukumar.jpg" 
                        alt="Poojaa Muthukumar" 
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-navy-900">
                      poojaa_kumar_28
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Poojaa Muthukumar / Content Creator
                    </p>
                  </div>
                </div>

                <a
                  href={AGENCY_INFO.personalInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-none bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-colors"
                >
                  Follow
                </a>
              </div>

              {/* Bio snippet */}
              <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                <p className="font-semibold text-[#0F172A]">Poojaa Muthukumar</p>
                <p>Social Media Growth Strategist | Data Analyst | Founder: @career.compass.in</p>
                <p className="text-slate-500">Documenting social media growth, hook breakdowns, and digital strategy.</p>
              </div>

              {/* Simulated Reel Cards */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                
                {/* Reel Card 1 */}
                <div className="aspect-[9/13] rounded-none bg-white border border-slate-200 text-slate-900 p-3.5 flex flex-col justify-between shadow-2xs relative overflow-hidden group hover:border-slate-900 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded-none border border-slate-200 text-slate-800">Reel</span>
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Eye className="w-3 h-3 text-slate-600" /> 2.1M
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-3 leading-snug">
                      "Why 90% of brands fail to get reach on Instagram in 2026."
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-2">
                      <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 text-rose-500" /> 140k</span>
                      <span className="flex items-center gap-0.5"><Share2 className="w-2.5 h-2.5" /> 38k</span>
                    </div>
                  </div>
                </div>

                {/* Reel Card 2 */}
                <div className="aspect-[9/13] rounded-none bg-white border border-slate-200 text-slate-900 p-3.5 flex flex-col justify-between shadow-2xs relative overflow-hidden group hover:border-slate-900 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded-none border border-slate-200 text-slate-800">Strategy</span>
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Eye className="w-3 h-3 text-slate-600" /> 840K
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-3 leading-snug">
                      "The exact 3-second hook structure we used to hit 11M views."
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-2">
                      <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 text-rose-500" /> 62k</span>
                      <span className="flex items-center gap-0.5"><Share2 className="w-2.5 h-2.5" /> 19k</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Creator Philosophy Banner */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">
                  "Understanding the creator perspective makes me a far more effective strategist for your brand."
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
