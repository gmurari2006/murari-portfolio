import React, { useRef } from 'react';
import { useSceneDirector } from '../engine/hooks';
import { PORTFOLIO_DATA } from '../data';

// ==========================================
// JOURNEY BACK LAYER: Colossal Outlined Year (z0)
// ==========================================
export const JourneyBack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yearTextRef = useRef<HTMLDivElement | null>(null);

  useSceneDirector('journey', (calc) => {
    const el = containerRef.current;
    if (!el) return;

    const exitFade = Math.max(0, 1 - calc.exit * 2.4);
    el.style.opacity = `${calc.vis * exitFade * 0.9}`;

    // Year rolls from startYear (2024) to gradYear (2028)
    const { startYear, gradYear } = PORTFOLIO_DATA.journey;
    const currentYear = Math.round(startYear + (gradYear - startYear) * calc.p);
    if (yearTextRef.current) {
      yearTextRef.current.textContent = String(currentYear);
    }
  });

  return (
    <div
      ref={containerRef}
      className="journey-back fixed pointer-events-none select-none overflow-hidden transition-opacity duration-300"
      style={{
        position: 'fixed',
        zIndex: 0,
        left: '6vw',
        top: '24vh',
        willChange: 'opacity, transform',
      }}
    >
      <div
        ref={yearTextRef}
        className="font-anton leading-none tracking-tight select-none"
        style={{
          fontSize: '44vh',
          color: 'transparent',
          WebkitTextStroke: '2px var(--red)',
          opacity: 0.85,
        }}
      >
        {PORTFOLIO_DATA.journey.startYear}
      </div>
    </div>
  );
};

// ==========================================
// JOURNEY FRONT LAYER (z3)
// ==========================================
export const JourneyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = PORTFOLIO_DATA.journey.items;

  useSceneDirector('journey', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }

    // Red SVG line draws from bottom up using pathLength=1 and strokeDashoffset
    if (pathRef.current) {
      // Draw progress 0..1
      const drawProgress = Math.min(1, Math.max(0, calc.p * 1.3));
      pathRef.current.style.strokeDashoffset = `${1 - drawProgress}`;
    }

    // Items reveal from bottom with rotateY -55deg -> 0deg
    items.forEach((_, idx) => {
      const el = itemRefs.current[idx];
      const nodeEl = nodeRefs.current[idx];
      if (!el) return;

      // Newest is at top (idx 0), oldest at bottom (idx 2)
      // Reveal order from bottom up: idx 2 first, then 1, then 0
      const bottomIdx = items.length - 1 - idx;
      const start = bottomIdx * 0.25;
      const end = start + 0.35;
      const progress = Math.min(1, Math.max(0, (calc.p - start) / (end - start)));

      const rotY = -55 * (1 - progress);
      const opacity = progress;
      const transX = (1 - progress) * 40;

      el.style.transform = `translate3d(${transX.toFixed(1)}px, 0, 0) rotateY(${rotY.toFixed(1)}deg)`;
      el.style.opacity = `${opacity}`;

      // Active node fills red
      if (nodeEl) {
        if (progress > 0.4) {
          nodeEl.style.backgroundColor = 'var(--red)';
          nodeEl.style.borderColor = 'var(--red)';
          nodeEl.style.boxShadow = '0 0 12px rgba(255, 31, 31, 0.8)';
        } else {
          nodeEl.style.backgroundColor = 'var(--paper)';
          nodeEl.style.borderColor = 'rgba(13, 13, 13, 0.2)';
          nodeEl.style.boxShadow = 'none';
        }
      }
    });
  });

  return (
    <section
      id="scene-journey"
      className="scene-section relative w-full"
      style={{ height: '240vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="journey-front-column pointer-events-auto absolute flex flex-col justify-between"
          style={{
            left: '50vw',
            right: '6vw',
            top: '15vh',
            bottom: '10vh',
            willChange: 'opacity',
          }}
        >
          {/* Header */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
              <span style={{ color: 'var(--red)' }}>(03)</span> — THE JOURNEY
            </div>
            <h2
              className="font-anton leading-[0.88] tracking-tight uppercase"
              style={{ fontSize: 'clamp(44px, 5.2vw, 96px)' }}
            >
              <div className="text-ink">{PORTFOLIO_DATA.journey.title.line1}</div>
              <div style={{ color: 'var(--red)' }}>
                {PORTFOLIO_DATA.journey.title.line2}
              </div>
            </h2>
          </div>

          {/* Timeline with SVG track */}
          <div className="relative pl-8 md:pl-12 my-auto py-4">
            {/* 1px Grey Track */}
            <div
              className="absolute left-[11px] md:left-[15px] top-4 bottom-4 w-[1px] bg-line"
              style={{ zIndex: 1 }}
            />

            {/* Red SVG Line drawing from bottom up */}
            <svg
              className="absolute left-[11px] md:left-[15px] top-4 bottom-4 w-[2px] h-[calc(100%-32px)] overflow-visible"
              style={{ zIndex: 2 }}
            >
              <path
                ref={pathRef}
                d="M 0 350 L 0 0"
                stroke="var(--red)"
                strokeWidth="2.5"
                fill="none"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                style={{ willChange: 'stroke-dashoffset', transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>

            {/* Three Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  className="timeline-item relative flex flex-col gap-1.5 transition-all duration-300 select-none"
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Timeline Node Dot */}
                  <div
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className="absolute -left-[30px] md:-left-[42px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                    style={{
                      zIndex: 3,
                      backgroundColor: 'var(--paper)',
                      borderColor: 'rgba(13, 13, 13, 0.2)',
                    }}
                  />

                  {/* Year in mono red */}
                  <span
                    className="font-mono text-xs tracking-wider uppercase font-bold"
                    style={{ color: 'var(--red)' }}
                  >
                    {item.year}
                  </span>

                  {/* Title in Anton */}
                  <h4
                    className="font-anton text-xl md:text-2xl tracking-tight text-ink uppercase"
                  >
                    {item.title}
                  </h4>

                  {/* Organisation */}
                  <div className="font-mono text-[11px] uppercase tracking-wider text-mute font-medium">
                    {item.org}
                  </div>

                  <p className="font-body text-xs md:text-sm text-mute/90 leading-relaxed max-w-lg mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
