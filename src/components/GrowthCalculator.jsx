import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Target,
  Flame,
  Award,
  ShoppingBag,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Compass,
  TrendingUp,
  Clock,
  Layers,
  Zap,
  Activity
} from 'lucide-react';
import { AGENCY_INFO, SERVICES, INDUSTRIES } from '../data/content';

const INDUSTRY_ICON_MAP = {
  'Real Estate & Property': Building2,
  'Healthcare & Medical': HeartPulse,
  'Fashion & Lifestyle': Shirt,
  'Interior Design & Architecture': Home,
  'Personal Brands & Founders': UserCheck,
  'Technology & Software': Cpu,
  'Education & Training': GraduationCap,
  'Restaurants & Hospitality': Coffee,
  'Startups & Local Ventures': Rocket,
};

const STAGES = [
  { id: 'fresh', name: 'Under 2,000', sub: 'Starting Fresh', highlight: 'Launchpad' },
  { id: 'stagnant', name: '2k to 10k', sub: 'Stagnant Reach', highlight: 'Breakout' },
  { id: 'scaling', name: '10k to 50k', sub: 'Scaling Velocity', highlight: 'Acceleration' },
  { id: 'enterprise', name: '50,000+', sub: 'High Volume Brand', highlight: 'Dominance' },
];

const OBJECTIVES = [
  { 
    id: 'leads', 
    name: 'High-Ticket Lead Generation', 
    desc: 'Inbound client DMs and high-intent investor calls',
    icon: Target 
  },
  { 
    id: 'viral', 
    name: 'Explosive Viral Reach & Views', 
    desc: 'Algorithmic distribution reaching 1M+ views per reel',
    icon: Flame 
  },
  { 
    id: 'authority', 
    name: 'High Trust & Authority Positioning', 
    desc: 'Founder thought leadership and undisputed category voice',
    icon: Award 
  },
  { 
    id: 'sales', 
    name: 'Direct E-commerce Product Sales', 
    desc: 'Converting attention into Shopify purchases & orders',
    icon: ShoppingBag 
  },
];

