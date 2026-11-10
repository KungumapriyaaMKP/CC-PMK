import React from 'react';

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Luminous, bright card for a single FAQ item with glow effects on hover.
 */
export const FaqCard: React.FC<{ question: string; answer: string; className?: string }> = ({
  question,
  answer,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-start justify-between gap-2.5 p-4 sm:p-5 bg-white rounded-none border border-slate-200 hover:border-[#0F172A] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-[260px] sm:w-[290px] shrink-0 group relative overflow-hidden ${className}`}
    >
      {/* Clean Slate Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-slate-200 group-hover:bg-[#0F172A] transition-colors duration-300" />

      <div className="space-y-1.5 w-full relative z-10">
        <div className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-none bg-[#0F172A] shrink-0 mt-1" />
          <h3 className="text-xs sm:text-[13px] font-sans font-bold text-[#0F172A] leading-snug tracking-tight">
            {question}
          </h3>
        </div>
      </div>

      <p className="text-[11px] sm:text-xs text-slate-600 group-hover:text-slate-800 leading-relaxed font-sans pt-2 border-t border-slate-100 w-full mt-auto relative z-10 transition-colors">
        {answer}
      </p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation with padding for glow halos.
 */
export const HorizontalScroller: React.FC<{
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}> = ({ children, speed = '40s', direction = 'left' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-3">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4">
          {children}
        </div>
        {/* duplicate with identical padding for seamless loop */}
        <div className="flex items-stretch shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows with bright ambient lighting.
 */
const FaqSection: React.FC<{ data: FaqData; className?: string }> = ({ data, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center gap-6 py-8 w-full max-w-7xl mx-auto overflow-hidden ${className}`}>
      
      {/* Background Soft Glow Orbs for Bright, Luminous Look */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-sky-200/30 via-indigo-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-bl from-indigo-200/25 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center gap-2 text-center z-10 max-w-2xl px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-slate-300 bg-white/95 text-slate-800 text-[11px] font-mono uppercase tracking-wider shadow-[0_0_12px_rgba(15,23,42,0.06)]">
          <span className="w-1.5 h-1.5 bg-[#0F172A] rounded-none shadow-[0_0_6px_rgba(15,23,42,0.5)]"></span>
          <span>Client Clarifications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] tracking-[-0.01em] uppercase">
          Frequently Asked Questions
        </h2>
        {data.mainSubtitle && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-sans">
            {data.mainSubtitle}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:gap-2 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id || item.question} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
