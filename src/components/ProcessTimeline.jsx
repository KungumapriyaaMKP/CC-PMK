import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Search, 
  FileText, 
  Film, 
  Send, 
  BarChart2, 
  Repeat,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "PHASE 01",
    name: "Discover",
    tagline: "Uncover Brand Core",
    description: "Deep immersion into your brand identity, business model, commercial goals, current digital bottlenecks, and unique market advantage.",
    deliverable: "Deliverable: Brand Foundation Matrix",
    icon: Compass
  },
  {
    step: "02",
    phase: "PHASE 02",
    name: "Research",
    tagline: "Audience & Competition",
    description: "Detailed study of your niche ecosystem, competitor content gaps, audience psychology, and algorithmic search trends in your vertical.",
    deliverable: "Deliverable: Niche Search & Gap Intel",
    icon: Search
  },
  {
    step: "03",
    phase: "PHASE 03",
    name: "Strategise",
    tagline: "Custom Blueprint",
    description: "Drafting a customized content matrix, viral hook frameworks, aesthetic guidelines, and publication cadence tuned to your goals.",
    deliverable: "Deliverable: 30-Day Content Matrix",
    icon: FileText
  },
  {
    step: "04",
    phase: "PHASE 04",
    name: "Create",
    tagline: "Script, Shoot & Edit",
    description: "Translating strategic blueprints into high-retention video scripts, coordinating on-location shoots, and editing with viral pacing.",
    deliverable: "Deliverable: Studio Video Production",
    icon: Film
  },
  {
    step: "05",
    phase: "PHASE 05",
    name: "Publish",
    tagline: "Optimization & Delivery",
    description: "Timing releases for maximum initial velocity, deploying optimized SEO tags, crafting compelling captions, and active community engagement.",
    deliverable: "Deliverable: Release & Algorithm SEO",
    icon: Send
  },
  {
    step: "06",
    phase: "PHASE 06",
    name: "Analyse",
    tagline: "Data Dissection",
    description: "Comprehensive evaluation of 3-second hook retention, average watch time, save rates, conversion clicks, and audience demographics.",
    deliverable: "Deliverable: Retention Curve Analytics",
    icon: BarChart2
  },
  {
    step: "07",
    phase: "PHASE 07",
    name: "Optimise",
    tagline: "Compound Growth",
    description: "Iterating scripts based on quantitative feedback, doubling down on top-performing themes, and continuously expanding market share.",
    deliverable: "Deliverable: Scaled Revenue Engine",
    icon: Repeat
  },
  {
    step: "08",
    phase: "CONTINUOUS",
    name: "The Compounding Effect",
    tagline: "Sustained Authority & Scale",
    description: "By cycling from Analysis back to Creative Optimization, your brand builds algorithm authority, lowering follower acquisition cost.",
    deliverable: "Key Impact: Exponential Organic Reach",
    icon: TrendingUp,
    isFinale: true
  }
];