export default function GrowthCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const STEPS_NAV = [
    { num: '01', title: 'Industry' },
    { num: '02', title: 'Audience' },
    { num: '03', title: 'Objective' },
    { num: '04', title: 'Services' },
  ];

  const goToStep = (stepIdx) => {
    setDirection(stepIdx > currentStep ? 1 : -1);
    setCurrentStep(stepIdx);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const [industry, setIndustry] = useState('Real Estate & Property');
  const [stage, setStage] = useState('2k to 10k');
  const [goal, setGoal] = useState('High-Ticket Lead Generation');
  const [selectedServices, setSelectedServices] = useState([
    'Social Media Management',
    'Content Strategy & Creation'
  ]);

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const getRecommendation = () => {
    if (industry.includes('Healthcare')) {
      return {
        focus: "High-Trust Medical Education & De-Jargonized Patient Reels",
        frequency: "3 to 4 High-Retention Reels / week",
        kpi: "Direct Patient Consultations & 80%+ Retention Ratio",
        actionPlan: "On-location clinical shoot coordination with script frameworks explaining symptoms, patient relief, and clinical proof.",
        velocity: "+340% Trust Velocity",
        estimatedImpact: "7M+ Reach Record"
      };
    }
    if (industry.includes('Real Estate')) {
      return {
        focus: "Curiosity Hooks & Demystified Dubai Investment Math",
        frequency: "4 to 5 Value-Packed Reels / week",
        kpi: "Inbound Investor DMs & Massive Algorithmic Discovery",
        actionPlan: "Deploy hook structures around ROI, offshore investment guidelines, and market comparisons similar to our 2 Crore+ view campaign.",
        velocity: "+450% Inbound Velocity",
        estimatedImpact: "2 Cr+ Views Record"
      };
    }
    if (industry.includes('Fashion')) {
      return {
        focus: "Aesthetic Product Storytelling & Modest Lifestyle Identity",
        frequency: "4 to 6 Reels + Daily Cohesive Stories",
        kpi: "Save Rates, Profile Visits, and Direct Webstore Conversions",
        actionPlan: "Curate a recognizable lifestyle aesthetic with seasonal lookbooks, tactile fabric showcases, and high-production styling reels.",
        velocity: "+280% Save Conversion",
        estimatedImpact: "Premium Brand Equity"
      };
    }
    if (industry.includes('Interior')) {
      return {
        focus: "Spatial Reveal Walkthroughs & Tactile Materiality Focus",
        frequency: "3 High-Production Reels / week",
        kpi: "High-Ticket Client Inquiries & Architecture Saves",
        actionPlan: "Exclusive shoot companion walkthroughs focusing on spatial lighting, tactile textures, and emotional before-and-after reveals.",
        velocity: "+310% Inbound Leads",
        estimatedImpact: "High-Ticket Client Wins"
      };
    }
    return {
      focus: "Data-Driven Hook Testing & Narrative Founder Authority",
      frequency: "3 to 5 Structured Posts & Reels / week",
      kpi: "Consistent Organic Follower Compounding & Inbound Inquiries",
      actionPlan: "Audit past account diagnostics, isolate drop-off points, and construct custom word-for-word scripts aligned with your audience psychology.",
      velocity: "+300% Organic Compounding",
      estimatedImpact: "Rapid Algorithm Indexing"
    };
  };

  const rec = getRecommendation();

  const generateWhatsAppMessage = () => {
    const text = `Hi Poojaa, I configured a custom growth roadmap on Career Compass:
- Industry: ${industry}
- Current Baseline: ${stage}
- Primary Objective: ${goal}
- Needed Services: ${selectedServices.join(', ')}

I would like to review the custom growth roadmap and strategy with you.`;
    return `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="growth-calculator" className="py-20 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-slate-100 border border-slate-300 text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-none shrink-0" />
            <span>Interactive Strategy Simulator</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-[-0.01em] uppercase">
            Architect Your Growth Roadmap
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Select your industry vertical, current audience stage, and commercial objectives to generate an instant, data-backed execution blueprint.
          </p>
        </div>

        {/* Main Simulator Card Frame */}
        <div className="bg-white border-2 border-[#0F172A] rounded-none shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden max-w-4xl mx-auto relative">
          {/* Subtle Top Accent Ribbon */}
          <div className="h-1.5 w-full bg-[#0F172A]" />

          {/* Interactive Single-Question Sliding Questionnaire */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white min-h-[490px]">
              
              <div>
                {/* Step Progress Bar & Pills Header */}
                <div className="pb-6 border-b border-slate-200 mb-6 space-y-4">
                  {/* Linear Progress Track */}
                  <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-600"
                      initial={false}
                      animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {STEPS_NAV.map((s, idx) => (
                        <button
                          key={s.num}
                          type="button"
                          onClick={() => goToStep(idx)}
                          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono transition-all rounded-none border ${
                            currentStep === idx
                              ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                              : currentStep > idx
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold hover:bg-emerald-100'
                              : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
                          }`}
                          title={`Go to Step ${s.num}: ${s.title}`}
                        >
                          <span className="font-bold">{s.num}</span>
                          <span className="hidden sm:inline font-sans font-medium">{s.title}</span>
                          {currentStep > idx && <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                        Step {currentStep + 1} of 4
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sliding Single-Question View Container */}
                <div className="relative min-h-[300px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* Step 1: Industry Selection */}
                    {currentStep === 0 && (
                      <motion.div
                        key="step-industry"
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 35 : -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -35 : 35 }}
                        transition={{ duration: 0.24, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              01 // SECTOR SPECIALIZATION
                            </span>
                            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0F172A] uppercase tracking-[-0.01em]">
                              Which industry vertical defines your brand?
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 hidden sm:inline">
                            Single Select
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                          {INDUSTRIES.map((ind) => {
                            const Icon = INDUSTRY_ICON_MAP[ind.name] || Building2;
                            const isSelected = industry === ind.name;

                            return (
                              <button
                                key={ind.name}
                                type="button"
                                onClick={() => setIndustry(ind.name)}
                                className={`p-3.5 rounded-none text-left transition-all duration-200 border flex flex-col justify-between h-24 group ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md -translate-y-0.5 hover:bg-emerald-700'
                                    : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-emerald-600 hover:shadow-sm hover:-translate-y-0.5'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className={`w-7 h-7 rounded-none flex items-center justify-center border transition-colors ${
                                    isSelected 
                                      ? 'bg-white/20 border-white/40 text-white' 
                                      : 'bg-white border-slate-200 text-slate-700 group-hover:border-emerald-600 group-hover:text-emerald-600'
                                  }`}>
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  {isSelected ? (
                                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  )}
                                </div>
                                <span className={`text-xs font-bold leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                  {ind.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Current Audience Baseline */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-audience"
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 35 : -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -35 : 35 }}
                        transition={{ duration: 0.24, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              02 // AUDIENCE TRACTION
                            </span>
                            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0F172A] uppercase tracking-[-0.01em]">
                              What is your current audience stage & reach baseline?
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 hidden sm:inline">
                            Single Select
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {STAGES.map((s) => {
                            const isSelected = stage === s.name;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => setStage(s.name)}
                                className={`p-4 rounded-none text-left transition-all border flex items-center justify-between group ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md -translate-y-0.5 hover:bg-emerald-700'
                                    : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-emerald-600 hover:shadow-sm hover:-translate-y-0.5'
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold font-sans tracking-tight ${isSelected ? 'text-white' : 'text-[#0F172A]'}`}>
                                      {s.name}
                                    </span>
                                    <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-none ${
                                      isSelected ? 'bg-white/20 text-white font-bold' : 'bg-slate-200/80 text-slate-700'
                                    }`}>
                                      {s.highlight}
                                    </span>
                                  </div>
                                  <p className={`text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-600'}`}>
                                    {s.sub}
                                  </p>
                                </div>

                                <div className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected 
                                    ? 'border-white bg-white text-emerald-700' 
                                    : 'border-slate-300 bg-white text-transparent group-hover:border-emerald-600'
                                }`}>
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Primary Commercial Objective */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-goal"
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 35 : -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -35 : 35 }}
                        transition={{ duration: 0.24, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              03 // COMMERCIAL GOAL
                            </span>
                            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0F172A] uppercase tracking-[-0.01em]">
                              What is your primary business objective right now?
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 hidden sm:inline">
                            Single Select
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {OBJECTIVES.map((obj) => {
                            const Icon = obj.icon;
                            const isSelected = goal === obj.name;

                            return (
                              <button
                                key={obj.id}
                                type="button"
                                onClick={() => setGoal(obj.name)}
                                className={`p-4 rounded-none text-left transition-all border flex items-start gap-3 group ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md -translate-y-0.5 hover:bg-emerald-700'
                                    : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-emerald-600 hover:shadow-sm hover:-translate-y-0.5'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 mt-0.5 border ${
                                  isSelected 
                                    ? 'bg-white/20 border-white/40 text-white' 
                                    : 'bg-white border-slate-200 text-slate-700 group-hover:text-emerald-600 group-hover:border-emerald-600'
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>

                                <div className="space-y-1">
                                  <span className={`text-xs font-bold font-sans block leading-snug ${isSelected ? 'text-white' : 'text-[#0F172A]'}`}>
                                    {obj.name}
                                  </span>
                                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                                    isSelected ? 'text-emerald-100' : 'text-slate-600'
                                  }`}>
                                    {obj.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Execution Capabilities */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-services"
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 35 : -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -35 : 35 }}
                        transition={{ duration: 0.24, ease: "easeInOut" }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between pb-1">
                          <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              04 // CAPABILITIES & SCOPE
                            </span>
                            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0F172A] uppercase tracking-[-0.01em]">
                              Which execution capabilities does your brand need?
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 hidden sm:inline">
                            Multi-Select ({selectedServices.length} selected)
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {SERVICES.map((srv) => {
                            const isSelected = selectedServices.includes(srv.title);
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => toggleService(srv.title)}
                                className={`px-3.5 py-2.5 rounded-none text-xs transition-all border inline-flex items-center gap-2 ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs -translate-y-0.5 hover:bg-emerald-700'
                                    : 'bg-slate-50/70 hover:bg-white text-slate-700 border-slate-200 hover:border-emerald-600 hover:shadow-2xs'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center text-[8px] ${
                                  isSelected ? 'bg-white text-emerald-700 border-white' : 'border-slate-300 text-transparent'
                                }`}>
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                                <span>{srv.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Slide Navigation Footer Controls (Mobile Responsive) */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border rounded-none transition-all ${
                    currentStep === 0
                      ? 'opacity-30 cursor-not-allowed border-slate-200 text-slate-400 hidden sm:inline-flex'
                      : 'border-slate-300 hover:border-[#0F172A] text-[#0F172A] bg-white hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded-none transition-all shadow-xs group"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-black rounded-none transition-all shadow-xs group text-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="whitespace-nowrap">Send Roadmap to Poojaa</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>
  );
}
