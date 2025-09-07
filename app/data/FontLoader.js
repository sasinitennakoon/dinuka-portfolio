// components/FontLoader.js
'use client';
import { useEffect, useState } from 'react';

export default function FontLoader() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is already loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontLoaded(true);
        document.documentElement.classList.add('font-loaded');
        document.documentElement.classList.remove('font-loading');
      });
      
      // Also check for the specific font
      const font = new FontFace('Noto Sans Sinhala', 'url(https://fonts.gstatic.com/s/notosanssinhala/v25/7AujH9_SW0UO7sz9VLFh1MiQhq6u6OR5SeMj4.woff2)');
      
      font.load().then(() => {
        setFontLoaded(true);
        document.documentElement.classList.add('font-loaded');
        document.documentElement.classList.remove('font-loading');
      }).catch(() => {
        // Font failed to load, still show content
        setFontLoaded(true);
        document.documentElement.classList.add('font-loaded');
        document.documentElement.classList.remove('font-loading');
      });
    } else {
      // Fallback for browsers that don't support document.fonts
      setTimeout(() => {
        setFontLoaded(true);
        document.documentElement.classList.add('font-loaded');
        document.documentElement.classList.remove('font-loading');
      }, 300);
    }
  }, []);

  return null;
}