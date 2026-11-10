import React from 'react';
import { 
  Building2, 
  HeartPulse, 
  Shirt, 
  Home, 
  UserCheck, 
  Cpu, 
  GraduationCap, 
  Coffee, 
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { INDUSTRIES } from '../data/content';

const iconMap = {
  Building2,
  HeartPulse,
  Shirt,
  Home,
  UserCheck,
  Cpu,
  GraduationCap,
  Coffee,
  Rocket
};

export default function Industries({ onSelectIndustry }) {
  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-300 text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-none shrink-0" />
            <span>Sectors & Specializations</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
            Different Industries. Different Audiences. Tailored Strategies.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            My goal is to understand the unique commercial dynamics of each industry and engineer content that deeply resonates with its specific buyers.
          </p>
        </div>

        {/* 9-Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = iconMap[ind.icon] || Building2;

            return (
              <div 
                key={idx}
                className="p-6 sm:p-7 rounded-none bg-white border border-slate-200/90 hover:border-slate-900 transition-all duration-200 shadow-2xs hover:shadow-xs flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-none bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-black transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tailored Strategy Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Do not see your exact niche? We build custom frameworks based on first-principles audience psychology.
          </p>
        </div>

      </div>
    </section>
  );
}
