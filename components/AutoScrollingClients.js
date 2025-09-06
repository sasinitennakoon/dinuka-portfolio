'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

const logos = [
  { id: 1, src: '/logos/sandeshaya.png', alt: 'Client 1' },
  { id: 2, src: '/logos/saukyadana.png', alt: 'Client 2' },
  { id: 3, src: '/logos/Vikalpani 1.png', alt: 'Client 3' },
  { id: 4, src: '/logos/Vishwa.png', alt: 'Client 4' },
  { id: 5, src: '/logos/vikalpani eco.png', alt: 'Client 5' },
];

const AutoScrollingClients = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let animationFrameId;

    const scroll = () => {
      if (!container) return;
      scrollAmount += 0.5;
      container.scrollLeft = scrollAmount;

      // Reset scroll without jump
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-6">
      <div className="flex gap-12 w-max">
        {/* Duplicate logos twice for smooth wrap-around */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 w-52 h-28 relative"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollingClients;