import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight,
  ExternalLink,
  Bot, 
  User, 
  PhoneCall, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { AGENCY_INFO, METRICS, SERVICES, CASE_STUDIES, FAQS } from '../data/content';

// Curated Knowledge Base for intelligent conversational matching
const KNOWLEDGE_BASE = [
  {
    keywords: ["who", "poojaa", "pooja", "founder", "background", "about her", "experience", "analyst"],
    response: `**Poojaa Muthukumar** is a Social Media Growth Strategist, Content Creator (@poojaa_kumar_28), and former Enterprise Data Analyst with 6 years of technical background (SQL, Python, PySpark, Athena).\n\nShe founded **Career Compass Social** to combine behavioral psychology, cinematic vertical storytelling, and rigorous data analytics into reproducible social media revenue engines for high-performing brands.`,
    quickLinks: [
      { label: "View Her Instagram", url: AGENCY_INFO.personalInstagramUrl, external: true },
      { label: "LinkedIn Profile", url: AGENCY_INFO.linkedinUrl, external: true }
    ]
  },
  {
    keywords: ["services", "offer", "package", "what do you do", "help", "management", "pricing", "cost"],
    response: `Career Compass Social provides full-cycle social growth architecture across 5 core pillars:\n\n1. **Full-Service Social Media Management** (Strategy, content calendar, daily publishing & community management)\n2. **Content Strategy & Narrative Roadmapping** (Hook architecture, demographic research & positioning)\n3. **On-Location Video Production & Shoot Companion** (Available in Chennai, Dubai & travel locations)\n4. **High-Retention Video Editing** (Visual pacing, sound design & 3-second drop-off prevention)\n5. **Strategic Account Audits & Diagnostics** (Data-backed retention curve and bottleneck diagnosis)`,
    quickLinks: [
      { label: "Explore Services Section", anchor: "#services" },
      { label: "Request Growth Scope", anchor: "#growth-calculator" }
    ]
  },
  {
    keywords: ["11m", "views", "results", "metrics", "client work", "portfolio", "clients", "proof", "banu", "resilio", "case study", "works"],
    response: `Our documented client milestones include:\n\n- **11 Million Views**: Single viral reel peak for a Dubai Real Estate investor starting from only 6,500 followers.\n- **2 Crore+ Views**: Generated in a single 30-day client campaign.\n- **46,500+ Patient Community**: Built organically for Resilio Pain Clinic through 30 ethical medical videos.\n- **4,500+ Followers in 7 Days**: Recorded within one week of a strategic campaign rollout.`,
    quickLinks: [
      { label: "View Client Work", anchor: "#case-studies" },
      { label: "Chat on WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I saw your 11M views milestone and want to discuss similar growth for my brand.")}`, external: true }
    ]
  },
  {
    keywords: ["shoot", "companion", "chennai", "dubai", "video", "production", "location", "camera"],
    response: `Yes! For brands and founders in **Chennai and Dubai**, Poojaa offers hands-on **On-Location Shoot Companionship**.\n\nShe personally joins you on-set to handle camera confidence coaching, hook pacing, dynamic vertical staging, lighting, and teleprompter-free delivery so you feel charismatic and natural on camera.`,
    quickLinks: [
      { label: "Book Shoot Companion", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I want to book an on-location shoot companion in Chennai/Dubai.")}`, external: true }
    ]
  },
  {
    keywords: ["contact", "reach", "email", "phone", "whatsapp", "hire", "book", "meeting", "call"],
    response: `You can reach Poojaa and the Career Compass team directly through:\n\n- **WhatsApp**: +91 74484 73440\n- **Email**: Compasscareer04@gmail.com\n- **Base**: Chennai, India (Serving clients worldwide)\n- **Instagram**: @career.compass.in & @poojaa_kumar_28`,
    quickLinks: [
      { label: "Direct WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to schedule a strategy call.")}`, external: true },
      { label: "Jump to Contact Form", anchor: "#contact" }
    ]
  },
  {
    keywords: ["data", "analytics", "difference", "edge", "why", "choose"],
    response: `Most agencies rely solely on creative intuition and vanity metrics. Poojaa brings **6 years of enterprise Data Analytics experience** using SQL, Python, PySpark, and AWS Athena.\n\nThis means every reel, caption, and hook is diagnosed against viewer drop-off curves, algorithm retention data, and audience conversion rates to make empirical decisions backed by hard numbers.`,
    quickLinks: [
      { label: "Explore Data Edge", anchor: "#data-advantage" }
    ]
  }
];

const SUGGESTED_QUESTIONS = [
  "What services does Career Compass offer?",
  "How did Poojaa achieve 11M views on a reel?",
  "Do you provide shoot companion in Chennai / Dubai?",
  "How does Poojaa's data background help my brand?",
  "How can I work with Poojaa?"
];


// Parse bold text and bullet/number lists for high-contrast, bright editorial presentation
function renderInlineText(str) {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={i} className="font-bold text-[#0F172A] bg-amber-200/50 px-1 py-0.5 border-b-2 border-amber-400">
          {boldContent}
        </strong>
      );
    }
    return part;
  });
}

function renderFormattedBotText(text) {
  if (!text) return null;
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-[13px] leading-relaxed font-sans text-slate-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-xs" />
              <div className="flex-1 text-slate-800 leading-relaxed font-medium">{renderInlineText(itemText)}</div>
            </div>
          );
        }

        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const itemText = numMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 py-0.5">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0F172A] text-white font-mono font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                {num}
              </span>
              <div className="flex-1 text-slate-800 leading-relaxed font-medium">{renderInlineText(itemText)}</div>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed text-slate-800 font-medium">
            {renderInlineText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [showPromptBanner, setShowPromptBanner] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! I'm the **Career Compass AI Assistant**. Ask me anything about Poojaa Muthukumar's background, client work, services, or how we engineer viral social growth.`,
      quickLinks: [
        { label: "What Services Do You Offer?", question: "What services do you offer?" },
        { label: "How Did You Hit 11M Views?", question: "How did you hit 11M views?" }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowPromptBanner(false);
    }
  }, [messages, isOpen]);

  // Hide initial prompt banner after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromptBanner(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (textToSend = input) => {
    const query = textToSend.trim();
    if (!query) return;

    // Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Formulate answer from knowledge base
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let match = KNOWLEDGE_BASE.find(item => 
        item.keywords.some(kw => lowerQuery.includes(kw))
      );

      // Also check FAQ items
      if (!match) {
        const foundFaq = FAQS.find(f => 
          f.q.toLowerCase().split(' ').some(word => word.length > 3 && lowerQuery.includes(word))
        );
        if (foundFaq) {
          match = {
            response: `**${foundFaq.q}**\n\n${foundFaq.a}`,
            quickLinks: [
              { label: "Chat With Poojaa on WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Poojaa, I have a question regarding: "${foundFaq.q}"`)}`, external: true }
            ]
          };
        }
      }

      const botResponse = match 
        ? match.response 
        : `Thank you for asking! For custom requirements or detailed strategy inquiries, Poojaa is directly available for a 1-on-1 diagnostic discussion. Would you like to connect directly on WhatsApp or review our client work?`;

      const botLinks = match?.quickLinks || [
        { label: "Chat with Poojaa Directly", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Poojaa, I asked your AI assistant: "${query}" and would love to speak directly.`)}`, external: true },
        { label: "Start A Project Audit", anchor: "#growth-calculator" }
      ];

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        quickLinks: botLinks
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNavigate = (anchor) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      
      {/* Floating Prompt Bubble on Initial Visit */}
      <AnimatePresence>
        {!isOpen && showPromptBanner && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-2 w-72 p-3 bg-white border border-slate-300 shadow-xl rounded-none text-slate-800 text-xs flex items-start gap-2.5 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setHasOpenedBefore(true);
            }}
          >
            <div className="w-6 h-6 rounded-none bg-[#0F172A] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[#0F172A]">Have a question?</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Ask our AI assistant about Poojaa's background, client work, or strategy packages!
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPromptBanner(false);
              }}
              className="text-slate-400 hover:text-slate-800"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setHasOpenedBefore(true);
          }}
          className="relative w-14 h-14 bg-[#0F172A] hover:bg-black text-white shadow-2xl border border-white/20 flex items-center justify-center rounded-none transition-all group"
          aria-label="Open Career Compass Assistant Chat"
        >
          {/* Active online radar pulse */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </motion.button>
      )}

      {/* Main Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white border border-slate-300 shadow-2xl rounded-none flex flex-col overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div>
                <h3 className="font-sans font-bold text-sm tracking-tight leading-snug">
                  Poojaa & Career Compass AI
                </h3>
                <p className="text-[10px] font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online | Growth Assistant</span>
                </p>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I was browsing your website assistant and want to chat directly.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-colors"
                  title="Direct WhatsApp"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Question Chips (Scrollable) */}
            <div className="p-2.5 bg-white border-b border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-600 tracking-wider shrink-0 pl-1">
                Suggested:
              </span>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-3 py-1.5 text-xs font-sans font-semibold bg-slate-50 hover:bg-[#0F172A] text-slate-800 hover:text-white border border-slate-300 hover:border-[#0F172A] transition-all shadow-2xs cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Conversation Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-100/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'user' ? (
                    <div className="max-w-[85%] bg-[#0F172A] text-white p-3.5 shadow-sm text-right space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                        You
                      </div>
                      <div className="text-[13px] font-sans font-medium leading-relaxed text-white">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[92%] sm:max-w-[88%] bg-white border border-slate-300 shadow-sm p-4 text-left space-y-3">
                      {/* Bot Header Ribbon */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#0F172A]">
                            Career Compass AI
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ONLINE
                        </span>
                      </div>

                      {/* Formatted Text Content */}
                      <div>
                        {renderFormattedBotText(msg.text)}
                      </div>

                      {/* Quick action buttons attached to bot message */}
                      {msg.quickLinks && msg.quickLinks.length > 0 && (
                        <div className="pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                          {msg.quickLinks.map((link, i) => (
                            link.question ? (
                              <button
                                key={i}
                                onClick={() => handleSend(link.question)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-black text-white text-xs font-sans font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer"
                              >
                                <span>{link.label}</span>
                                <ArrowRight className="w-3 h-3 text-emerald-400" />
                              </button>
                            ) : link.anchor ? (
                              <button
                                key={i}
                                onClick={() => handleNavigate(link.anchor)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-900 text-slate-900 hover:text-white border-2 border-slate-900 text-xs font-sans font-bold transition-all shadow-xs cursor-pointer"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-sans font-bold transition-all shadow-xs hover:shadow-sm"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 max-w-[100px] bg-white border border-slate-300 text-slate-400 text-xs shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Poojaa, client work, services..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:border-[#0F172A] focus:bg-white text-slate-900 placeholder:text-slate-400 font-sans"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="px-3 py-2 bg-[#0F172A] hover:bg-black disabled:bg-slate-300 text-white transition-colors rounded-none flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtle disclaimer */}
            <div className="px-3 py-1 bg-slate-100 border-t border-slate-200 text-[9.5px] font-mono text-slate-500 text-center">
              Direct response engine • For enterprise inquiries: +91 74484 73440
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