export default function ProcessTimeline() {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      
      {/* Background Soft Golden Ambient Halo Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/25 via-yellow-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-bl from-yellow-200/20 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Background Giant Watermark Typography with warm golden tint */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[13vw] font-mono font-black uppercase text-amber-900/[0.04] tracking-[0.25em] pointer-events-none select-none">
        JOURNEY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Header with golden architectural accent line */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
                WORK PROCESS
              </span>
              <div className="h-[2px] w-28 bg-gradient-to-r from-amber-500 via-yellow-400 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
              From Brand Discovery to Digital Growth
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-sans">
              Every client follows a systematic, repeatable framework that eliminates guesswork and compounds organic market authority.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider mr-2 hidden sm:inline">
              Scroll Journey
            </span>
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-none border border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/50 text-amber-900 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-none border border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/50 text-amber-900 flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Connected Timeline Track */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-200 hover:scrollbar-thumb-amber-400 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="inline-flex items-start min-w-full">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isLast = idx === PROCESS_STEPS.length - 1;

              return (
                <div
                  key={step.step}
                  className="w-[290px] sm:w-[320px] shrink-0 flex flex-col items-center relative pr-6 sm:pr-8"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Top Node & Golden Connecting Line Header */}
                  <div className="relative w-full h-16 flex items-center justify-center">
                    
                    {/* Golden Connecting Horizontal Track Line across items */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.35)]" />

                    {/* Animated Golden Traveling Comet Dot */}
                    {!isLast && (
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-0"
                        style={{
                          left: 'calc(50% + 24px)',
                          width: 'calc(100% - 48px)',
                        }}
                      >
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
                          animate={{
                            left: ['0%', '100%'],
                            opacity: [0, 1, 1, 1, 0],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: (idx * 0.35) % 2.2,
                          }}
                        >
                          {/* Luminous golden comet trail */}
                          <div className="absolute right-1 w-10 sm:w-14 h-[2px] bg-gradient-to-l from-amber-500 via-yellow-300 to-transparent pointer-events-none shadow-[0_0_8px_rgba(245,158,11,0.6)]" />

                          {/* Outer luminous golden halo */}
                          <div className="absolute w-6 h-6 rounded-full bg-amber-400/35 blur-[4px]" />

                          {/* Radiant core golden dot */}
                          <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_3px_rgba(245,158,11,0.7)] border border-amber-200" />

                          {/* White center pin */}
                          <div className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                        </motion.div>
                      </div>
                    )}

                    {/* Golden Square Icon Node Box */}
                    <div className="relative w-12 h-12 rounded-none bg-white border border-amber-400/90 flex items-center justify-center text-amber-700 z-10 shadow-[0_0_14px_rgba(245,158,11,0.22)] group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-slate-950 group-hover:shadow-[0_0_22px_rgba(245,158,11,0.55)] group-hover:border-amber-400 transition-all duration-300">
                      <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      
                      {/* Sub-badge on bottom right with step number */}
                      <div className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 rounded-none bg-gradient-to-r from-amber-600 to-yellow-600 border border-amber-400 text-[9px] font-mono font-bold text-white leading-none shadow-[0_0_8px_rgba(217,119,6,0.45)]">
                        {step.step}
                      </div>
                    </div>
                  </div>

                  {/* Golden Card Hanging Below Node */}
                  <div className={`mt-6 w-full p-5 sm:p-6 rounded-none border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    step.isFinale
                      ? 'bg-gradient-to-br from-amber-950/95 via-[#0F172A] to-slate-950 border-amber-400 text-white shadow-[0_4px_30px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)]'
                      : 'bg-gradient-to-b from-white via-white to-amber-50/25 border-amber-200/90 hover:border-amber-400 shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06),0_0_12px_rgba(245,158,11,0.08)] hover:shadow-[0_14px_35px_-4px_rgba(217,119,6,0.18),0_0_24px_rgba(245,158,11,0.35)] hover:-translate-y-1'
                  }`}>
                    
                    {/* Top Radiant Gold Hairline Beam */}
                    <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]" />

                    {/* Corner Ambient Light Particle */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/10 rounded-full blur-xl group-hover:bg-amber-400/25 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      
                      {/* Monospace Golden Phase Pill Badge */}
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-none border text-[10.5px] font-mono font-bold ${
                        step.isFinale
                          ? 'border-amber-400/60 bg-amber-400/20 text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          : 'border-amber-300/80 bg-gradient-to-r from-amber-50 to-yellow-50/80 text-amber-950 shadow-2xs'
                      }`}>
                        {step.phase}
                      </div>

                      {/* Title */}
                      <h3 className={`text-base sm:text-lg font-bold transition-colors font-sans leading-snug ${
                        step.isFinale 
                          ? 'text-white' 
                          : 'text-slate-900 group-hover:text-amber-950'
                      }`}>
                        {step.name}
                      </h3>

                      {/* Subtitle / Focus */}
                      <div className={`text-xs font-semibold font-mono tracking-wide ${
                        step.isFinale 
                          ? 'text-amber-300' 
                          : 'text-amber-700'
                      }`}>
                        {step.tagline}
                      </div>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed font-sans pt-1 ${
                        step.isFinale 
                          ? 'text-slate-300' 
                          : 'text-slate-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Key Milestone / Deliverable */}
                    <div className={`mt-5 pt-3.5 border-t flex items-center justify-between text-xs font-mono relative z-10 ${
                      step.isFinale 
                        ? 'border-amber-500/30 text-amber-300' 
                        : 'border-amber-100/90 text-amber-950'
                    }`}>
                      <div className="flex items-center gap-2 truncate">
                        <Award className={`w-3.5 h-3.5 shrink-0 ${
                          step.isFinale ? 'text-amber-400' : 'text-amber-600'
                        }`} />
                        <span className="truncate">{step.deliverable}</span>
                      </div>
                    </div>

                    {step.isFinale && (
                      <div className="mt-4 pt-2 relative z-10">
                        <a
                          href="#contact"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-none bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        >
                          <span>Initiate Step 01</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
