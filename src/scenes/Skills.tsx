import React, { useRef, useEffect } from 'react';
import { useSceneDirector } from '../engine/hooks';
import { PORTFOLIO_DATA } from '../data';

interface OrbitPoint {
  skill: string;
  x: number;
  y: number;
  z: number;
  scale: number;
}

// Compute Fibonacci sphere points
function getSpherePoints(count: number): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push({
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    });
  }
  return points;
}

const RAW_POINTS = getSpherePoints(PORTFOLIO_DATA.skills.orbitList.length);

// Shared orbit calculations state for both Back & Front layers
let globalOrbitAngle = 0;
let globalScrollAngle = 0;
let globalMouseAngle = 0;
let globalCalculatedPoints: OrbitPoint[] = [];

// ==========================================
// 1. SKILLS BACK LAYER (z < 0, rendered in z0)
// ==========================================
export const SkillsBack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skillsList = PORTFOLIO_DATA.skills.orbitList;

  const updatePositions = (calcP: number, vw: number, vh: number, vis: number, exit: number) => {
    const el = containerRef.current;
    if (!el) return;

    const exitFade = Math.max(0, 1 - exit * 2.4);
    el.style.opacity = `${vis * exitFade}`;

    // Update global angles
    globalScrollAngle = calcP * Math.PI * 5; // spins with scroll x5
    const totalAngle = globalOrbitAngle + globalScrollAngle + globalMouseAngle;

    const R = Math.min(0.27 * vw, 0.46 * vh);
    const tilt = -0.28; // rad

    const calculated: OrbitPoint[] = RAW_POINTS.map((pt, i) => {
      // Y squashed by .78
      const ySquashed = pt.y * 0.78;

      // Tilt around X
      const yTilted = ySquashed * Math.cos(tilt) - pt.z * Math.sin(tilt);
      const zTilted = ySquashed * Math.sin(tilt) + pt.z * Math.cos(tilt);

      // Rotate around Y
      const xRot = pt.x * Math.cos(totalAngle) + zTilted * Math.sin(totalAngle);
      const zFinal = -pt.x * Math.sin(totalAngle) + zTilted * Math.cos(totalAngle);
      const yFinal = yTilted;

      const scale = 0.85 + (zFinal + 1) * 0.15;

      return {
        skill: skillsList[i],
        x: 0.5 * vw + xRot * R,
        y: 0.52 * vh + yFinal * R,
        z: zFinal,
        scale,
      };
    });

    globalCalculatedPoints = calculated;

    // Mutate back chips directly via refs
    chipRefs.current.forEach((chipEl, idx) => {
      if (!chipEl) return;
      const pt = calculated[idx];
      if (!pt || pt.z >= 0) {
        chipEl.style.display = 'none';
      } else {
        chipEl.style.display = 'block';
        chipEl.style.left = `${pt.x.toFixed(1)}px`;
        chipEl.style.top = `${pt.y.toFixed(1)}px`;
        chipEl.style.transform = `translate3d(-50%, -50%, 0) scale(${pt.scale.toFixed(3)})`;
        chipEl.style.opacity = `${(0.55 + (pt.z + 1) * 0.25).toFixed(3)}`;
      }
    });
  };

  useSceneDirector('skills', (calc, state) => {
    updatePositions(calc.p, state.vw, state.vh, calc.vis, calc.exit);
  });

  // Auto-spin ticker
  useEffect(() => {
    let animId = 0;
    const tick = () => {
      globalOrbitAngle += 0.004;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="skills-orbit-back fixed inset-0 pointer-events-none select-none transition-opacity duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        willChange: 'opacity',
      }}
    >
      {skillsList.map((skill, idx) => (
        <div
          key={idx}
          ref={(el) => (chipRefs.current[idx] = el)}
          className="absolute px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider select-none"
          style={{
            display: 'none',
            color: 'var(--red)',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(255, 31, 31, 0.4)',
            boxShadow: '0 4px 12px rgba(255, 31, 31, 0.1)',
            willChange: 'left, top, transform',
          }}
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 2. SKILLS FRONT LAYER (z > 0, rendered in z2)
// ==========================================
export const SkillsFront: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skillsList = PORTFOLIO_DATA.skills.orbitList;

  useSceneDirector('skills', (calc) => {
    const el = containerRef.current;
    if (!el) return;

    const exitFade = Math.max(0, 1 - calc.exit * 2.4);
    el.style.opacity = `${calc.vis * exitFade}`;

    // Mutate front chips directly via refs
    chipRefs.current.forEach((chipEl, idx) => {
      if (!chipEl) return;
      const pt = globalCalculatedPoints[idx];
      if (!pt || pt.z < 0) {
        chipEl.style.display = 'none';
      } else {
        chipEl.style.display = 'block';
        chipEl.style.left = `${pt.x.toFixed(1)}px`;
        chipEl.style.top = `${pt.y.toFixed(1)}px`;
        chipEl.style.transform = `translate3d(-50%, -50%, 0) scale(${pt.scale.toFixed(3)})`;
        chipEl.style.opacity = `${(0.85 + pt.z * 0.15).toFixed(3)}`;
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="skills-orbit-front fixed inset-0 pointer-events-none select-none transition-opacity duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        willChange: 'opacity',
      }}
    >
      {skillsList.map((skill, idx) => (
        <div
          key={idx}
          ref={(el) => (chipRefs.current[idx] = el)}
          className="absolute px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-paper font-semibold shadow-lg select-none"
          style={{
            display: 'none',
            backgroundColor: 'var(--red)',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(255, 31, 31, 0.55)',
            willChange: 'left, top, transform',
          }}
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 3. SKILLS FRONT SECTION IN <main> (z3)
// ==========================================
export const SkillsScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useSceneDirector('skills', (calc) => {
    if (containerRef.current) {
      const exitFade = Math.max(0, 1 - calc.exit * 2.4);
      const isVisible = calc.vis * exitFade > 0.005;
      containerRef.current.style.opacity = `${calc.vis * exitFade}`;
      containerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      containerRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
    }

    // Marquee moves with scroll
    if (marqueeRef.current) {
      const offset = (calc.p * 450) % 100;
      marqueeRef.current.style.transform = `translate3d(${-offset}%, 0, 0)`;
    }
  });

  const marqueeSkills = [...PORTFOLIO_DATA.skills.marqueeList, ...PORTFOLIO_DATA.skills.marqueeList];

  return (
    <section
      id="scene-skills"
      className="scene-section relative w-full"
      style={{ height: '280vh' }}
    >
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <div
          ref={containerRef}
          className="skills-content pointer-events-auto absolute inset-0 flex flex-col justify-between"
          style={{ willChange: 'opacity' }}
        >
          {/* Top-Left Title: “EVERYTHING / IN ORBIT.” */}
          <div className="absolute top-[14vh] left-[5vw]">
            <div className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
              <span style={{ color: 'var(--red)' }}>(04)</span> — TECHNICAL ARSENAL
            </div>
            <h2
              className="font-anton leading-[0.88] tracking-tight uppercase"
              style={{ fontSize: 'clamp(44px, 5.2vw, 96px)' }}
            >
              <div className="text-ink">{PORTFOLIO_DATA.skills.title.line1}</div>
              <div style={{ color: 'var(--red)' }}>
                {PORTFOLIO_DATA.skills.title.line2}
              </div>
            </h2>
          </div>

          {/* Bottom: One red marquee tape, 10vh high, rotated -2deg, moving with scroll */}
          <div
            className="absolute bottom-[4vh] -left-[5vw] -right-[5vw] h-[10vh] flex items-center overflow-hidden pointer-events-none select-none shadow-xl"
            style={{
              backgroundColor: 'var(--red)',
              transform: 'rotate(-2deg)',
              willChange: 'transform',
            }}
          >
            <div
              ref={marqueeRef}
              className="flex items-center whitespace-nowrap will-change-transform"
            >
              {marqueeSkills.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="font-anton text-paper text-2xl md:text-3xl tracking-wider uppercase px-4">
                    {item}
                  </span>
                  <span className="text-paper/70 text-lg px-2">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
