import React, { useRef, useMemo, useState } from 'react';
import { useSceneDirector } from '../engine/hooks';
import { PORTFOLIO_DATA } from '../data';
import { TiltCard } from '../components/TiltCard';
import { Odometer } from '../components/Odometer';

// ==========================================
// ABOUT BACK LAYER (z0)
// ==========================================
export const AboutBack: React.FC = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useSceneDirector('about', (calc) => {
    const el = bgRef.current;
    if (!el) return;

    const exitFade = Math.max(0, 1 - calc.exit * 2.4);
    el.style.opacity = `${calc.vis * exitFade}`;
    // Fades and slides in on enter
    const slideY = (1 - calc.enter) * 80;
    el.style.transform = `translate3d(0, ${slideY.toFixed(1)}px, 0)`;
  });

  return (
    <div
      ref={bgRef}
      className="about-back fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        zIndex: 0,
        opacity: 0,
        background: `
          radial-gradient(60vw 90vh at 22vw 70vh, rgba(255, 31, 31, 0.30), rgba(255, 31, 31, 0.10) 55%, transparent 80%),
          linear-gradient(to right, rgba(255, 31, 31, 0.05) 0%, transparent 60%)
        `,
        willChange: 'opacity, transform',
      }}
    />
  );
};

// ==========================================
// ABOUT FRONT LAYER (z3)
// ==========================================
export const AboutScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [statValues, setStatValues] = useState<number[]>([0, 0, 0]);

  // Split manifesto into individual words
  const manifestoWords = useMemo(() => {
    const fullText = PORTFOLIO_DATA.about.manifesto.join(' ');
    return fullText.split(/\s+/).filter(Boolean);
  }, []);

  const keywordsSet = useMemo(() => {
    return new Set(PORTFOLIO_DATA.about.keywords.map((k) => k.toUpperCase()));
  }, []);

  // Update word reveals and odometer cards with scroll
  useSceneDirector('about', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }

    // Dynamic roll of odometers driven by scroll
    const rollProgress = Math.min(1, Math.max(0, calc.p * 1.4));
    const newValues = PORTFOLIO_DATA.about.stats.map((st) => {
      return Number((st.value * rollProgress).toFixed(st.decimals));
    });
    setStatValues(newValues);

    // Word by word reveal: opacity .1→1, translateY .25em→0, blur 4px→0
    const totalWords = manifestoWords.length;
    manifestoWords.forEach((_, idx) => {
      const wordEl = wordRefs.current[idx];
      if (!wordEl) return;

      const start = (idx / totalWords) * 0.7;
      const end = start + 0.2;
      const progress = Math.min(1, Math.max(0, (calc.p - start) / (end - start)));

      const opacity = 0.1 + progress * 0.9;
      const translateY = (1 - progress) * 0.25;
      const blur = (1 - progress) * 4;

      wordEl.style.opacity = `${opacity}`;
      wordEl.style.transform = `translate3d(0, ${translateY}em, 0)`;
      wordEl.style.filter = `blur(${blur.toFixed(1)}px)`;
    });
  });

  return (
    <section
      id="scene-about"
      className="scene-section relative w-full"
      style={{ height: '280vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="about-front-column pointer-events-auto absolute flex flex-col justify-between"
          style={{
            left: '50vw',
            right: '5vw',
            top: '15vh',
            bottom: '7vh',
            willChange: 'opacity',
          }}
        >
          {/* Top: Section Label */}
          <div className="font-mono text-xs uppercase tracking-widest text-mute">
            <span style={{ color: 'var(--red)' }}>(01)</span> — ABOUT ME
          </div>

          {/* Center: Manifesto 4-6 lines word-by-word */}
          <div
            className="manifesto-paragraph font-body font-semibold leading-[1.12]"
            style={{
              fontSize: 'clamp(26px, 2.6vw, 50px)',
              letterSpacing: '-0.03em',
              maxWidth: '38em',
            }}
          >
            {manifestoWords.map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
              const isKeyword = keywordsSet.has(cleanWord);
              return (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className={`inline-block mr-[0.26em] transition-[opacity,transform,filter] duration-75 ${
                    isKeyword ? 'text-red font-bold' : 'text-ink'
                  }`}
                  style={{
                    color: isKeyword ? 'var(--red)' : 'var(--ink)',
                    opacity: 0.1,
                    transform: 'translate3d(0, 0.25em, 0)',
                    filter: 'blur(4px)',
                    willChange: 'opacity, transform, filter',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Bottom: Three Glass Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {PORTFOLIO_DATA.about.stats.map((st, idx) => (
              <TiltCard key={st.id} className="p-5 flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] tracking-wider uppercase text-mute">
                    {st.label}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--red)' }}
                  />
                </div>

                <div className="my-1">
                  <Odometer
                    value={statValues[idx] ?? st.value}
                    decimals={st.decimals}
                    suffix={st.suffix}
                    fontSize="clamp(36px, 3.8vw, 58px)"
                    snapLowest={true}
                  />
                </div>

                <div className="font-mono text-[10px] uppercase text-mute/80 tracking-wide mt-2">
                  {st.sublabel}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
