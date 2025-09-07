'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { videos } from '../data/videos.js';

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

  // Common gradient style for both navbar + expanded menu
  const navBackground = {
    background:
      "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
    backdropFilter: "blur(10px)",
  };

  return (
    <>
      {/* Navbar */}
      <nav
  ref={navRef}
  className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-md transition-[opacity,transform] duration-500 ease-in-out ${
    navVisible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"
  } ${mobileMenuOpen ? "rounded-xl" : "rounded-full"}`} // ✅ instant switch
  style={{
    background:
      "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
    backdropFilter: "blur(10px)",
    width: "calc(100% - 3rem)",
    maxWidth: "1400px",
    overflow: "hidden", // ✅ keeps dropdown inside the card
  }}
>
  <div className="flex flex-col md:flex-row items-center px-8 py-4">
    {/* Top row: Logo + Toggle */}
    <div className="flex justify-between w-full items-center md:w-auto">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/signature-dinuka.png"
          alt="Signature"
          width={120}
          height={80}
          className="object-contain cursor-pointer"
        />
      </Link>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white text-2xl focus:outline-none p-2 rounded-full hover:bg-white/10"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>
    </div>

    {/* Desktop Navigation */}
    <div className="hidden md:flex space-x-8 text-base font-medium ml-auto">
      <Link href="/#home" className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]">HOME</Link>
      <Link href="/#about" className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]">ABOUT</Link>
      <Link href="/portfolio" className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]">WORK</Link>
      <Link href="/blog" className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]">BLOG</Link>
      <a href="https://wa.me/94716295618" target="_blank" rel="noopener noreferrer" className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]">CONTACT</a>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden w-full mt-4 space-y-2 transition-all duration-300">
        <a href="#home" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">HOME</a>
        <a href="#about" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">ABOUT</a>
        <Link href="/portfolio" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">WORK</Link>
        <Link href="/blog" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">BLOG</Link>
        <a href="https://wa.me/94716295618" target="_blank" rel="noopener noreferrer" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">CONTACT</a>
      </div>
    )}
  </div>
</nav>


      {/* Main Content */}
      <main className="bg-[#E7E7E7] px-4 md:px-20 pt-32 pb-24">
        <div className="w-full max-w-6xl mb-4 md:mb-0">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#0D1321] bg-[#FFFBEE] px-4 py-2 rounded-full text-sm font-semibold border border-[#0D1321] shadow-sm hover:bg-[#0D1321] hover:text-[#FFFBEE] transition duration-300 ease-in-out"
          >
            ← Back to Work
          </Link>
        </div>

        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold font-[playfair_display] mb-4">
            VIDEOGRAPHY
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 font-[cormorant_garamond]">
            Capturing motion, mood, and story — one frame at a time.
          </p>
        </motion.div>

        {/* Animated Video Cards */}
        <div className="space-y-12">
          {videos.map((video, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={` rounded-xl shadow-sm px-6 py-8 flex flex-col bg-[#FFFBEE] border border-black md:flex-row ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 items-start`}
              >
              <div className="flex-1 space-y-4">
                <h2 className="text-1xl md:text-4xl font-semibold text-black font-[cormorant_garamond]">{video.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(video.tag) &&
                    video.tag.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-[#F1EFE7] text-black text-sm border border-black font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <p className="text-gray-700 text-2xl md:3xl font-[DM_Sans]">{video.description}</p>
              </div>

              <div className="w-full md:w-[300px] flex-shrink-0 border border-black rounded-lg overflow-hidden">
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Image
                    src={video.videoSrc}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </a>
              </div>
            </motion.div>
          ))}
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

      {/* Footer (unchanged) */}
       <footer className="bg-[#0D1321] text-white py-6 w-full mt-10">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src="/signature-dinuka.png"
                          alt="Logo"
                          width={140}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-sm text-center sm:text-right text-[#FFFBEE] font-[DM_sans]">
                        &copy; {new Date().getFullYear()} All rights reserved @ Dinuka Gunawardana
                      </div>
                    </div>
                  </footer>
    </>
  );
}