'use client';

import { useEffect, useState } from 'react';

interface AnimatedScoreProps {
  value: number;
  duration?: number;
}

export default function AnimatedScore({ value, duration = 2000 }: AnimatedScoreProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <div className="text-5xl font-bold text-primary transition-all">
      {displayValue}
      <span className="text-2xl">分</span>
    </div>
  );
} 