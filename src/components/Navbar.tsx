import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data';
import { GithubIcon, LinkedinIcon, DownloadIcon, MenuIcon, CloseIcon } from './Icons';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills & Education', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      // Section spy
      const sections = ['about', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="editorial-header">
      <div className="container-custom flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 text-[#F1EAE1] no-underline group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B84B] rounded-lg p-1"
          aria-label="Gangavarapu Murari Portfolio Home"
        >
          <div className="editorial-avatar group-hover:border-[#F2B84B]/60">
            GM
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#F1EAE1] group-hover:text-[#F2B84B] transition-colors leading-tight">
              {PORTFOLIO_DATA.name.full}
            </span>
            <span className="font-mono text-[11px] text-[#BFAEC6] tracking-wider uppercase leading-tight">
              AI & Full-Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center editorial-nav-capsule">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`editorial-nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#E7DFEB] hover:text-[#F2B84B] hover:bg-white/[0.06] transition-colors"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon size={19} />
          </a>
          <a
            href={PORTFOLIO_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#E7DFEB] hover:text-[#F2B84B] hover:bg-white/[0.06] transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon size={19} />
          </a>
          <a
            href={PORTFOLIO_DATA.hero.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-resume-btn"
          >
            <DownloadIcon size={14} className="text-[#F2B84B]" />
            <span>Résumé</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#E7DFEB] hover:text-[#F2B84B] border border-[#E7DFEB]/10 focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden editorial-mobile-drawer">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`px-4 py-2.5 rounded-lg text-sm font-mono tracking-wide ${
                    isActive
                      ? 'bg-[#F2B84B] text-[#211827] font-bold'
                      : 'text-[#E7DFEB] hover:text-[#F2B84B] hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[#E7DFEB]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#E7DFEB] hover:text-[#F2B84B]"
                  aria-label="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href={PORTFOLIO_DATA.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#E7DFEB] hover:text-[#F2B84B]"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
              <a
                href={PORTFOLIO_DATA.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-full bg-[#F2B84B] text-[#211827] font-bold"
              >
                <DownloadIcon size={14} />
                <span>Download Résumé</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
