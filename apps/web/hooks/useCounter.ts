import { useState, useEffect } from 'react';

export default function useCounter(target: number, duration = 1000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    
    let start: number;
    let frame: number;
    
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };
    
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return count;
}