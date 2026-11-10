import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import { METRICS } from '../data/content';
import { CountAnimation } from './ui/count-animation';

function getMetricConfig(metric) {
  if (metric.id === 'views-campaign') {
    return { number: 2, suffix: ' Crore+' };
  }
  if (metric.id === 'single-reel') {
    return { number: 11, suffix: ' Million' };
  }
  if (metric.id === 'healthcare-reel') {
    return { number: 7, suffix: ' Million' };
  }
  if (metric.id === 'healthcare-followers') {
    return { number: 46500, suffix: '+' };
  }
  if (metric.id === 'weekly-followers') {
    return { number: 4500, suffix: '+' };
  }
  if (metric.id === 'analytics-experience') {
    return { number: 6, suffix: ' Years' };
  }
  return { number: metric.value || 0, suffix: metric.suffix || '' };
}

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="results" 
      ref={sectionRef} 
      className="py-16 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F172A] tracking-[-0.01em] uppercase">
            Numbers That Reflect the Power of Strategy
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans max-w-xl mx-auto">
            I believe growth should be measured, analysed, and continuously improved. Here is what structured storytelling backed by data delivers.
          </p>
        </div>

        {/* Streamlined Data Spec Metrics Grid with Animated Counting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {METRICS.map((metric, idx) => {
            const config = getMetricConfig(metric);

            return (
              <div
                key={metric.id}
                className="group relative p-4 sm:p-5 rounded-none bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-900 transition-all duration-300 shadow-2xs hover:shadow-xs flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top Header Row: Index Tag and Highlight Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#0F172A]">
                        0{idx + 1}
                      </span>
                      <span className="text-[9.5px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-none bg-[#0F172A] text-white border border-[#0F172A] font-bold">
                        {metric.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Main Animated Metric Value & Label */}
                  <div className="space-y-0.5 mb-2">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                      {isVisible ? (
                        <CountAnimation 
                          number={config.number} 
                          suffix={config.suffix}
                          duration={2}
                          className="tabular-nums"
                        />
                      ) : (
                        <span>0{config.suffix}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-700 tracking-wide font-sans">
                      {metric.label}
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                    {metric.description}
                  </p>
                </div>

                {/* Bottom Verification Status */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A] animate-pulse"></span>
                    <span>Documented Result</span>
                  </div>
                  <span className="text-slate-400">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory & Ethical Note (Full-Width Single-Line Long Banner) */}
        <div className="mt-8 w-full rounded-none bg-slate-50 border border-slate-200 px-4 py-3 sm:px-5 sm:py-2.5 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-xs text-slate-600 shadow-2xs">
          <div className="flex items-center gap-2 shrink-0">
            <Info className="w-3.5 h-3.5 text-[#0F172A] shrink-0" />
            <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] font-mono whitespace-nowrap">
              Transparency & Authenticity Note:
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            These are campaign-specific achievements across distinct client accounts and reporting windows, not standardized or guaranteed outcomes. Every business has unique niche dynamics, target demographics, and initial baseline engagement.
          </p>
        </div>

      </div>
    </section>
  );
}
