import React from 'react';

interface OdometerProps {
  value: number; // e.g. 8.56 or 520 or 2024
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  fontSize?: string;
  color?: string;
  snapLowest?: boolean;
}

export const Odometer: React.FC<OdometerProps> = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  fontSize = 'clamp(44px, 5.2vw, 84px)',
  color = 'var(--ink)',
  snapLowest = false,
}) => {
  // Format target value into string representation
  const strVal = value.toFixed(decimals);
  const chars = strVal.split('');

  // Column numbers: 0,1,2,3,4,5,6,7,8,9,0 (11 items)
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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
        // If snapLowest on the last digit:
        let yPos = digitVal;
        if (snapLowest && idx === chars.length - 1) {
          // snap smoothly
          yPos = digitVal;
        }

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
              className="odometer-ribbon transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(0, ${-yPos * 1.05}em, 0)`,
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
};
