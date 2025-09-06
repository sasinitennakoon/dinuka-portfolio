'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Counter({ target, suffix = '', duration = 1000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 }); // triggers when 50% visible

  useEffect(() => {
    let animationFrame;
    let start = 0;

    const animate = () => {
      const frameRate = 20;
      const totalFrames = Math.round(duration / frameRate);
      const increment = target / totalFrames;

      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(interval);
          setCount(target);
        } else {
          setCount(Math.floor(start));
        }
      }, frameRate);
    };

    if (inView) {
      animate();
    } else {
      // Reset count when scrolled out
      setCount(0);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#0D1321]">
      {count}{count === target ? suffix : ''}
    </span>
  );
}