import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { director, DirectorState, SCENES } from '../engine/director';
import { frameLoader } from '../engine/frames';
import { PORTFOLIO_DATA } from '../data';

// ==========================================
// 1. MAGNETIC BUTTON HELPER COMPONENT
// ==========================================
export interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'red' | 'outline';
  onClick?: () => void;
  href?: string;
  className?: string;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'red',
  onClick,
  href,
  className = '',
  cursorLabel,
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || window.innerWidth < 820) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.35)' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      xTo(dx);
      yTo(dy);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove as EventListener);
    el.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, []);

  const isOutline = variant === 'outline';

  const content = (
    <div className="btn-inner relative flex items-center justify-center w-full h-full px-8 overflow-hidden rounded-full pointer-events-none">
      {/* Sliding fill on hover */}
      <span
        className={`btn-fill absolute inset-0 rounded-full transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 ${
          isOutline ? 'bg-red' : 'bg-ink'
        }`}
        style={{
          backgroundColor: isOutline ? 'var(--red)' : 'var(--ink)',
        }}
      />
      {/* Duplicated roll text */}
      <div className="btn-roll-text relative flex flex-col items-center justify-center h-6 overflow-hidden">
        <span
          className={`btn-text-main flex items-center font-anton tracking-wide text-sm uppercase transition-transform duration-500 ease-out group-hover:-translate-y-full ${
            isOutline ? 'text-ink group-hover:text-paper' : 'text-paper'
          }`}
        >
          {children}
        </span>
        <span
          className={`btn-text-sub flex items-center font-anton tracking-wide text-sm uppercase transition-transform duration-500 ease-out group-hover:-translate-y-full ${
            isOutline ? 'text-paper' : 'text-paper'
          }`}
          style={{ position: 'absolute', top: '100%' }}
        >
          {children}
        </span>
      </div>
    </div>
  );

  const sharedStyle: React.CSSProperties = {
    height: '58px',
    borderRadius: '9999px',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isOutline ? 'transparent' : 'var(--red)',
    border: isOutline ? '1.5px solid var(--ink)' : 'none',
    cursor: 'pointer',
    userSelect: 'none',
    willChange: 'transform',
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        data-cursor={cursorLabel || (href.endsWith('.pdf') ? 'PDF' : 'Open')}
        className={`group inline-block ${className}`}
        style={sharedStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-cursor={cursorLabel || 'Go'}
      className={`group inline-block ${className}`}
      style={sharedStyle}
    >
      {content}
    </button>
  );
};

