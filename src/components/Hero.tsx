import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, SparklesIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section
      className="section-dark-aubergine relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden"
      aria-label="Hero Introduction"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Availability Status Badge */}
          <div className="badge-marigold-dark mb-8">
            <span className="pulsing-marigold-dot" aria-hidden="true" />
            <span>{PORTFOLIO_DATA.status.text}</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1EAE1] mb-6">
            Engineering Intelligent AI Systems &{' '}
            <span className="text-[#F2B84B]">Modern Web Architectures</span>
          </h1>

          {/* Subheading Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-[#E7DFEB] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Hi, I’m <span className="text-[#F1EAE1] font-semibold">Gangavarapu Murari</span>. Computer Science & AI/ML
            undergraduate at <span className="text-[#F1EAE1] font-medium">G. D. Goenka University</span> (8.56 CGPA).
            Designing deep learning models with explainability, scalable cloud backends, and constraint optimization systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a href="#projects" className="btn-marigold">
              <SparklesIcon size={17} />
              <span>{PORTFOLIO_DATA.hero.primaryCta}</span>
            </a>
            <a
              href={PORTFOLIO_DATA.hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark-outline"
            >
              <DownloadIcon size={17} className="text-[#F2B84B]" />
              <span>{PORTFOLIO_DATA.hero.secondaryCta}</span>
            </a>
            <a href="#contact" className="btn-dark-outline">
              <MailIcon size={17} className="text-[#F2B84B]" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Quick Social & Location Bar */}
          <div className="flex items-center gap-6 text-[#E7DFEB] text-xs font-mono mb-16">
            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F2B84B] transition-colors"
            >
              <GithubIcon size={16} />
              <span>github.com/gmurari2006</span>
            </a>
            <span className="text-[#E7DFEB]/30">•</span>
            <a
              href={PORTFOLIO_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F2B84B] transition-colors"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
            <span className="text-[#E7DFEB]/30 hidden sm:inline">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#BFAEC6]">
              <span>Gurugram / Delhi NCR</span>
            </span>
          </div>

          {/* Key Metrics / Highlights Grid in Elevated Plum (#403347) */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="card-dark-plum p-5 flex flex-col items-center text-center"
              >
                <span className="font-mono text-3xl md:text-4xl font-bold text-[#F2B84B] mb-1.5 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-[#F1EAE1] mb-1 leading-snug">
                  {stat.label}
                </span>
                <span className="font-mono text-[11px] text-[#BFAEC6] leading-tight">
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
