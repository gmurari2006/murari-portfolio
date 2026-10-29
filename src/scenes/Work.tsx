import React, { useRef } from 'react';
import { useSceneDirector } from '../engine/hooks';
import { PORTFOLIO_DATA, Project } from '../data';

// ==========================================
// WORK BACK LAYER: Perspective Grid Floor (z0)
// ==========================================
export const WorkBack: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useSceneDirector('work', (calc) => {
    const el = gridRef.current;
    if (!el) return;

    const exitFade = Math.max(0, 1 - calc.exit * 2.4);
    el.style.opacity = `${calc.vis * exitFade * 0.85}`;

    // Moving grid lines with scroll
    const offsetY = (calc.p * 360) % 90;
    el.style.backgroundPosition = `0px ${offsetY.toFixed(1)}px`;
  });

  return (
    <div
      className="work-back fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0, perspective: '900px' }}
    >
      <div
        ref={gridRef}
        className="absolute w-[200vw] -left-[50vw] bottom-[-20vh] h-[90vh] transition-opacity duration-300"
        style={{
          transformOrigin: '50% 100%',
          transform: 'rotateX(68deg)',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 31, 31, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 31, 31, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
          willChange: 'background-position, opacity',
        }}
      />
    </div>
  );
};

// ==========================================
// CSS PROJECT VISUAL MOCKS
// ==========================================
const ProjectVisual: React.FC<{ type: Project['type'] }> = ({ type }) => {
  if (type === 'compiler') {
    return (
      <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-paper select-none">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-paper/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
            <span className="text-[11px] tracking-widest text-paper/80 ml-2">COMPILER_AST_V2</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-paper font-bold">ONLINE</span>
        </div>

        <div className="space-y-2 text-xs py-4 text-paper/90">
          <div className="flex items-center gap-2">
            <span className="text-paper/60">&gt;</span>
            <span>Parsing requirements: Natural Language Spec</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-paper/60">&gt;</span>
            <span className="text-paper font-semibold">Generating DB Schema + ORM Models... [OK]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-paper/60">&gt;</span>
            <span>Synthesizing FastAPI Routers... [24 Endpoints]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-paper/60">&gt;</span>
            <span>Building React SPA bundle + Tailwind CSS</span>
          </div>
        </div>

        <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
          <span className="text-[11px] tracking-wider text-paper/80">RENDER CLOUD PIPELINE</span>
          <span className="text-[11px] font-bold text-paper animate-pulse">DEPLOYED 100%</span>
        </div>
      </div>
    );
  }

  if (type === 'tinyform') {
    return (
      <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-paper select-none">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <span className="text-[11px] tracking-widest text-paper/80">ON-DEVICE PRIVACY MESH</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-paper font-bold">ZERO CLOUD</span>
        </div>

        {/* Neural activation heatmap grid */}
        <div className="grid grid-cols-6 gap-2 my-auto py-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-lg flex items-center justify-center text-[9px] font-bold"
              style={{
                backgroundColor: i % 3 === 0 ? 'rgba(255, 255, 255, 0.95)' : i % 2 === 0 ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.25)',
                color: i % 3 === 0 ? 'var(--red)' : '#ffffff',
              }}
            >
              {(0.12 * (i + 1)).toFixed(2)}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-2 text-paper/90">
          <span>LATENCY: 14ms</span>
          <span>AIR-GAPPED COMPUTE</span>
        </div>
      </div>
    );
  }

  // Timetable
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-paper select-none">
      <div className="flex items-center justify-between border-b border-white/20 pb-3">
        <span className="text-[11px] tracking-widest text-paper/80">CONSTRAINT SOLVER MATRIX</span>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-paper font-bold">0 CONFLICTS</span>
      </div>

      <div className="grid grid-cols-4 gap-2 my-auto py-2 text-[10px]">
        {['MON', 'TUE', 'WED', 'THU'].map((day, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <span className="text-paper/60 text-center font-bold">{day}</span>
            <div className="bg-white/90 text-red font-bold p-2 rounded text-center">CS101</div>
            <div className="bg-white/40 text-paper p-2 rounded text-center">AI402</div>
            <div className="bg-white/20 text-paper p-2 rounded text-center">LAB</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs pt-2 text-paper/90">
        <span>HEURISTIC: GRAPH COLORING</span>
        <span>OPT: 99.8%</span>
      </div>
    </div>
  );
};

// ==========================================
// WORK FRONT LAYER (z3)
// ==========================================
export const WorkScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const projects = PORTFOLIO_DATA.work.projects;
  const numCards = projects.length; // 3

  // Easing helper
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useSceneDirector('work', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }

    // Deck entry from below with rotateY -25deg
    if (deckRef.current) {
      const entryProgress = Math.min(1, calc.enter);
      const rotY = -25 * (1 - entryProgress);
      const transY = (1 - entryProgress) * 120;
      deckRef.current.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0) rotateY(${rotY.toFixed(1)}deg)`;
    }

    // Scroll mapping with dwell on each card
    // p goes 0..1, across (numCards - 1)
    const val = calc.p * (numCards - 1);
    const cardIndex = Math.min(numCards - 2, Math.floor(val));
    const frac = val - cardIndex;
    const q = cardIndex + easeInOutCubic(Math.min(1, Math.max(0, frac)));

    // Update Counter & Progress Bar
    const activeCardIdx = Math.min(numCards, Math.max(1, Math.round(q) + 1));
    if (counterRef.current) {
      counterRef.current.textContent = `0${activeCardIdx} / 0${numCards}`;
    }
    if (progressBarRef.current) {
      const pct = (q / (numCards - 1)) * 100;
      progressBarRef.current.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    // Apply 3D transform to each card
    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;
      const d = q - i;

      let z = 0;
      let y = 0;
      let rotX = 0;
      let opacity = 1;

      if (d <= 0) {
        // Upcoming card (below/behind)
        // Upcoming cards use z = d·300, y = d·3.2vh, fading.
        z = d * 300;
        y = d * 3.2; // in vh
        rotX = 0;
        opacity = Math.max(0, 1 + d * 0.9);
      } else {
        // Leaving card (pushed up and forward/back)
        // Leaving cards use z = d·900, y = −12d vh, rotateX = 28d, and opacity = 1 − 1.8d.
        z = d * 900;
        y = -12 * d; // in vh
        rotX = 28 * d;
        opacity = Math.max(0, 1 - 1.8 * d);
      }

      cardEl.style.transform = `translate3d(0, ${y.toFixed(2)}vh, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg)`;
      cardEl.style.opacity = `${opacity.toFixed(3)}`;
      cardEl.style.zIndex = `${Math.round(100 - Math.abs(d) * 10)}`;
      cardEl.style.pointerEvents = Math.abs(d) < 0.4 ? 'auto' : 'none';
    });
  });

  return (
    <section
      id="scene-work"
      className="scene-section relative w-full"
      style={{ height: '460vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="work-front-wrapper pointer-events-auto absolute w-full h-full flex flex-col justify-between"
          style={{ willChange: 'opacity' }}
        >
          {/* Header with label, Anton counter “01 / 03”, and 140px progress bar */}
          <div
            className="flex items-center justify-between px-8 md:px-16"
            style={{ position: 'absolute', top: '12vh', left: '5vw', width: 'min(56vw, 940px)' }}
          >
            <div className="flex items-center gap-6">
              <span className="font-mono text-xs uppercase tracking-widest text-mute">
                <span style={{ color: 'var(--red)' }}>(02)</span> — FEATURED WORK
              </span>
              <span
                ref={counterRef}
                className="font-anton text-2xl text-ink tracking-wider"
              >
                01 / 03
              </span>
            </div>

            {/* 140px progress bar */}
            <div className="w-[140px] h-[3px] bg-line rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full rounded-full transition-all duration-75"
                style={{ width: '0%', backgroundColor: 'var(--red)' }}
              />
            </div>
          </div>

          {/* 3D Deck Container */}
          <div
            ref={deckRef}
            className="deck-container absolute pointer-events-auto"
            style={{
              left: '5vw',
              top: '23vh',
              width: 'min(56vw, 940px)',
              height: '55vh',
              perspective: '1500px',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="project-card absolute inset-0 bg-paper rounded-[30px] border border-line grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl transition-shadow"
                style={{
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 30px 60px -15px rgba(13, 13, 13, 0.12)',
                }}
              >
                {/* Left Column: Details */}
                <div className="p-8 md:p-10 flex flex-col justify-between bg-paper">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-bold text-red" style={{ color: 'var(--red)' }}>
                        {proj.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-mute/40" />
                      <span className="font-mono text-[11px] tracking-wider uppercase text-mute">
                        {proj.category}
                      </span>
                    </div>

                    <h3
                      className="font-anton leading-none tracking-tight text-ink uppercase mb-4"
                      style={{ fontSize: 'clamp(36px, 3.7vw, 70px)' }}
                    >
                      {proj.title}
                    </h3>

                    <p className="font-body text-sm md:text-base text-mute font-medium leading-relaxed mb-6">
                      {proj.tagline}
                    </p>
                  </div>

                  <div>
                    {/* Four tech chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.chips.map((chip, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider bg-line/10 text-ink/80 border border-line/20"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* View on GitHub link */}
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Open"
                      className="inline-flex items-center gap-2 font-anton text-sm uppercase tracking-wider text-red hover:underline group"
                      style={{ color: 'var(--red)' }}
                    >
                      <span>View on GitHub</span>
                      <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Red Visual Panel with CSS Mock */}
                <div
                  className="relative overflow-hidden flex items-center justify-center p-4"
                  style={{
                    backgroundColor: 'var(--red)',
                  }}
                >
                  <ProjectVisual type={proj.type} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
