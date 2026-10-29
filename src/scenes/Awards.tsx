import React, { useRef } from 'react';
import { useSceneDirector } from '../engine/hooks';
import { PORTFOLIO_DATA } from '../data';

// ==========================================
// AWARDS BACK LAYER (No back decoration per spec)
// ==========================================
export const AwardsBack: React.FC = () => {
  return null;
};

// ==========================================
// AWARDS FRONT LAYER (z3)
// ==========================================
export const AwardsScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cylinderContainerRef = useRef<HTMLDivElement | null>(null);

  const counters = PORTFOLIO_DATA.awards.counters;
  const certs = PORTFOLIO_DATA.awards.certifications;
  const N = certs.length; // 6 cards

  useSceneDirector('awards', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }

    // Four flip-in counter cards: rotateX -100 -> 0 staggered
    counters.forEach((_, idx) => {
      const cardEl = counterCardsRef.current[idx];
      if (!cardEl) return;

      const start = idx * 0.08;
      const end = start + 0.28;
      const progress = Math.min(1, Math.max(0, (calc.enter - start) / (end - start)));

      const rotX = -100 * (1 - progress);
      const opacity = progress;

      cardEl.style.transform = `perspective(800px) rotateX(${rotX.toFixed(1)}deg)`;
      cardEl.style.opacity = `${opacity}`;
    });

    // Certifications cylinder rotation with scroll
    // container at translateZ(-360px) rotateX(-14deg) rotateY(-p·(360 - 360/N))
    if (cylinderContainerRef.current) {
      const rotY = -calc.p * (360 - 360 / N);
      cylinderContainerRef.current.style.transform = `translateZ(-360px) rotateX(-14deg) rotateY(${rotY.toFixed(2)}deg)`;
    }
  });

  return (
    <section
      id="scene-awards"
      className="scene-section relative w-full"
      style={{ height: '320vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="awards-front-wrapper pointer-events-auto absolute flex flex-col justify-between"
          style={{
            left: '5vw',
            top: '12vh',
            bottom: '6vh',
            width: 'min(62vw, 980px)',
            willChange: 'opacity',
          }}
        >
          {/* Header */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-mute mb-2">
              <span style={{ color: 'var(--red)' }}>(05)</span> — RECOGNITION & PODIUM
            </div>
            <h2
              className="font-anton leading-none tracking-tight text-ink uppercase"
              style={{ fontSize: 'clamp(36px, 4.2vw, 72px)' }}
            >
              PROVEN <span style={{ color: 'var(--red)' }}>EXCELLENCE.</span>
            </h2>
          </div>

          {/* Four flip-in counter cards in a row (2x2 on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-2">
            {counters.map((c, idx) => {
              const isRed = c.accent === 'red';
              return (
                <div
                  key={idx}
                  ref={(el) => (counterCardsRef.current[idx] = el)}
                  className="p-4 md:p-5 rounded-2xl flex flex-col justify-between select-none shadow-lg transition-transform duration-300"
                  style={{
                    backgroundColor: isRed ? 'var(--red)' : 'var(--ink)',
                    color: '#ffffff',
                    minHeight: '110px',
                    transformOrigin: 'top center',
                    willChange: 'transform, opacity',
                  }}
                >
                  <span className="font-mono text-[10px] tracking-wider uppercase text-paper/70 font-semibold">
                    {c.platform}
                  </span>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="font-anton text-3xl md:text-4xl text-paper">
                      {c.count}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-wide uppercase text-paper/90">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Certifications 3D Cylinder Container */}
          <div
            className="cylinder-wrapper relative flex items-center justify-center my-auto"
            style={{
              height: '340px',
              perspective: '1600px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <div
              ref={cylinderContainerRef}
              className="cylinder-carousel relative w-[290px] h-[178px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(-360px) rotateX(-14deg) rotateY(0deg)',
                willChange: 'transform',
              }}
            >
              {certs.map((cert, idx) => {
                const angle = (360 / N) * idx;
                const isThirdRed = idx % 3 === 2 || cert.isRed;

                return (
                  <div
                    key={idx}
                    className="cylinder-card absolute inset-0 select-none"
                    style={{
                      width: '290px',
                      height: '178px',
                      transform: `rotateY(${angle}deg) translateZ(360px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className="card-face front-face absolute inset-0 p-5 rounded-2xl flex flex-col justify-between border shadow-xl"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        backgroundColor: isThirdRed ? 'var(--red)' : '#ffffff',
                        borderColor: isThirdRed ? 'var(--red)' : 'rgba(13, 13, 13, 0.1)',
                        color: isThirdRed ? '#ffffff' : 'var(--ink)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] tracking-widest uppercase font-semibold ${
                            isThirdRed ? 'text-paper/80' : 'text-mute'
                          }`}
                        >
                          {cert.issuer}
                        </span>
                        {/* Checkmark seal */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: isThirdRed ? '#ffffff' : 'var(--red)',
                            color: isThirdRed ? 'var(--red)' : '#ffffff',
                          }}
                        >
                          ✓
                        </div>
                      </div>

                      <h4
                        className="font-anton text-lg tracking-tight leading-tight uppercase my-1"
                        style={{ color: isThirdRed ? '#ffffff' : 'var(--ink)' }}
                      >
                        {cert.title}
                      </h4>

                      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider">
                        <span className={isThirdRed ? 'text-paper/70' : 'text-mute'}>
                          ACCREDITED
                        </span>
                        <span className={isThirdRed ? 'text-paper font-bold' : 'text-red font-bold'}>
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="card-face back-face absolute inset-0 p-5 rounded-2xl flex items-center justify-center border border-red/20 shadow-lg"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background:
                          'linear-gradient(135deg, rgba(255, 31, 31, 0.22) 0%, rgba(255, 31, 31, 0.08) 100%)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div className="font-anton text-xl tracking-widest text-red/40 uppercase">
                        VERIFIED SEAL
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
