import React, { useEffect, useRef } from 'react';
import { director, DirectorState, SceneConfig } from '../engine/director';
import { frameLoader, ManifestShot } from '../engine/frames';

export const Stage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const lastKeyRef = useRef<string>('');

  // Mouse parallax tracking (±14px, lerp 0.06)
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const latestStateRef = useRef<DirectorState | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx * 14;
      mouseRef.current.targetY = ny * 14;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Director subscription
    const unsubscribe = director.subscribe('stage-canvas', (state) => {
      latestStateRef.current = state;
    });

    // Render loop
    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);

      // Lerp mouse parallax
      const m = mouseRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.06;
      m.currentY += (m.targetY - m.currentY) * 0.06;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const state = latestStateRef.current;
      if (!state) return;

      const vw = state.vw;
      const vh = state.vh;
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      if (canvas.width !== Math.round(vw * dpr) || canvas.height !== Math.round(vh * dpr)) {
        canvas.width = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);
        canvas.style.width = `${vw}px`;
        canvas.style.height = `${vh}px`;
      }

      // Input key string for dirty checking
      const key = `${Math.round(state.y)}_${state.frame.toFixed(2)}_${state.transition.isTransitioning ? state.transition.t.toFixed(3) : '0'}_${frameLoader.loadedCount}_${Math.round(m.currentX * 10)}_${Math.round(m.currentY * 10)}_${vw}x${vh}`;
      if (key === lastKeyRef.current) {
        return;
      }
      lastKeyRef.current = key;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, vw, vh);

      const isMobile = vw < 820;

      // Helper to draw a single frame from a shot
      const drawFrame = (
        shot: ManifestShot,
        f: number,
        scene: SceneConfig,
        shiftX = 0,
        alpha = 1.0
      ) => {
        let scale: number;
        let x: number;
        if (isMobile) {
          x = 0.5;
          scale = Math.min((vh * 0.74) / 900, (vw * 1.05) / Math.max(1, shot.box[2]));
        } else {
          x = scene.x;
          scale = (vh * scene.k) / 900;
        }

        const offY = vh - 900 * scale;
        const offX = x * vw - shot.cx * 1600 * scale + m.currentX;

        const destX = offX + shot.box[0] * scale + shiftX;
        const destY = offY + shot.box[1] * scale + m.currentY;
        const destW = shot.box[2] * scale;
        const destH = shot.box[3] * scale;

        const f0 = Math.floor(f);
        const f1 = Math.min(shot.to, f0 + 1);
        const frac = f - f0;

        const img0 = frameLoader.getFrame(f0);
        if (img0) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.drawImage(img0, destX, destY, destW, destH);
          ctx.restore();
        }

        if (frac > 0.005 && f1 !== f0) {
          const img1 = frameLoader.getFrame(f1);
          if (img1) {
            ctx.save();
            ctx.globalAlpha = alpha * frac;
            ctx.drawImage(img1, destX, destY, destW, destH);
            ctx.restore();
          }
        }
      };

      if (!state.transition.isTransitioning || !state.transition.fromScene || !state.transition.toScene) {
        // Normal single scene render
        const shotInfo = frameLoader.getShotForFrame(state.frame);
        if (shotInfo) {
          drawFrame(shotInfo.shot, state.frame, state.activeScene);
        }
      } else {
        // Blade transition
        const t = state.transition.t;
        const skew = 0.2 * vh;
        const e = -skew + (vw + 2 * skew) * t;
        const H = vh;
        const isEnteringContact = state.transition.toScene.id === 'contact';

        const outShotInfo = frameLoader.getShotForFrame(state.transition.fromFrame);
        const inShotInfo = frameLoader.getShotForFrame(state.transition.toFrame);

        // 1. Draw outgoing shot (clipped to polygon to right of line)
        if (outShotInfo) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(e + skew, 0);
          ctx.lineTo(vw + 100, 0);
          ctx.lineTo(vw + 100, H + 100);
          ctx.lineTo(e - skew, H);
          ctx.closePath();
          ctx.clip();

          drawFrame(
            outShotInfo.shot,
            state.transition.fromFrame,
            state.transition.fromScene,
            +60 * t,
            1.0 - 0.35 * t
          );
          ctx.restore();
        }

        // 2. Draw incoming shot (clipped to polygon to left of line)
        if (inShotInfo) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(-100, 0);
          ctx.lineTo(e + skew, 0);
          ctx.lineTo(e - skew, H);
          ctx.lineTo(-100, H + 100);
          ctx.closePath();
          ctx.clip();

          drawFrame(
            inShotInfo.shot,
            state.transition.toFrame,
            state.transition.toScene,
            -60 * (1.0 - t),
            1.0
          );
          ctx.restore();
        }

        // 3. Draw 90px gradient trail behind the blade
        ctx.save();
        const trailColor = isEnteringContact ? '255, 255, 255' : '255, 31, 31';
        const trailGrad = ctx.createLinearGradient(e - 90, 0, e, 0);
        trailGrad.addColorStop(0, `rgba(${trailColor}, 0)`);
        trailGrad.addColorStop(1, `rgba(${trailColor}, 0.45)`);

        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.moveTo(e + skew - 90, 0);
        ctx.lineTo(e + skew, 0);
        ctx.lineTo(e - skew, H);
        ctx.lineTo(e - skew - 90, H);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // 4. Draw the blade 3px line with 24px glow
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(e + skew, 0);
        ctx.lineTo(e - skew, H);
        ctx.lineWidth = 3;
        ctx.strokeStyle = isEnteringContact ? '#ffffff' : '#ff1f1f';
        ctx.shadowColor = isEnteringContact
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 31, 31, 0.95)';
        ctx.shadowBlur = 24;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};