// ==========================================
// 2. CHROME (HUD + PRELOADER + CURSOR)
// ==========================================
export const Chrome: React.FC = () => {
  // Preloader states
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);

  // HUD states
  const [activeSceneId, setActiveSceneId] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);

  // Cursor states
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isCursorHovering, setIsCursorHovering] = useState(false);

  const preloaderTopRef = useRef<HTMLDivElement | null>(null);
  const preloaderBottomRef = useRef<HTMLDivElement | null>(null);
  const preloaderTextRef = useRef<HTMLDivElement | null>(null);
  const preloaderLinesRef = useRef<HTMLDivElement | null>(null);

  // Initialize frame loader & Preloader sequence
  useEffect(() => {
    let currentPct = 0;
    const updateProgress = (_loaded: number, _total: number, pct: number) => {
      // Smoothly tween progress
      currentPct = Math.max(currentPct, pct);
      setLoadProgress(currentPct);
    };

    const handleQuarterLoaded = () => {
      // Trigger preloader open animation
      gsap.to(
        { val: currentPct },
        {
          val: 100,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: function () {
            setLoadProgress(Math.round(this.targets()[0].val));
          },
          onComplete: () => {
            // Animate preloader split
            const tl = gsap.timeline({
              onComplete: () => {
                setIsPreloaderDone(true);
                setPreloaderHidden(true);
                director.start();
              },
            });

            // Slide lines up
            if (preloaderLinesRef.current) {
              tl.to(preloaderLinesRef.current, {
                y: -40,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
              });
            }

            // Split apart two red halves
            tl.to(
              preloaderTopRef.current,
              {
                yPercent: -100,
                duration: 1.2,
                ease: 'expo.inOut',
              },
              '-=0.2'
            );

            tl.to(
              preloaderBottomRef.current,
              {
                yPercent: 100,
                duration: 1.2,
                ease: 'expo.inOut',
              },
              '<'
            );

            tl.to(
              preloaderTextRef.current,
              {
                opacity: 0,
                scale: 1.15,
                duration: 0.6,
                ease: 'power3.out',
              },
              '<'
            );
          },
        }
      );
    };

    frameLoader.startLoading(handleQuarterLoaded, updateProgress);
  }, []);

  // Subscribe to director for HUD updates
  useEffect(() => {
    const unsubscribe = director.subscribe('chrome-hud', (state) => {
      setActiveSceneId(state.activeScene.id);
      setScrollProgress(Math.round(state.totalProgress * 100));
      setIsWhiteTheme(state.isContactWhite);
    });

    return unsubscribe;
  }, []);

  // Desktop custom cursor lerping
  useEffect(() => {
    if (window.innerWidth < 820) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Position inner 8px red dot immediately
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      // Check if hovering [data-cursor]
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const label = target.getAttribute('data-cursor') || 'Go';
        setCursorLabel(label);
        setIsCursorHovering(true);
      } else {
        setIsCursorHovering(false);
      }
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);
      // Ring lerps behind at 0.16
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleNavClick = useCallback((id: string) => {
    director.scrollTo(id);
  }, []);

  return (
    <>
      {/* ========================================== */}
      {/* 1. PRELOADER */}
      {/* ========================================== */}
      {!preloaderHidden && (
        <div
          className="fixed inset-0 select-none overflow-hidden"
          style={{ zIndex: 99, pointerEvents: isPreloaderDone ? 'none' : 'auto' }}
        >
          {/* Top Half */}
          <div
            ref={preloaderTopRef}
            className="absolute top-0 left-0 w-full h-[50.5vh]"
            style={{ backgroundColor: 'var(--red)', willChange: 'transform' }}
          />

          {/* Bottom Half */}
          <div
            ref={preloaderBottomRef}
            className="absolute bottom-0 left-0 w-full h-[50.5vh]"
            style={{ backgroundColor: 'var(--red)', willChange: 'transform' }}
          />

          {/* Center Counter & Mono lines */}
          <div
            ref={preloaderTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-paper pointer-events-none"
            style={{ zIndex: 100 }}
          >
            <div ref={preloaderLinesRef} className="flex flex-col items-center gap-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/80">
                SYSTEM INITIALIZATION // VIDEO BUFFER
              </span>
            </div>

            <div
              className="font-anton leading-none tracking-tighter"
              style={{
                fontSize: 'clamp(80px, min(26vw, 40vh), 280px)',
                color: '#ffffff',
              }}
            >
              {String(loadProgress).padStart(3, '0')}
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/80">
                {PORTFOLIO_DATA.name.full} — 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. HUD (z50) */}
      {/* ========================================== */}
      <header
        className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-7 pointer-events-none transition-colors duration-500"
        style={{ zIndex: 50 }}
      >
        {/* Left: Logo First Name in Anton 28px with red ® */}
        <div
          onClick={() => director.scrollTo(0)}
          data-cursor="Top"
          className="pointer-events-auto flex items-baseline cursor-pointer group"
        >
          <span
            className={`font-anton text-2xl md:text-[28px] tracking-wider transition-colors duration-500 ${
              isWhiteTheme ? 'text-paper' : 'text-ink'
            }`}
          >
            {PORTFOLIO_DATA.name.first}
          </span>
          <sup
            className="ml-0.5 text-xs font-mono font-bold transition-colors duration-500"
            style={{ color: isWhiteTheme ? '#ffffff' : 'var(--red)' }}
          >
            ®
          </sup>
        </div>

        {/* Right: Pill Nav (Hidden on Mobile < 820px) */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full pointer-events-auto transition-all duration-500"
          style={{
            background: isWhiteTheme
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.62)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isWhiteTheme
              ? '1px solid rgba(255, 255, 255, 0.35)'
              : '1px solid rgba(13, 13, 13, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
          }}
        >
          {SCENES.map((scene) => {
            const isActive = activeSceneId === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => handleNavClick(scene.id)}
                data-cursor="Go"
                className={`relative px-4 py-2 rounded-full font-mono text-[11px] tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? isWhiteTheme
                      ? 'bg-paper text-red font-bold'
                      : 'bg-red text-paper font-bold'
                    : isWhiteTheme
                    ? 'text-paper/80 hover:text-paper hover:bg-white/10'
                    : 'text-ink/70 hover:text-ink hover:bg-black/5'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isWhiteTheme
                      ? '#ffffff'
                      : 'var(--red)'
                    : undefined,
                  color: isActive
                    ? isWhiteTheme
                      ? 'var(--red)'
                      : '#ffffff'
                    : undefined,
                }}
              >
                {scene.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Bottom-Right: Progress % and 2px Red Rail */}
      <div
        className="fixed bottom-8 right-8 hidden md:flex items-center gap-4 pointer-events-none select-none transition-colors duration-500"
        style={{ zIndex: 50 }}
      >
        <span
          className={`font-mono text-xs tracking-widest font-semibold transition-colors duration-500 ${
            isWhiteTheme ? 'text-paper' : 'text-ink'
          }`}
        >
          {String(scrollProgress).padStart(3, '0')}%
        </span>
        <div
          className="w-[2px] h-20 rounded-full overflow-hidden transition-colors duration-500"
          style={{
            backgroundColor: isWhiteTheme
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(255, 31, 31, 0.2)',
          }}
        >
          <div
            className="w-full transition-all duration-150"
            style={{
              height: `${scrollProgress}%`,
              backgroundColor: isWhiteTheme ? '#ffffff' : 'var(--red)',
            }}
          />
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. CUSTOM CURSOR (DESKTOP ONLY, z90+) */}
      {/* ========================================== */}
      <div className="hidden md:block pointer-events-none" style={{ zIndex: 95 }}>
        {/* Inner 8px red dot */}
        <div
          ref={cursorDotRef}
          className="fixed top-0 left-0 pointer-events-none transition-opacity duration-200"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--red)',
            border: '1px solid #ffffff',
            marginLeft: '-4px',
            marginTop: '-4px',
            opacity: isCursorHovering ? 0 : 1,
            willChange: 'transform',
          }}
        />

        {/* Outer 42px / 92px ring */}
        <div
          ref={cursorRingRef}
          className="fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            width: isCursorHovering ? '92px' : '42px',
            height: isCursorHovering ? '92px' : '42px',
            borderRadius: '50%',
            marginLeft: isCursorHovering ? '-46px' : '-21px',
            marginTop: isCursorHovering ? '-46px' : '-21px',
            backgroundColor: isCursorHovering ? 'var(--red)' : 'transparent',
            border: isCursorHovering ? 'none' : '1.5px solid rgba(255, 31, 31, 0.65)',
            boxShadow: isCursorHovering ? '0 10px 25px rgba(255, 31, 31, 0.4)' : 'none',
            willChange: 'transform, width, height',
          }}
        >
          {isCursorHovering && (
            <span
              ref={cursorLabelRef}
              className="font-anton text-xs uppercase tracking-widest text-paper select-none"
            >
              {cursorLabel}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
