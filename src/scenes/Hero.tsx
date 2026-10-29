import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSceneDirector } from '../engine/hooks';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';
import { MagneticButton } from '../components/Chrome';

// ==========================================
// HERO BACK LAYER (Behind Person, z0)
// ==========================================
export const HeroBack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split name into letters for intro stagger
  const firstName = PORTFOLIO_DATA.name.first; // "MURARI"
  const letters = firstName.split('');

  // Handle intro animation when triggered
  useEffect(() => {
    const handleIntro = () => {
      if (lettersRef.current.length > 0) {
        gsap.fromTo(
          lettersRef.current,
          {
            yPercent: 115,
            rotateX: -80,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 1.6,
            ease: 'expo.out',
          }
        );
      }
    };

    window.addEventListener('portfolio:intro_start', handleIntro);
    return () => window.removeEventListener('portfolio:intro_start', handleIntro);
  }, []);

  // Scroll updates via refs
  useSceneDirector('hero', (calc) => {
    const el = containerRef.current;
    if (!el) return;

    // Fade out fast on exit
    const exitFade = Math.max(0, 1 - calc.exit * 2.4);
    el.style.opacity = `${calc.vis * exitFade}`;

    // Tiny alternating vertical parallax for letters
    lettersRef.current.forEach((letterEl, idx) => {
      if (letterEl) {
        const direction = idx % 2 === 0 ? 1 : -1;
        const offset = calc.p * 45 * direction;
        letterEl.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="hero-back fixed pointer-events-none select-none transition-opacity duration-300"
      style={{
        right: '3vw',
        top: '10.5vh',
        zIndex: 0,
        perspective: '1000px',
        willChange: 'opacity, transform',
      }}
    >
      <div className="flex overflow-hidden">
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block font-anton uppercase text-red leading-none"
            style={{
              fontSize: 'clamp(80px, min(18.5vw, 36vh), 280px)',
              color: 'var(--red)',
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// HERO FRONT LAYER (Sticky Section in <main>, z3)
// ==========================================
export const HeroScene: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleLine1Ref = useRef<HTMLDivElement | null>(null);
  const titleLine2Ref = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);

  // Intro animation
  useEffect(() => {
    const handleIntro = () => {
      if (titleLine1Ref.current && titleLine2Ref.current) {
        gsap.fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.12,
            ease: 'expo.out',
            delay: 0.2,
          }
        );
      }
    };

    window.addEventListener('portfolio:intro_start', handleIntro);
    return () => window.removeEventListener('portfolio:intro_start', handleIntro);
  }, []);

  // Scroll updates
  useSceneDirector('hero', (calc) => {
    if (contentRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      contentRef.current.style.opacity = `${calc.vis * exitFade}`;
      contentRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      contentRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
      contentRef.current.style.transform = `translate3d(0, ${(-calc.p * 40).toFixed(1)}px, 0)`;
    }

    // Red highlighter underline grows with scroll progress (as if person "reads" it)
    if (underlineRef.current) {
      const widthPct = Math.min(100, Math.max(0, calc.p * 180));
      underlineRef.current.style.width = `${widthPct}%`;
    }
  });

  return (
    <section
      id="scene-hero"
      className="scene-section relative w-full"
      style={{ height: '230vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={contentRef}
          className="hero-front-content pointer-events-auto absolute flex flex-col gap-6"
          style={{
            left: '5vw',
            top: '26vh',
            width: 'min(47vw, 780px)',
            willChange: 'opacity, transform',
          }}
        >
          {/* Greeting: “Hi, I'm Full Name —” */}
          <div className="font-mono text-sm md:text-base tracking-wider uppercase text-mute">
            Hi, I'm{' '}
            <span className="text-ink font-semibold">
              {PORTFOLIO_DATA.name.full}
            </span>{' '}
            —
          </div>

          {/* Masked Title: “FULL-STACK” / “DEVELOPER.” */}
          <div className="flex flex-col font-anton tracking-tight leading-[0.88]" style={{ fontSize: 'clamp(56px, 7.6vw, 156px)' }}>
            <div className="overflow-hidden">
              <div ref={titleLine1Ref} className="text-ink">
                {PORTFOLIO_DATA.role.line1}
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={titleLine2Ref} style={{ color: 'var(--red)' }}>
                {PORTFOLIO_DATA.role.line2}
              </div>
            </div>
          </div>

          {/* Three-line description with dynamic red highlighter underline */}
          <div className="relative max-w-[31em] pt-2">
            <p
              className="text-mute font-body font-semibold leading-relaxed tracking-tight"
              style={{
                fontSize: 'clamp(16px, 1.35vw, 23px)',
                letterSpacing: '-0.03em',
              }}
            >
              {PORTFOLIO_DATA.hero.tagline}
            </p>
            {/* Red highlighter underline */}
            <div className="relative w-full h-[3px] bg-line/20 mt-3 rounded-full overflow-hidden">
              <div
                ref={underlineRef}
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: '0%',
                  backgroundColor: 'var(--red)',
                  boxShadow: '0 0 10px rgba(255, 31, 31, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <MagneticButton
              variant="red"
              onClick={() => director.scrollTo('work')}
              cursorLabel="Go"
            >
              {PORTFOLIO_DATA.hero.primaryCta}
            </MagneticButton>
            <MagneticButton
              variant="outline"
              href={PORTFOLIO_DATA.hero.resumeUrl}
              cursorLabel="PDF"
            >
              {PORTFOLIO_DATA.hero.secondaryCta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
