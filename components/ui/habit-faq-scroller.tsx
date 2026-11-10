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
 * Reusable card for a single FAQ item.
 */
export const FaqCard: React.FC<{ question: string; answer: string; className?: string }> = ({
  question,
  answer,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-start gap-3 p-6 sm:p-7 bg-white dark:bg-navy-950 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-900/5 hover:border-skybrand-400/80 hover:shadow-xl transition-all duration-300 w-80 sm:w-96 shrink-0 faq-card group ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-skybrand-500 shrink-0 group-hover:scale-125 transition-transform" />
        <h3 className="text-base sm:text-lg font-heading font-bold text-navy-950 dark:text-white leading-snug group-hover:text-brand-blue dark:group-hover:text-skybrand-300 transition-colors">
          {question}
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
        {answer}
      </p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
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
    <div className="w-full overflow-hidden group relative scroller-mask py-2">
      <div className={`flex ${animationClass}`} style={style}>
        <div className="flex items-stretch justify-center shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center shrink-0 gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
const FaqSection: React.FC<{ data: FaqData; className?: string }> = ({ data, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center gap-10 py-12 w-full max-w-7xl mx-auto overflow-hidden ${className}`}>
      <div className="flex flex-col items-center gap-3 text-center z-10 max-w-2xl px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-navy-deep dark:text-white leading-tight">
          {data.mainTitle}
        </h2>
        {data.mainSubtitle && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {data.mainSubtitle}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 z-10 w-full">
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
