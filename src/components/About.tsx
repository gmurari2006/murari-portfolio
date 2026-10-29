import React from 'react';
import { PORTFOLIO_DATA } from '../data';
import { BrainIcon, CpuIcon, LayersIcon, GraduationCapIcon } from './Icons';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section-light-ivory py-24 border-t border-b border-[#211827]/10 relative"
      aria-label="About Gangavarapu Murari"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="badge-copper-light mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B86F52]" aria-hidden="true" />
            <span>(01) — Background & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#211827] tracking-tight mb-4">
            Where Machine Intelligence Meets{' '}
            <span className="text-[#944D33]">Production Engineering</span>
          </h2>
          <p className="text-[#48384F] text-base sm:text-lg">
            Driven by curiosity for how neural architectures compute, and disciplined in how reliable software is shipped.
          </p>
        </div>

        {/* Narrative & Focus Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Narrative & University Spotlight */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="card-light-ivory p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#211827] mb-4 flex items-center gap-2">
                <span>The Story So Far</span>
              </h3>
              <div className="flex flex-col gap-4 text-[#48384F] text-sm sm:text-base leading-relaxed">
                {PORTFOLIO_DATA.about.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* University Spotlight Editorial Card */}
            <div className="card-light-ivory p-6 border-[#B86F52]/30 bg-[#FAF6F0]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#B86F52]/10 border border-[#B86F52]/25 text-[#944D33]">
                  <GraduationCapIcon size={24} />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#944D33] tracking-wider uppercase font-semibold">
                    Current Academics (2024 — 2028)
                  </span>
                  <h4 className="text-base font-bold text-[#211827] mt-1">
                    G. D. Goenka University
                  </h4>
                  <p className="text-xs text-[#48384F] mt-0.5">
                    B.Tech in Computer Science and Engineering (AI & ML)
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B84B]/20 border border-[#F2B84B]/50 font-mono text-xs text-[#211827] font-bold">
                    <span>CGPA: 8.56 / 10.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#64516B] mb-1 font-semibold">
              Core Technical Competencies
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Pillar 1 */}
              <div className="card-light-ivory p-6 flex flex-col sm:flex-row items-start gap-5 group">
                <div className="p-3.5 rounded-xl bg-[#B86F52]/10 border border-[#B86F52]/25 text-[#944D33] shrink-0 group-hover:scale-105 transition-transform">
                  <BrainIcon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#211827] group-hover:text-[#944D33] transition-colors mb-2">
                    Deep Learning & Explainable AI (XAI)
                  </h3>
                  <p className="text-sm text-[#48384F] leading-relaxed mb-3">
                    Designing convolutional vision pipelines and transformers with integrated Grad-CAM diagnostic heatmaps, ensuring healthcare and mission-critical predictions are clinically verifiable.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="pill-light featured">PyTorch</span>
                    <span className="pill-light featured">Grad-CAM</span>
                    <span className="pill-light">Computer Vision</span>
                    <span className="pill-light">FastAPI</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="card-light-ivory p-6 flex flex-col sm:flex-row items-start gap-5 group">
                <div className="p-3.5 rounded-xl bg-[#B86F52]/10 border border-[#B86F52]/25 text-[#944D33] shrink-0 group-hover:scale-105 transition-transform">
                  <LayersIcon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#211827] group-hover:text-[#944D33] transition-colors mb-2">
                    Reactive Full-Stack Architecture
                  </h3>
                  <p className="text-sm text-[#48384F] leading-relaxed mb-3">
                    Building robust web services with TypeScript, React, Node.js, and FastAPI. Emphasizing sub-second response times, modular REST APIs, and automated cloud deployments on Docker and Render.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="pill-light featured">React</span>
                    <span className="pill-light featured">TypeScript</span>
                    <span className="pill-light">Node.js</span>
                    <span className="pill-light">PostgreSQL</span>
                    <span className="pill-light">Docker</span>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="card-light-ivory p-6 flex flex-col sm:flex-row items-start gap-5 group">
                <div className="p-3.5 rounded-xl bg-[#B86F52]/10 border border-[#B86F52]/25 text-[#944D33] shrink-0 group-hover:scale-105 transition-transform">
                  <CpuIcon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#211827] group-hover:text-[#944D33] transition-colors mb-2">
                    Algorithms & Constraint Optimization
                  </h3>
                  <p className="text-sm text-[#48384F] leading-relaxed mb-3">
                    Formulating combinatorial scheduling engines, graph colorings, and heuristic searches. Over 500 competitive algorithmic problems solved on LeetCode with strong focus on asymptotic space-time efficiency.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="pill-light featured">500+ Solved</span>
                    <span className="pill-light">Graph Algorithms</span>
                    <span className="pill-light">Constraint Logic</span>
                    <span className="pill-light">Dynamic Programming</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
