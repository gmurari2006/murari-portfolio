import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface OdometerRef {
  setValue: (val: number) => void;
}

export interface OdometerProps {
  value: number; // e.g. 8.56 or 520 or 2024
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  fontSize?: string;
  color?: string;
  snapLowest?: boolean;
}

export const Odometer = forwardRef<OdometerRef, OdometerProps>(
  (
    {
      value,
      decimals = 0,
      suffix = '',
      prefix = '',
      className = '',
      fontSize = 'clamp(44px, 5.2vw, 84px)',
      color = 'var(--ink)',
    },
    ref
  ) => {
    // Format initial value into string representation
    const strVal = value.toFixed(decimals);
    const chars = strVal.split('');
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const ribbonRefs = useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      setValue: (newVal: number) => {
        const newStr = newVal.toFixed(decimals);
        const newChars = newStr.split('');
        newChars.forEach((ch, idx) => {
          if (/\d/.test(ch)) {
            const digitVal = parseInt(ch, 10);
            const ribbon = ribbonRefs.current[idx];
            if (ribbon) {
              ribbon.style.transform = `translate3d(0, ${-digitVal * 1.05}em, 0)`;
            }
          }
        });
      },
    }));

    return (
      <div
        className={`odometer-container flex items-baseline font-anton select-none ${className}`}
        style={{
          fontSize,
          lineHeight: 1,
          color,
          overflow: 'hidden',
          height: '1.05em',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        {prefix && <span className="odometer-prefix mr-1">{prefix}</span>}
        {chars.map((ch, idx) => {
          if (ch === '.' || ch === ',') {
            return (
              <span
                key={`sep-${idx}`}
                className="odometer-char inline-block"
                style={{ width: '0.3em', textAlign: 'center' }}
              >
                {ch}
              </span>
            );
          }

          const isDigit = /\d/.test(ch);
          if (!isDigit) {
            return (
              <span key={`char-${idx}`} className="odometer-char">
                {ch}
              </span>
            );
          }

          const digitVal = parseInt(ch, 10);

          return (
            <div
              key={`col-${idx}`}
              className="odometer-column relative inline-block overflow-hidden"
              style={{
                height: '1.05em',
                width: '0.62em',
                verticalAlign: 'baseline',
              }}
            >
              <div
                ref={(el) => (ribbonRefs.current[idx] = el)}
                className="odometer-ribbon transition-transform duration-300 ease-out"
                style={{
                  transform: `translate3d(0, ${-digitVal * 1.05}em, 0)`,
                  willChange: 'transform',
                }}
              >
                {digits.map((d, dIdx) => (
                  <div
                    key={`d-${dIdx}`}
                    className="odometer-digit flex items-center justify-center"
                    style={{
                      height: '1.05em',
                      lineHeight: '1.05em',
                      textAlign: 'center',
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {suffix && (
          <span
            className="odometer-suffix ml-1 text-red"
            style={{ color: 'var(--red)' }}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
Odometer.displayName = 'Odometer';
