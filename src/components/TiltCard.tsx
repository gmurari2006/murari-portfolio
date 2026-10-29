import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style = {},
  maxTilt = 14,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const nx = (x / rect.width) * 2 - 1; // -1 to 1
      const ny = (y / rect.height) * 2 - 1; // -1 to 1

      const rotX = -ny * maxTilt;
      const rotY = nx * maxTilt;

      setTransform(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.65,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ease-out select-none ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow:
          '0 24px 48px -12px rgba(255, 31, 31, 0.22), 0 4px 16px rgba(0, 0, 0, 0.05)',
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Moving radial glare */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 180px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85), transparent 70%)`,
          opacity: glare.opacity,
          mixBlendMode: 'overlay',
          zIndex: 10,
        }}
      />
      <div className="relative z-1">{children}</div>
    </div>
  );
};
