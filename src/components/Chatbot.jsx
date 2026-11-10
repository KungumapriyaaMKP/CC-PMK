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


// Robust intent detection for gibberish, casual banter, greetings, pricing, and domain queries
function detectIntent(rawQuery) {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // 1. Single character or pure punctuation
  if (query.length <= 1 || /^[^a-zA-Z0-9]+$/.test(query)) {
    return {
      type: 'help',
      response: "How can I help you today? You can ask about **Poojaa Muthukumar's background**, our **5 core growth services**, **how we engineered 11M reel views**, or our **Chennai & Dubai on-location shoot companion**.",
      quickLinks: [
        { label: "What Services Do You Offer?", question: "What services do you offer?" },
        { label: "How Did You Hit 11M Views?", question: "How did you hit 11M views?" },
        { label: "View Client Work", anchor: "#case-studies" }
      ]
    };
  }

  const cleanChars = lower.replace(/[^a-z]/g, '');
  const vowels = (cleanChars.match(/[aeiouy]/g) || []).length;
  const uniqueChars = new Set(cleanChars).size;

  // 2. Laughs / Fun reactions (e.g. haha, lol, hehe)
  if (/^(ha|he|lol|lmao|rofl|xd)+$/i.test(cleanChars)) {
    return {
      type: 'humor',
      response: "Glad to bring good energy to your screen! Whenever you're ready, let me know what questions you have about growing your brand's social presence.",
      quickLinks: [
        { label: "Explore Services", anchor: "#services" },
        { label: "How Did You Hit 11M Views?", question: "How did you hit 11M views?" }
      ]
    };
  }

  // 3. Gibberish / Keyboard Smash / Repeated letters (e.g. nnjjkjjjj, asdfghjk, aaaaa, zzzzz)
  const isAllConsonants = cleanChars.length >= 4 && vowels === 0;
  const hasExtremelyLowVowels = cleanChars.length >= 7 && (vowels / cleanChars.length) < 0.15;
  const hasRepeatedSequence = /(.)\1{3,}/.test(lower); // 4+ repeated chars in a row
  const hasLowEntropySmash = cleanChars.length >= 6 && uniqueChars <= 3; // e.g. nnjjkjjjj (3 unique chars in 9)

  if (isAllConsonants || hasExtremelyLowVowels || hasRepeatedSequence || hasLowEntropySmash) {
    return {
      type: 'gibberish',
      response: "I didn't quite catch that! It looks like some random characters or a typo was entered.\n\nHere are the most helpful topics you can explore right now:",
      quickLinks: [
        { label: "What Services Do You Offer?", question: "What services do you offer?" },
        { label: "How Did You Hit 11M Views?", question: "How did you hit 11M views?" },
        { label: "View Client Work", anchor: "#case-studies" },
        { label: "Chat on WhatsApp Directly", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I'd like to discuss social media strategy for my brand.")}`, external: true }
      ]
    };
  }

  // 4. Greetings (hi, hello, hey, good morning, etc.)
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'hola', 'namaste', 'vanakkam', 'yo', 'sup', 'whats up', "what's up"];
  if (greetings.some(g => lower === g || lower.startsWith(g + ' ') || lower.endsWith(' ' + g))) {
    return {
      type: 'greeting',
      response: "Hello! Welcome to **Career Compass**. I'm Poojaa's AI assistant.\n\nAre you looking to scale your brand's social presence, produce viral vertical reels, or learn how we combine **creative storytelling with data analytics**?",
      quickLinks: [
        { label: "Explore Services", anchor: "#services" },
        { label: "How 11M Views Was Hit", question: "How did you hit 11M views?" },
        { label: "Request A Project Audit", anchor: "#growth-calculator" }
      ]
    };
  }

  // 5. Gratitude / Acknowledgment (thanks, cool, awesome, ok)
  const thanks = ['thank you', 'thanks', 'thx', 'thank u', 'appreciate it', 'awesome', 'great', 'cool', 'perfect', 'nice', 'ok', 'okay', 'got it', 'sure', 'alright'];
  if (thanks.some(t => lower === t || lower.startsWith(t + ' ') || lower.endsWith(' ' + t))) {
    return {
      type: 'thanks',
      response: "You're very welcome! If there's anything else you'd like to explore about our workflow, deliverables, or scheduling an on-location shoot companion in Chennai or Dubai, feel free to ask anytime.",
      quickLinks: [
        { label: "View Our Work Process", anchor: "#process" },
        { label: "Talk With Poojaa on WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I'd like to schedule a 1-on-1 strategy call.")}`, external: true }
      ]
    };
  }

  // 6. Pricing / Cost / Budget / Packages
  const pricingKeywords = ['price', 'pricing', 'cost', 'how much', 'budget', 'rate', 'rates', 'fee', 'fees', 'quote', 'package', 'packages', 'charge'];
  if (pricingKeywords.some(kw => lower.includes(kw))) {
    return {
      type: 'pricing',
      response: "Career Compass offers customized partnership scopes based on your brand's growth phase:\n\n- **Full Social Media Management**: End-to-end strategy, scripting, filming direction, kinetic editing & community growth.\n- **On-Location Shoot Companion**: Chennai & Dubai on-set directing & teleprompter-free coaching.\n- **Strategic Account Audit**: Comprehensive diagnostic of hooks, viewer retention curves & conversion bottlenecks.\n\nBecause deliverables are customized to your specific industry and goals, Poojaa provides a tailored scope after a brief diagnostic.",
      quickLinks: [
        { label: "Calculate Growth Scope", anchor: "#growth-calculator" },
        { label: "Get Custom Quote on WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to get a pricing quote for social media management.")}`, external: true }
      ]
    };
  }

  // 7. Location / Base / Office / Cities
  const locationKeywords = ['location', 'where are you', 'city', 'office', 'chennai', 'dubai', 'base', 'address', 'travel'];
  if (locationKeywords.some(kw => lower.includes(kw))) {
    return {
      type: 'location',
      response: "Career Compass is headquartered in **Chennai, India**, with active on-location production companion services in **Dubai, UAE** and select travel destinations.\n\nWe partner with founders and enterprise brands across India, the Middle East, and globally via structured remote content pipelines.",
      quickLinks: [
        { label: "Book Shoot Companion", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I want to inquire about shoot companion in Chennai/Dubai.")}`, external: true },
        { label: "Jump to Contact Form", anchor: "#contact" }
      ]
    };
  }

  // 8. Knowledge Base matching
  let match = KNOWLEDGE_BASE.find(item => 
    item.keywords.some(kw => lower.includes(kw))
  );

  if (match) {
    return {
      type: 'knowledge',
      response: match.response,
      quickLinks: match.quickLinks
    };
  }

  // 9. FAQ matching
  const foundFaq = FAQS.find(f => 
    f.q.toLowerCase().split(' ').some(word => word.length > 3 && lower.includes(word))
  );
  if (foundFaq) {
    return {
      type: 'faq',
      response: `**${foundFaq.q}**\n\n${foundFaq.a}`,
      quickLinks: [
        { label: "Chat With Poojaa on WhatsApp", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(`Hi Poojaa, I have a question regarding: "${foundFaq.q}"`)}`, external: true }
      ]
    };
  }

  // 10. Graceful Fallback (clean WhatsApp message without raw query)
  return {
    type: 'fallback',
    response: "Thank you for asking! For custom strategy inquiries or specific requirements, Poojaa is directly available for a 1-on-1 diagnostic discussion.\n\nWould you like to connect directly on WhatsApp or review our verified client work?",
    quickLinks: [
      { label: "Chat With Poojaa Directly", url: `https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I have a specific question about growing my brand.")}`, external: true },
      { label: "Explore Client Work", anchor: "#case-studies" },
      { label: "Calculate Growth Scope", anchor: "#growth-calculator" }
    ]
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
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
    }
  }, [messages, isOpen]);

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
                <div className="flex items-center gap-2 p-3 max-w-[140px] bg-white border border-slate-300 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-xs font-sans text-slate-600 font-medium">Thinking...</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
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
