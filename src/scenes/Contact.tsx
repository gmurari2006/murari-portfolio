import React, { useRef } from 'react';
import { useSceneDirector, useDirector } from '../engine/hooks';
import { director } from '../engine/director';
import { PORTFOLIO_DATA } from '../data';

// ==========================================
// CONTACT BACK LAYER (Full Red BG + Giant LET'S TALK)
// ==========================================
export const ContactBack: React.FC = () => {
  const redBgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useDirector((state) => {
    const el = redBgRef.current;
    const titleEl = titleRef.current;
    if (!el || !titleEl) return;

    const isContactActive = state.activeScene.id === 'contact';
    const isEnteringContact =
      state.transition.isTransitioning && state.transition.toScene?.id === 'contact';

    if (!isContactActive && !isEnteringContact) {
      el.style.display = 'none';
      return;
    }

    el.style.display = 'block';

    if (isEnteringContact) {
      const t = state.transition.t;
      const vh = state.vh;
      const vw = state.vw;
      const skew = 0.2 * vh;
      const e = -skew + (vw + 2 * skew) * t;

      // Same blade clip-path polygon as canvas
      el.style.clipPath = `polygon(-100px 0px, ${e + skew}px 0px, ${e - skew}px 100%, -100px 100%)`;
      el.style.opacity = '1';
    } else {
      el.style.clipPath = 'none';
      el.style.opacity = '1';
    }

    // Giant LET'S TALK text fades and rises on enter
    const contactCalc = state.scenes.contact;
    if (contactCalc) {
      const enterProg = Math.min(1, contactCalc.enter);
      titleEl.style.opacity = `${enterProg}`;
      titleEl.style.transform = `translate3d(0, ${(1 - enterProg) * 60}px, 0)`;
    }
  });

  return (
    <div
      ref={redBgRef}
      className="contact-back fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        zIndex: 0,
        backgroundColor: 'var(--red)',
        display: 'none',
        willChange: 'clip-path, opacity',
      }}
    >
      {/* Giant White LET'S / TALK in Anton, centered behind person */}
      <div
        ref={titleRef}
        className="absolute top-[10vh] left-0 w-full flex flex-col items-center justify-center text-center font-anton leading-[0.84] uppercase select-none"
        style={{
          fontSize: 'clamp(80px, min(36vh, 26vw), 360px)',
          color: '#ffffff',
          willChange: 'transform, opacity',
        }}
      >
        <div>{PORTFOLIO_DATA.contact.title.line1}</div>
        <div>{PORTFOLIO_DATA.contact.title.line2}</div>
      </div>
    </div>
  );
};

// ==========================================
// CONTACT FRONT LAYER (z3)
// ==========================================
export const ContactScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useSceneDirector('contact', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }
  });

  const { emailUser, emailDomain, fullEmail, links, copyrightYear } = PORTFOLIO_DATA.contact;

  return (
    <section
      id="scene-contact"
      className="scene-section relative w-full"
      style={{ height: '240vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="contact-front-content pointer-events-auto absolute inset-0 flex flex-col justify-between p-8 md:p-16"
          style={{ willChange: 'opacity' }}
        >
          {/* Top Label */}
          <div className="font-mono text-xs uppercase tracking-widest text-paper/80 pt-4">
            (06) — GET IN TOUCH
          </div>

          {/* Bottom Row: Split between Email and Stacked Links */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-12">
            {/* Bottom-Left: Email in Anton, split over 2 lines with wiping white underline */}
            <div className="flex flex-col">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/70 mb-3">
                DIRECT INQUIRY //
              </span>
              <a
                href={`mailto:${fullEmail}`}
                data-cursor="Write"
                className="group inline-flex flex-col font-anton tracking-tight leading-[0.92] select-none uppercase"
                style={{ fontSize: 'clamp(34px, 3.7vw, 74px)' }}
              >
                <span className="text-paper transition-transform duration-300 group-hover:translate-x-1">
                  {emailUser}
                </span>
                <span
                  className="contact-domain transition-transform duration-300 group-hover:translate-x-2"
                  style={{ color: 'var(--ink)' }}
                >
                  @{emailDomain}
                </span>

                {/* White underline that wipes on hover */}
                <span className="relative w-full h-[3px] bg-white/30 mt-3 rounded-full overflow-hidden">
                  <span className="absolute inset-0 bg-paper transition-transform duration-500 ease-out -translate-x-full group-hover:translate-x-0" />
                </span>
              </a>
            </div>

            {/* Bottom-Right: Stacked list of links with hairline separators and rotating ↗ */}
            <div className="w-full md:w-80 flex flex-col border-t border-white/20">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={link.cursor}
                  className="group flex items-center justify-between py-4 border-b border-white/20 text-paper font-mono text-xs md:text-sm tracking-wider uppercase transition-colors hover:text-white"
                >
                  <span className="font-semibold">{link.name}</span>
                  <span className="font-anton text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer: Copyright and Back to Top */}
          <footer className="flex items-center justify-between border-t border-white/20 pt-6 text-paper/80 font-mono text-xs uppercase tracking-wider select-none">
            <div>
              © {copyrightYear} {PORTFOLIO_DATA.name.full}. ALL RIGHTS RESERVED.
            </div>
            <button
              onClick={() => director.scrollTo(0)}
              data-cursor="Top"
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};
