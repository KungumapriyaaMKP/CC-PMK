import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Compass, 
  Sparkles,
  Award
} from 'lucide-react';
import { AGENCY_INFO } from '../data/content';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      data-lenis-prevent className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      <div 
        className="relative w-full max-w-3xl bg-white rounded-none shadow-2xl border border-[#0F172A] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#0F172A] text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-none bg-white text-[#0F172A] uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider hidden sm:inline">
              // Featured Client Work
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-none text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div data-lenis-prevent className="p-5 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Header Title & Role */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F172A] tracking-[-0.01em] uppercase leading-tight">
              {project.title}
            </h3>
            
            <p className="text-sm font-semibold text-slate-700">
              {project.subtitle}
            </p>

            {project.doctors && (
              <p className="text-xs font-medium text-slate-600">
                <span className="font-bold text-[#0F172A] font-mono uppercase text-[10.5px]">Clinical Leadership:</span> {project.doctors}
              </p>
            )}

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-slate-300 bg-slate-50 text-[11px] font-mono font-bold text-[#0F172A]">
                <span>ROLE:</span>
                <span className="text-slate-600 font-normal">{project.role}</span>
              </span>
            </div>
          </div>

          {/* Key Metrics Banner */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-none bg-slate-50 border border-slate-200 text-slate-900 shadow-2xs">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-left">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                    {m.label}
                  </div>
                  <div className="font-sans font-black text-base sm:text-lg text-[#0F172A] mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Embedded Instagram Reel */}
          {project.reelId && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-[#0F172A] font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#0F172A]" />
                  <span>Verified Campaign Reel</span>
                </h4>
                {project.reelUrl && (
                  <a
                    href={project.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 hover:text-black hover:underline"
                  >
                    <span>Watch on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="relative w-full max-w-sm mx-auto h-[480px] bg-black rounded-none border border-slate-200 overflow-hidden shadow-md">
                <iframe
                  src={`https://www.instagram.com/reel/${project.reelId}/embed/`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  title={project.title}
                />
              </div>
            </div>
          )}

          {/* 1. Project Context & Strategic Challenge (Sharp Editorial Card) */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <span className="text-[#0F172A]">01 //</span>
              <span>Project Context & Strategic Challenge</span>
            </div>
            <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-none text-sm text-slate-700 leading-relaxed font-sans shadow-2xs">
              {project.overview}
            </div>
          </div>

          {/* 2. Client / Strategic Pull Quote (Bold Dark Editorial Card with Emerald Accent) */}
          {project.clientQuote && (
            <div className="p-5 sm:p-6 bg-[#0F172A] text-white border-l-4 border-emerald-400 rounded-none shadow-md space-y-2">
              <div className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Strategic Directive</span>
              </div>
              <blockquote className="font-serif italic text-base sm:text-lg text-slate-100 leading-snug">
                "{project.clientQuote}"
              </blockquote>
            </div>
          )}

          {/* 3. Execution Responsibilities (Structured Tile Grid) */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <span className="text-[#0F172A]">02 //</span>
                <span>End-To-End Responsibilities & Execution</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.responsibilities.map((resp, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-white border border-slate-200 rounded-none flex items-start gap-2.5 hover:border-[#0F172A] transition-colors shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-sans leading-normal">{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Strategic Takeaway (Clean Editorial Focus Block) */}
          {project.takeaway && (
            <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-none space-y-1.5 shadow-2xs">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0F172A] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#0F172A]" />
                <span>Strategic Takeaway</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {project.takeaway}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 font-sans">
            Ready to deploy similar strategic growth for your brand?
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-mono font-bold uppercase text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white rounded-none transition-colors"
            >
              Close
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Poojaa, I saw your work for "${project.title}" and want to discuss similar growth for my brand.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-black rounded-none transition-all shadow-xs uppercase tracking-wider font-sans"
            >
              <span>Discuss Campaign</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
