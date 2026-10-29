import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { BrainIcon, CodeIcon, CpuIcon, LayersIcon, GraduationCapIcon } from './Icons';

export const SkillsEducation: React.FC = () => {
  const getIconForCategory = (idx: number) => {
    switch (idx) {
      case 0:
        return <BrainIcon size={22} className="text-[#944D33]" />;
      case 1:
        return <CodeIcon size={22} className="text-[#944D33]" />;
      case 2:
        return <LayersIcon size={22} className="text-[#944D33]" />;
      case 3:
      default:
        return <CpuIcon size={22} className="text-[#944D33]" />;
    }
  };

  return (
    <section
      id="skills"
      className="section-light-ivory py-24 border-t border-b border-[#211827]/10 relative"
      aria-label="Skills and Education"
    >
      <div className="container-custom">
        {/* ======================================================== */}
        {/* PART 1: TECHNICAL ARSENAL (SKILLS)                       */}
        {/* ======================================================== */}
        <div className="flex flex-col items-start max-w-2xl mb-14">
          <div className="badge-copper-light mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" aria-hidden="true" />
            <span>(03) — Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#211827] tracking-tight mb-4">
            Technologies, Frameworks &{' '}
            <span className="text-[#944D33]">Core Tooling</span>
          </h2>
          <p className="text-[#48384F] text-base sm:text-lg">
            A comprehensive stack honed across machine learning pipelines, systems programming, and high-throughput web applications.
          </p>
        </div>

        {/* 4-Category Grid on Warm Ivory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="card-light-ivory p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-[#B86F52]/10 border border-[#B86F52]/25">
                    {getIconForCategory(idx)}
                  </div>
                  <h3 className="text-xl font-bold text-[#211827]">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-xs text-[#48384F] mb-6 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`pill-light ${skill.featured ? 'featured font-semibold' : ''}`}
                    >
                      {skill.name}
                      {skill.featured && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B86F52] ml-2" aria-hidden="true" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Note */}
              <div className="mt-8 pt-4 border-t border-[#211827]/10 flex items-center justify-between text-[11px] font-mono text-[#64516B]">
                <span>Validated in Coursework & Production Repos</span>
                <span className="text-[#944D33] font-semibold">{cat.skills.length} Competencies</span>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* PART 2: ACADEMIC PATHWAY (EDUCATION)                     */}
        {/* ======================================================== */}
        <div id="education" className="pt-6 border-t border-[#211827]/10">
          <div className="flex flex-col items-start max-w-2xl mb-12">
            <div className="badge-copper-light mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B86F52]" aria-hidden="true" />
              <span>(04) — Academic Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#211827] tracking-tight mb-3">
              Academic Pathway & Degree Specialization
            </h2>
            <p className="text-[#48384F] text-base">
              Consistent analytical excellence at G. D. Goenka University and distinguished pre-university honors.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#211827]/15 flex flex-col gap-10 max-w-3xl">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Milestone Dot */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#FAF6F0] border-2 border-[#B86F52] group-hover:bg-[#F2B84B] transition-colors" />

                <span className="font-mono text-xs font-semibold text-[#944D33] tracking-wider uppercase">
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold text-[#211827] mt-1">
                  {edu.institution}
                </h3>
                <p className="text-sm font-medium text-[#48384F] mt-0.5">
                  {edu.degree}
                </p>

                {edu.score && (
                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2B84B]/20 border border-[#F2B84B]/50 text-xs font-mono font-bold text-[#211827]">
                    <span>{edu.score}</span>
                    {edu.scoreLabel && <span className="text-[#64516B] font-normal">• {edu.scoreLabel}</span>}
                  </div>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-3.5 space-y-1.5 text-xs text-[#48384F] leading-relaxed">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#B86F52] mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
