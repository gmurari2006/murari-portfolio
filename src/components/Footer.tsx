import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="section-dark-aubergine py-12 border-t border-[#E7DFEB]/12 relative z-10"
      aria-label="Portfolio Footer"
    >
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Education */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-[#F1EAE1] tracking-tight">
              {PORTFOLIO_DATA.name.full}
            </span>
            <span className="text-[#E7DFEB]/30">•</span>
            <span className="font-mono text-xs text-[#F2B84B] font-semibold">
              B.Tech CSE (AI & ML)
            </span>
          </div>
          <p className="font-mono text-xs text-[#BFAEC6]">
            G. D. Goenka University, Gurugram • Class of 2028
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-[#E7DFEB]">
          <a
            href={PORTFOLIO_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-[#F2B84B] hover:bg-white/[0.05] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={PORTFOLIO_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-[#F2B84B] hover:bg-white/[0.05] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.contact.email}`}
            className="p-2 rounded-lg hover:text-[#F2B84B] hover:bg-white/[0.05] transition-colors"
            aria-label="Email"
          >
            <MailIcon size={18} />
          </a>
        </div>

        {/* Right: Back to Top & Build info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1.5">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F2B84B] hover:underline cursor-pointer font-bold"
          >
            <span>Back to top</span>
            <span className="rotate-180 inline-block">
              <ArrowDownIcon size={13} />
            </span>
          </button>
          <span className="text-[11px] font-mono text-[#BFAEC6]">
            © {new Date().getFullYear()} Gangavarapu Murari. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
