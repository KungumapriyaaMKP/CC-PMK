import React from 'react';
import FaqSection from './ui/habit-faq-scroller';

const CAREER_COMPASS_FAQS = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Quick answers about our growth strategy, production, and partnerships.",
  rows: [
    {
      id: "row-1",
      speed: "45s",
      direction: "left",
      faqItems: [
        {
          id: "faq-1",
          question: "How does your data analytics background help my social media?",
          answer: "I track drop-off curves, save rates, and algorithm patterns to turn content into predictable, measurable growth."
        },
        {
          id: "faq-2",
          question: "Do you handle on-location shoots or only remote editing?",
          answer: "Both: on-location production in Chennai, plus remote script frameworks, coaching, and editing worldwide."
        },
        {
          id: "faq-3",
          question: "What industries do you specialize in?",
          answer: "Healthcare, real estate, education, professional services, and high-trust executive personal brands."
        },
        {
          id: "faq-6",
          question: "What tools and frameworks do you use for performance tracking?",
          answer: "Python and SQL extraction, retention curve analysis, hook velocity tracking, and custom conversion dashboards."
        },
        {
          id: "faq-8",
          question: "How does the shoot companion process work?",
          answer: "Direct on-camera guidance, styling, and hook curation so your delivery feels effortless and authentic."
        }
      ]
    },
    {
      id: "row-2",
      speed: "40s",
      direction: "right",
      faqItems: [
        {
          id: "faq-4",
          question: "What is the difference between Poojaa Muthukumar and Career Compass Social?",
          answer: "Poojaa is the growth strategist and consultant; Career Compass Social is the full-service agency."
        },
        {
          id: "faq-5",
          question: "Are campaign view numbers and follower counts guaranteed?",
          answer: "No fake vanity promises; we provide methodical hook testing, strong retention, and sustained organic reach."
        },
        {
          id: "faq-7",
          question: "How quickly can we start working together?",
          answer: "Custom proposals arrive within 48-72 hours, with content production kicking off within 5-7 days."
        },
        {
          id: "faq-9",
          question: "How do I book a consultation?",
          answer: "Click 'Let's Talk' or submit an inquiry to message Poojaa directly via WhatsApp or email."
        }
      ]
    }
  ]
};

export default function FAQSection() {
  return (
    <section id="faq" className="py-14 sm:py-16 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Radiant ambient glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-sky-100/40 via-indigo-50/30 to-purple-50/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="w-full relative z-10">
        <FaqSection data={CAREER_COMPASS_FAQS} />
      </div>
    </section>
  );
}
