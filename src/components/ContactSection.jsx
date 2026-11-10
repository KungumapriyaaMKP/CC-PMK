import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Globe,
  Compass,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from './BrandIcons';
import { AGENCY_INFO, SERVICES } from '../data/content';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    service: SERVICES[0].title,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Poojaa,
Name: ${formData.name || 'Visitor'}
Brand: ${formData.brandName || 'Not specified'}
Service Interested: ${formData.service}
Message: ${formData.message || 'I would like to discuss social media growth for my brand.'}`;
    window.open(`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-white border border-slate-300 text-slate-800 text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-none shrink-0" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Your Brand Has Potential. Let's Build Its Digital Presence.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Whether you are a startup establishing your identity, a business looking to improve social media ROI, or an executive building a personal brand, let's create something meaningful.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Card Box */}
            <div className="rounded-3xl bg-navy-deep text-white p-7 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-skybrand-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <span className="text-xs font-mono font-bold text-skybrand-300 uppercase tracking-wider">
                  Direct Contact & Representation
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-white mt-1">
                  {AGENCY_INFO.founder}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {AGENCY_INFO.founderTitle}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-skybrand-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Headquarters</span>
                    <span className="text-white font-medium">{AGENCY_INFO.location}</span>
                  </div>
                </div>

                {/* WhatsApp / Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-skybrand-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Phone / WhatsApp</span>
                    <a 
                      href={`https://wa.me/${AGENCY_INFO.phoneRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-skybrand-300 font-bold transition-colors"
                    >
                      {AGENCY_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-skybrand-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Professional Email</span>
                    <a 
                      href={`mailto:${AGENCY_INFO.email}`}
                      className="text-white hover:text-skybrand-300 font-bold transition-colors"
                    >
                      {AGENCY_INFO.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent("Hi Poojaa, I would like to schedule a 30-minute discovery consultation for my brand.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Social Media Hub */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
              <h4 className="font-heading font-bold text-sm text-navy-900 uppercase tracking-wider">
                Official Channels & Handles
              </h4>

              <div className="space-y-2.5">
                <a
                  href={AGENCY_INFO.agencyInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                    <div>
                      <div className="text-xs font-bold text-navy-900">Career Compass Social</div>
                      <div className="text-[11px] text-slate-500">@{AGENCY_INFO.agencyInstagram}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-navy-900 transition-colors" />
                </a>

                <a
                  href={AGENCY_INFO.personalInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="text-xs font-bold text-navy-900">Poojaa Muthukumar (Creator)</div>
                      <div className="text-[11px] text-slate-500">@{AGENCY_INFO.personalInstagram}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-navy-900 transition-colors" />
                </a>

                <a
                  href={AGENCY_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-navy-900">LinkedIn Company Page</div>
                      <div className="text-[11px] text-slate-500">Career Compass Social</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-navy-900 transition-colors" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-10 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-skybrand-600 uppercase tracking-wider">
                  Inquiry & Consultation Form
                </span>
                <h3 className="font-heading text-2xl font-bold text-navy-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500">
                  Fill out the form below for a tailored response within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-skybrand-50 border border-skybrand-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-skybrand-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-navy-900">
                      Inquiry Received
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                      Thank you for contacting Career Compass Social. Poojaa will review your brand details and reach out shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-skybrand-700 underline"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Brand / Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                        placeholder="e.g. Zenith Interiors"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. ananya@company.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Service of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Complete Agency Retainer">Complete Agency Retainer</option>
                      <option value="Personal Brand Strategy">Personal Brand Strategy</option>
                      <option value="Other Custom Project">Other Custom Project</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Your Goals & Current Challenges
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your current followers, targets, upcoming product launches, or bottlenecks."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-navy-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-skybrand-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-navy-deep hover:bg-navy-900 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <Send className="w-4 h-4 text-skybrand-400" />
                      <span>Send Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
