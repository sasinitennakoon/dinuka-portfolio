'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { videos } from '../data/videos.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Noto_Sans_Sinhala } from "next/font/google";
import Navbar from '../../components/Navbar.js';

// Import the font directly in this component
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  display: "swap",
});

// Function to detect if text contains Sinhala characters
const containsSinhala = (text) => {
  return /[\u0D80-\u0DFF]/.test(text);
};

// Function to split text into Sinhala and non-Sinhala parts
const splitSinhalaAndEnglish = (text) => {
  const sinhalaRegex = /[\u0D80-\u0DFF]+/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = sinhalaRegex.exec(text)) !== null) {
    // Add text before Sinhala part
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        isSinhala: false
      });
    }
    
    // Add Sinhala part
    parts.push({
      text: match[0],
      isSinhala: true
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      isSinhala: false
    });
  }
  
  return parts;
};

export default function VideographyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Only show videos tagged with "Editor"
  const editorVideos = videos.filter((video) =>
    Array.isArray(video.tag)
      ? video.tag.map((t) => t.toLowerCase()).includes('editor')
      : video.tag.toLowerCase() === 'editor'
  );

  // ✅ Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen bg-[#E7E7E7] px-6 md:px-20 py-20 text-[#0D1321] pt-32">
        <div className="w-full max-w-6xl mb-4 md:mb-0">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#0D1321] bg-[#FFFBEE] px-4 py-2 rounded-full text-sm font-semibold border border-[#0D1321] shadow-sm hover:bg-[#0D1321] hover:text-[#FFFBEE] transition duration-300 ease-in-out"
          >
            ← Back to Work
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-10 text-center font-[playfair_display]">
          Editing
        </h1>

        <div className="space-y-16">
          {editorVideos.map((video, index) => {
            const titleParts = splitSinhalaAndEnglish(video.title);
            const descriptionParts = containsSinhala(video.description) 
              ? splitSinhalaAndEnglish(video.description) 
              : null;
            
            return (
              <motion.div
                key={index}
                className="bg-[#FFFBEE] border border-black rounded-xl p-6 shadow-md space-y-6"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
              >
                {/* Apply Sinhala font only to Sinhala parts of the title */}
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {titleParts.map((part, i) => (
                    <span key={i} className={part.isSinhala ? notoSinhala.className : "font-[cormorant_garamond]"}>
                      {part.text}
                    </span>
                  ))}
                </h2>

                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                  {/* Left: Image */}
                  <div className="flex-shrink-0 w-full md:w-[300px]">
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Image
                      src={video.videoSrc}
                      alt={video.title}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-auto border border-black"
                    />
                  </a>
                  </div>

                  {/* Right: Description */}
                  <div className="flex-1 flex items-center">
                    {/* Apply Sinhala font only to Sinhala parts of the description */}
                    <p className="text-base md:text-lg">
                      {descriptionParts ? (
                        descriptionParts.map((part, i) => (
                          <span key={i} className={part.isSinhala ? notoSinhala.className : "font-[DM_Sans]"}>
                            {part.text}
                          </span>
                        ))
                      ) : (
                        <span className="font-[DM_Sans]">{video.description}</span>
                      )}
                    </p>
                  </div>
                </div>

                <p className="italic text-lg text-center text-gray-800 mt-6 font-[cormorant_garamond]">
                  “A single frame can hold a thousand emotions — here are just a few glimpses.”
                </p>

                {video.previewImages && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {video.previewImages.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`Preview ${i + 1}`}
                        width={150}
                        height={100}
                        className="rounded-md object-cover w-full h-auto shadow-xl"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 bg-[#0D1321] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-black transition-all duration-300"
            aria-label="Scroll to Top"
          >
            ↑
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0D1321] text-white w-full py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-2 text-center">
          {/* Copyright */}
          <div className="text-sm text-[#FFFBEE] font-[DM_sans]">
            © {new Date().getFullYear()} Dinuka Gunawardana. All rights reserved.
          </div>

          {/* Developer credit */}
          <div className="text-xs text-[#FFFBEE] font-[DM_sans]">
            Designed & Developed by{' '}
            <a
              href="https://sasini-tennakoon.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#FFD700]"
            >
              Sasini Tennakoon
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}