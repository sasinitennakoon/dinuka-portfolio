"use client";

import { useEffect, useState } from "react";

export default function Snow() {
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    if (month === 11) {
      setShowSnow(true);
    }
  }, []);

  if (!showSnow) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9999]">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="snowflake text-white"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 7}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 15}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}