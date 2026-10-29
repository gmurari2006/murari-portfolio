import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { AwardIcon, CheckIcon } from './Icons';

export const Achievements: React.FC = () => {
  return (
    <section
      id="achievements"
      className="section-dark-plum py-24 border-t border-b border-[#E7DFEB]/10 relative"
      aria-label="Verified Achievements and Honors"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-14">
          <div className="badge-marigold-dark mb-4">
            <span className="pulsing-marigold-dot" aria-hidden="true" />
            <span>(05) — Competitive & Professional Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F1EAE1] tracking-tight mb-4">
            Podiums, Delegations &{' '}
            <span className="text-[#F2B84B]">Verified Credentials</span>
          </h2>
          <p className="text-[#E7DFEB] text-base sm:text-lg">
            A restrained record of state-level hackathon recognition, national AI summit representation, and production deployments.
          </p>
        </div>

        {/* Dark Panels Grid with Warm Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.achievements.map((ach) => (
            <div
              key={ach.id}
              className="card-dark-plum p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-semibold text-[#F2B84B] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#211827]/70 border border-[#F2B84B]/30">
                    {ach.category}
                  </span>
                  <span className="font-mono text-xs text-[#BFAEC6]">
                    {ach.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F1EAE1] group-hover:text-[#F2B84B] transition-colors mb-1.5 leading-snug">
                  {ach.title}
                </h3>

                <p className="font-mono text-xs text-[#BFAEC6] mb-3">
                  {ach.organization}
                </p>

                <p className="text-xs text-[#E7DFEB] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E7DFEB]/10 flex items-center gap-2 text-xs font-mono text-[#F2B84B] font-semibold">
                <CheckIcon size={14} className="text-[#F2B84B]" />
                <span>{ach.badgeText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
