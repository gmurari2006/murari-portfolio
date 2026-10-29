import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
} from './Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-dark-aubergine py-24 border-t border-[#E7DFEB]/10 relative"
      aria-label="Contact Gangavarapu Murari"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="badge-marigold-dark mb-4">
            <span className="pulsing-marigold-dot" aria-hidden="true" />
            <span>(06) — Initiate Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F1EAE1] tracking-tight mb-4">
            Let’s Build Something{' '}
            <span className="text-[#F2B84B]">Intelligent Together</span>
          </h2>
          <p className="text-[#E7DFEB] text-base sm:text-lg">
            I am actively exploring AI/ML and software engineering internship opportunities, research collaborations, and impactful technical systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (5 cols) in Elevated Plum */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Email Card */}
            <div className="card-dark-plum p-6 sm:p-7 border-[#F2B84B]/30">
              <span className="font-mono text-xs text-[#F2B84B] tracking-wider uppercase font-semibold">
                Direct Communication
              </span>
              <h3 className="text-xl font-bold text-[#F1EAE1] mt-1 mb-3">
                Send an Email
              </h3>
              <p className="text-xs text-[#D4C7DA] mb-4">
                Feel free to email me directly regarding open roles, technical questions, or project collaborations.
              </p>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#211827]/80 border border-[#E7DFEB]/12 mb-4">
                <span className="font-mono text-xs sm:text-sm text-[#F1EAE1] select-all">
                  {PORTFOLIO_DATA.contact.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-[#F2B84B] transition-colors cursor-pointer"
                  aria-label="Copy email address to clipboard"
                  title="Copy Email"
                >
                  {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                </button>
              </div>

              {copied && (
                <p className="text-xs font-mono text-[#F2B84B] flex items-center gap-1.5 mb-2 font-medium">
                  <CheckIcon size={13} />
                  <span>Email address copied to clipboard!</span>
                </p>
              )}

              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                className="btn-marigold w-full text-center"
              >
                <MailIcon size={16} />
                <span>Open Mail Client</span>
              </a>
            </div>

            {/* Quick Details & Socials Card */}
            <div className="card-dark-plum p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-[#E7DFEB]">
                <div className="p-2 rounded-lg bg-[#211827]/70 text-[#F2B84B] border border-[#E7DFEB]/10">
                  <PhoneIcon size={16} />
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-[#BFAEC6] uppercase">Phone</span>
                  <a
                    href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`}
                    className="text-[#F1EAE1] hover:text-[#F2B84B] font-mono text-xs transition-colors"
                  >
                    {PORTFOLIO_DATA.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E7DFEB]">
                <div className="p-2 rounded-lg bg-[#211827]/70 text-[#F2B84B] border border-[#E7DFEB]/10">
                  <MapPinIcon size={16} />
                </div>
                <div>
                  <span className="block text-[11px] font-mono text-[#BFAEC6] uppercase">Location</span>
                  <span className="text-[#F1EAE1] text-xs">{PORTFOLIO_DATA.contact.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7DFEB]/10 flex items-center justify-between">
                <a
                  href={PORTFOLIO_DATA.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E7DFEB] hover:text-[#F2B84B] transition-colors"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                  <ArrowUpRightIcon size={11} />
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E7DFEB] hover:text-[#F2B84B] transition-colors"
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                  <ArrowUpRightIcon size={11} />
                </a>

                <a
                  href={PORTFOLIO_DATA.contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F2B84B] hover:underline font-semibold"
                >
                  <DownloadIcon size={14} />
                  <span>PDF Résumé</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="card-dark-plum p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#F1EAE1] mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-[#D4C7DA] mb-6">
                Fill in your details below to compose a direct message to Gangavarapu Murari.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-[#E7DFEB] uppercase tracking-wider mb-1.5"
                    >
                      Your Name <span className="text-[#F2B84B]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Satya Nadella"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#211827]/80 border border-[#E7DFEB]/15 text-[#F1EAE1] text-sm focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B] transition-all placeholder:text-[#BFAEC6]/60"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-[#E7DFEB] uppercase tracking-wider mb-1.5"
                    >
                      Your Email <span className="text-[#F2B84B]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#211827]/80 border border-[#E7DFEB]/15 text-[#F1EAE1] text-sm focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B] transition-all placeholder:text-[#BFAEC6]/60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-[#E7DFEB] uppercase tracking-wider mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Summer 2026 AI Internship Inquiry"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#211827]/80 border border-[#E7DFEB]/15 text-[#F1EAE1] text-sm focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B] transition-all placeholder:text-[#BFAEC6]/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-[#E7DFEB] uppercase tracking-wider mb-1.5"
                  >
                    Message <span className="text-[#F2B84B]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the opportunity, project context, or question..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#211827]/80 border border-[#E7DFEB]/15 text-[#F1EAE1] text-sm focus:border-[#F2B84B] focus:ring-1 focus:ring-[#F2B84B] transition-all placeholder:text-[#BFAEC6]/60 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-[#BFAEC6]">
                    Direct delivery to g.murari2006@gmail.com
                  </span>
                  <button type="submit" className="btn-marigold">
                    <MailIcon size={15} />
                    <span>Send Message</span>
                  </button>
                </div>

                {formSubmitted && (
                  <p className="mt-2 text-xs font-mono text-[#F2B84B] flex items-center gap-1.5">
                    <CheckIcon size={14} />
                    <span>Preparing email client... Thank you for reaching out!</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
