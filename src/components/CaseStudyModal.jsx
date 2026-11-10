import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  BarChart3, 
  Compass, 
  Share2, 
  Building2,
  Users
} from 'lucide-react';
import { AGENCY_INFO } from '../data/content';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-skybrand-100 text-skybrand-800 border border-skybrand-200">
              {project.category}
            </span>
            <span className="text-xs text-slate-400">• Verified Case Study</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200/80 transition-colors"
            aria-label="Close case study details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Header Title & Role */}
          <div>
            <h3 className="font-serif font-bold text-3xl text-[#0F172A] tracking-[-0.01em] uppercase mb-1">
              {project.title}
            </h3>
            <p className="text-sm font-semibold text-[#0F172A] mb-3">
              {project.subtitle}
            </p>
            {project.doctors && (
              <p className="text-xs font-medium text-slate-600 mb-2">
                <span className="font-bold text-[#0F172A]">Clinical Leadership:</span> {project.doctors}
              </p>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700">
              <span className="font-bold text-[#0F172A]">My Role:</span> {project.role}
            </div>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-none bg-slate-50 border border-slate-200 text-slate-900 shadow-2xs">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                  {m.label}
                </div>
                <div className="font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Embedded Instagram Reel */}
          {project.reelId && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Verified Reel Distribution
                </h4>
                {project.reelUrl && (
                  <a
                    href={project.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-800 hover:text-black hover:underline"
                  >
                    <span>Open on Instagram</span>
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

          {/* Project Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Context & Strategic Challenge
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {project.overview}
            </p>
          </div>

          {/* Client / Strategy Quote */}
          <blockquote className="p-4 rounded-xl bg-skybrand-50 border-l-4 border-skybrand-500 text-xs sm:text-sm font-medium text-navy-900">
            "{project.clientQuote}"
          </blockquote>

          {/* Execution Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              End-to-End Responsibilities & Execution
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-skybrand-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Takeaway */}
          <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Strategic Takeaway
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              {project.takeaway}
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Interested in similar growth for your brand?
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <a
              href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Poojaa, I reviewed your case study for "${project.title}" and want to discuss similar strategy for my brand.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-black rounded-none transition-all shadow-xs uppercase tracking-wider"
            >
              Discuss Similar Campaign
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
