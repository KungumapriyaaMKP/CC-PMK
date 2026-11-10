import React from 'react';
import { 
  Database, 
  Code2, 
  Cpu, 
  LineChart, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Sparkles
} from 'lucide-react';
import { TECHNICAL_ADVANTAGE } from '../data/content';
import LineChart4 from './ui/line-chart-4-demo';
import TechStackMarquee from './TechStackMarquee';

export default function DataAdvantage() {
  return (
    <section id="data-advantage" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-slate-100 border border-slate-300 text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-none shrink-0" />
            <span>The 6-Year Analytics Differentiator</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
            {TECHNICAL_ADVANTAGE.title}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {TECHNICAL_ADVANTAGE.description}
          </p>
        </div>

        {/* Full-Width Running Tech Stack & Tools Marquee */}
        <div className="w-full relative my-8">
          <TechStackMarquee />
        </div>

        {/* Live Empirical Data Insight: Cross-Platform Retention & Engagement Curve */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <span>Predictive Content Modeling</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F172A] tracking-[-0.01em] uppercase">
                Live Insights: Social Engagement Velocity
              </h3>
              <p className="text-slate-600 text-sm max-w-2xl mt-1">
                Visualizing hourly engagement trends across client campaigns. Our analytical framework detects optimal publication windows to maximize algorithm propagation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#0F172A] bg-slate-100 px-3 py-1.5 rounded-none border border-slate-300 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E1306C] animate-pulse shadow-[0_0_8px_rgba(225,48,108,0.6)]"></span>
                Peak Window: 2:00 PM - 4:00 PM
              </span>
            </div>
          </div>

          <LineChart4 />
        </div>

      </div>
    </section>
  );
}
