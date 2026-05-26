'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorDot.current || !cursorRing.current) return;

      // Update cursor dot position (small center dot)
      cursorDot.current.style.left = `${e.clientX - 3}px`;
      cursorDot.current.style.top = `${e.clientY - 3}px`;

      // Update cursor ring position (outer ring)
      cursorRing.current.style.left = `${e.clientX - 16}px`;
      cursorRing.current.style.top = `${e.clientY - 16}px`;
    };

    const handleMouseEnter = () => {
      if (cursorDot.current) cursorDot.current.style.opacity = '1';
      if (cursorRing.current) cursorRing.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursorDot.current) cursorDot.current.style.opacity = '0';
      if (cursorRing.current) cursorRing.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorRing} className="cursor-ring" />
    </>
  );
}
