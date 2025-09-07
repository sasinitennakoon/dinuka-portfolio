'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef(null);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const router = useRouter();

const handleAboutClick = (e) => {
  e.preventDefault();
  router.push('/#about');

  // Delay to wait until home page loads, then scroll
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 500);
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

  // Common gradient style for both navbar + expanded menu
  const navBackground = {
    background:
      "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
    backdropFilter: "blur(10px)",
  };


  return (
    <>
     <nav
  ref={navRef}
  className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-md transition-[opacity,transform] duration-500 ease-in-out ${
    navVisible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"
  }`}
  style={{
    background:
      "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
    backdropFilter: "blur(10px)",
    width: "calc(100% - 3rem)",
    maxWidth: "1400px",
    borderRadius: mobileMenuOpen ? "1rem" : "9999px", // ✅ rounded square when expanded
  }}
>
  <div className="flex flex-col md:flex-row items-center px-8 py-4">
    {/* Top row: Logo + Toggle */}
    <div className="flex justify-between w-full items-center md:w-auto">
      <Link href="/#home" className="flex-shrink-0">
        <Image
          src="/signature-dinuka.png"
          alt="Signature"
          width={200}
          height={30}
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
      <Link
        href="/#home"
        className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
      >
        HOME
      </Link>
      <button
          onClick={handleAboutClick}
          className="block w-full text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
        >
          ABOUT
        </button>
      <Link
        href="/portfolio"
        className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
      >
        WORK
      </Link>
      <Link
        href="/blog"
        className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
      >
        BLOG
      </Link>
      <a
        href="https://wa.me/94716295618"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
      >
        CONTACT
      </a>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden w-full mt-4 space-y-2 transition-all duration-300">
        <Link href="/#home" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">HOME</Link>
        <button
          onClick={handleAboutClick}
          className="block w-full text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
        >
          ABOUT
        </button>
        <Link
          href="/portfolio"
          className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
        >
          WORK
        </Link>
        <Link
          href="/blog"
          className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
        >
          BLOG
        </Link>
        <a
          href="https://wa.me/94716295618"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
        >
          CONTACT
        </a>
      </div>
    )}
  </div>
</nav>

      <main className="bg-[#E7E7E7] min-h-screen px-6 pt-42 md:px-20 py-24">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#0D1321] font-[playfair_display] mb-4">
            Explore My Creative Work
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-[cormorant_garamond]">
            A showcase of visual storytelling through the lens of design & media
          </p>
        </motion.section>

        {/* Cards Section */}
        {/* Photography Card */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Photography Card - EXACTLY matches your original design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.15 }}
            className="rounded-2xl overflow-hidden border border-black" // Added critical classes here
          >
            <Link
              href="/photography"
              className="group relative block h-full w-full" // Changed from transform to block
            >
              <div className="w-full h-72 overflow-hidden">
                <Image
                  src="/portfolio/2.jpg"
                  alt="Photography"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition duration-500 group-hover:blur-sm group-hover:brightness-75"
                />
              </div>

              {/* Your original strip and text - completely unchanged */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute h-14 w-full bg-white/70 backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-full z-0" />
                <h2 className="relative z-10 text-black text-2xl md:text-3xl font-bold tracking-wide font-[cormorant_garamond]">
                  Photography
                </h2>
              </div>
            </Link>
          </motion.div>

          {/* Videography Card - EXACTLY matches your original design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.15 }}
            className="rounded-2xl overflow-hidden border border-black" // Added critical classes here
          >
            <Link
              href="/videography"
              className="group relative block h-full w-full" // Changed from transform to block
            >
              <div className="w-full h-72 overflow-hidden">
                <Image
                  src="/portfolio/IMG_2791.jpg"
                  alt="Videography"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition duration-500 group-hover:blur-sm group-hover:brightness-75"
                />
              </div>

              {/* Your original strip and text - completely unchanged */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute h-14 w-full bg-white/70 backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-full z-0" />
                <h2 className="relative z-10 text-black text-2xl md:text-3xl font-bold tracking-wide font-[cormorant_garamond]">
                  Videography
                </h2>
              </div>
            </Link>
          </motion.div>



              {/* Editing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 * 0.15 }}
          className="rounded-2xl overflow-hidden border border-black"
        >
          <Link
            href="/editing"
            className="group relative block h-full w-full"
          >
            <div className="w-full h-72 overflow-hidden">
              <Image
                src="/portfolio/Gayora 2.jpg"
                alt="Editing"
                width={800}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:blur-sm group-hover:brightness-75"
              />
            </div>
            
            {/* Strip behind text (unchanged from original) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute h-14 w-full bg-white/70 backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-full z-0" />
              <h2 className="relative z-10 text-black text-2xl md:text-3xl font-bold tracking-wide font-[cormorant_garamond]">
                Editing
              </h2>
            </div>
          </Link>
        </motion.div>

        {/* Graphic Design Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3 * 0.15 }}
          className="rounded-2xl overflow-hidden border border-black"
        >
          <Link
            href="/design"
            className="group relative block h-full w-full"
          >
            <div className="w-full h-72 overflow-hidden">
              <Image
                src="/portfolio/grap.jpg"
                alt="Graphic Design"
                width={800}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:blur-sm group-hover:brightness-75"
              />
            </div>
            
            {/* Strip behind text (unchanged from original) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute h-14 w-full bg-white/70 backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-full z-0" />
              <h2 className="relative z-10 text-black text-2xl md:text-3xl font-bold tracking-wide font-[cormorant_garamond]">
                Graphic Design
              </h2>
            </div>
          </Link>
        </motion.div>
      </section>
      {/* alternative way
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link
          href="/photography"
          className="group relative overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 border border-black h-[400px] flex flex-col"
        >
          <Image
            src="/portfolio/photography-cover.png"
            alt="Photography"
            width={800}
            height={500}
            className="w-full h-[75%] object-cover transition duration-500 group-hover:brightness-75"
          />
          <div className="h-[25%] flex items-center justify-center bg-[#FFFBEE]">
            <h2 className="text-black text-2xl font-bold tracking-wide font-[cormorant_garamond]">
              Photography
            </h2>
          </div>
        </Link>

        
        <Link
          href="/videography"
          className="group relative overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 border border-black h-[400px] flex flex-col"
        >
          <img
            src="/portfolio/videography-cover.gif"
            alt="Videography"
            className="w-full h-[75%] object-cover transition duration-500 group-hover:brightness-75"
          />
          <div className="h-[25%] flex items-center justify-center bg-[#FFFBEE]">
            <h2 className="text-black text-2xl font-bold tracking-wide font-[cormorant_garamond]">
              Videography
            </h2>
          </div>
        </Link>

        
        <Link
          href="/editing"
          className="group relative overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 border border-black h-[400px] flex flex-col"
        >
          <Image
            src="/portfolio/design-cover.png"
            alt="Editing"
            width={800}
            height={500}
            className="w-full h-[75%] object-cover transition duration-500 group-hover:brightness-75"
          />
          <div className="h-[25%] flex items-center justify-center bg-[#FFFBEE]">
            <h2 className="text-black text-2xl font-bold tracking-wide font-[cormorant_garamond]">
              Editing
            </h2>
          </div>
        </Link>

        
        <Link
          href="/design"
          className="group relative overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 border border-black h-[400px] flex flex-col"
        >
          <Image
            src="/portfolio/design-cover.png"
            alt="Graphic Design"
            width={800}
            height={500}
            className="w-full h-[75%] object-cover transition duration-500 group-hover:brightness-75"
          />
          <div className="h-[25%] flex items-center justify-center bg-[#FFFBEE]">
            <h2 className="text-black text-2xl font-bold tracking-wide font-[cormorant_garamond]">
              Graphic Design
            </h2>
          </div>
        </Link>
      </section>*/}

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
{/* Footer */}
<footer className="bg-[#0D1321] text-white w-full py-6"> {/* Remove mt-10 */}
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