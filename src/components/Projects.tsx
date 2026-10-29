import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data';
import { ArrowUpRightIcon, GithubIcon, SparklesIcon, CheckIcon } from './Icons';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'AI & Machine Learning', 'Full-Stack Systems', 'Core Engineering'];

  const filteredProjects =
    filter === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="section-dark-plum py-24 border-t border-b border-[#E7DFEB]/10 relative"
      aria-label="Featured Projects"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="badge-marigold-dark mb-4">
              <span className="pulsing-marigold-dot" aria-hidden="true" />
              <span>(02) — Featured Engineering Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F1EAE1] tracking-tight mb-4">
              Selected Systems &{' '}
              <span className="text-[#F2B84B]">Architectural Work</span>
            </h2>
            <p className="text-[#E7DFEB] text-base sm:text-lg">
              Production-ready deep learning models, explainable vision pipelines, and scalable web applications built from scratch.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#F2B84B] text-[#211827] font-bold shadow-md'
                    : 'bg-[#403347] text-[#E7DFEB] hover:text-[#F2B84B] border border-[#E7DFEB]/12 hover:border-[#F2B84B]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid in Elevated Plum (#403347) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project: Project) => {
            return (
              <article
                key={project.id}
                className="card-dark-plum flex flex-col justify-between p-6 sm:p-8 group"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs font-semibold text-[#F2B84B] tracking-wider uppercase bg-[#211827]/60 px-2.5 py-1 rounded-md border border-[#F2B84B]/25">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#F2B84B] tracking-wider uppercase font-semibold">
                        <SparklesIcon size={13} />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#F1EAE1] group-hover:text-[#F2B84B] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-[#E7DFEB] mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-[#D4C7DA] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights List */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mb-6 space-y-2">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-[#E7DFEB] leading-relaxed">
                          <CheckIcon size={14} className="text-[#F2B84B] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Metrics Row (if available) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 mb-6 rounded-lg bg-[#211827]/70 border border-[#E7DFEB]/10">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-[#F2B84B]">
                            {m.value}
                          </span>
                          <span className="font-mono text-[10px] text-[#BFAEC6] uppercase tracking-wider">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Section: Tags & Action Links */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pill-dark">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#E7DFEB]/10 flex items-center justify-between">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#F1EAE1] hover:text-[#F2B84B] transition-colors"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <GithubIcon size={15} />
                      <span>View Code</span>
                      <ArrowUpRightIcon size={13} />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F2B84B] text-[#211827] hover:bg-[#E5A838] transition-all"
                        aria-label={`Explore ${project.title} details`}
                      >
                        <span>System Details</span>
                        <ArrowUpRightIcon size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
