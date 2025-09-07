'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PhotographyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);

  const portraits = [
    '/photo/15.jpg', '/photo/4.jpg', '/photo/3.jpg',
    '/photo/2.jpg', '/photo/13.jpg', '/photo/6.jpg', '/photo/9.jpg','/photo/1.jpg',
    '/photo/8.jpeg', '/photo/10.jpg', '/photo/11.jpg', '/photo/12.jpg', '/photo/5.jpg', '/photo/7.jpg', '/photo/14.jpg', '/photo/16.jpg'
  ];
  const commercial = [
    '/photo/commercial11.jpg', '/photo/commercial4.jpg', '/photo/commercial8.jpg','/photo/commercial3.jpg',
    '/photo/commercial2.jpg', '/photo/commercial5.jpg', '/photo/commercial17.jpg',
    '/photo/commercial13.jpg', '/photo/commercial9.jpg',
    '/photo/commercial10.jpg', '/photo/commercial12.jpg', '/photo/commercial1.jpg',
    '/photo/commercial6.jpg', '/photo/commercial14.jpg', '/photo/commercial15.jpg',
    '/photo/commercial16.jpg', '/photo/commercial7.jpg'
  ];
  const documentary = [
    '/photo/doc1.jpg','/photo/doc3.jpg','/photo/doc2.jpeg', '/photo/doc4.jpg', '/photo/doc5.jpg','/photo/doc6.jpg',
    '/photo/doc7.jpg','/photo/doc8.jpg','/photo/doc9.jpg','/photo/doc10.jpg','/photo/doc11.jpg','/photo/doc13.jpg','/photo/doc12.jpg'
  ];

  const openLightbox = useCallback((gallery, index) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateImages = useCallback((direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? currentGallery.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === currentGallery.length - 1 ? 0 : prev + 1);
    }
  }, [currentGallery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigateImages('prev');
      else if (e.key === 'ArrowRight') navigateImages('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, navigateImages]);

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setShowScrollTop(currentScrollY > 300);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const imageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };

  const chipContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const chipItem = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15, mass: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.15 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-lg cursor-pointer" onClick={closeLightbox} />
          <button onClick={closeLightbox} className="absolute top-6 right-6 z-50 bg-white text-black text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg">×</button>
          <div className="relative z-50 max-w-[90vw] max-h-[70vh] mb-2">
            <Image src={currentGallery[currentImageIndex]} alt={`Gallery ${currentImageIndex + 1}`} width={1200} height={800} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl" />
            <button onClick={(e) => { e.stopPropagation(); navigateImages('prev'); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition shadow-lg border-2 border-dashed border-gray-400">←</button>
            <button onClick={(e) => { e.stopPropagation(); navigateImages('next'); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition shadow-lg border-2 border-dashed border-gray-400">→</button>
          </div>

          {/* Preview queue */}
          <div className="relative z-50 flex items-center justify-center h-20 w-full max-w-3xl overflow-hidden">
            <div className="flex items-center space-x-1 h-full">
              {currentGallery.map((img, index) => {
                const distance = index - currentImageIndex;
                if (Math.abs(distance) > 2) return null;
                const isCurrent = index === currentImageIndex;
                return (
                  <div key={index} onClick={() => setCurrentImageIndex(index)} className={`relative cursor-pointer transition-all duration-200 ${isCurrent ? 'h-16 w-[64px] opacity-100 ring-2 ring-white' : 'h-12 w-[48px] opacity-70 hover:opacity-90'}`}>
                    <div className="relative h-full w-full">
                      <Image src={img} alt={`Preview ${index + 1}`} fill className="object-contain rounded-sm" style={{ objectPosition: 'center' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

       {/* Navbar - hidden when lightbox is open */}
{!lightboxOpen && (
  <nav
    ref={navRef}
    className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-md transition-all rounded-full duration-500 ease-in-out ${
      navVisible ? 'opacity-100 translate-y-0' : '-translate-y-full opacity-0'
    }`}
    style={{
      background:
        'linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)',
      backdropFilter: 'blur(10px)',
      width: 'calc(100% - 3rem)',
      maxWidth: '1400px',
      
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
            ☰
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
          <Link
            href="/#about"
            className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
          >
            ABOUT
          </Link>
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

        {/* Mobile Menu (dropdown inside rounded card) */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full mt-4 border-t border-white/20 pt-4 space-y-2 transition-all duration-300">
            <Link
              href="/#home"
              className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
            >
              HOME
            </Link>
            <Link
              href="/#about"
              className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
            >
              ABOUT
            </Link>
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
)}

      {/* Main Section */}
      {/* Main Section */}
      <main className="bg-[#E7E7E7] min-h-screen px-6 md:px-20 pt-42 pb-20">
        {/* Back button with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mb-4 md:mb-0"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#0D1321] bg-[#FFFBEE] px-4 py-2 rounded-full text-sm font-semibold border border-[#0D1321] shadow-sm hover:bg-[#0D1321] hover:text-[#FFFBEE] transition duration-300 ease-in-out"
          >
            ← Back to Work
          </Link>
        </motion.div>

        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold font-[playfair_display] mb-4"
          >
            PHOTOGRAPHY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-700 font-[cormorant_garamond]"
          >
            A selection of moments I&apos;ve captured, from portraits to landscape, telling stories through lights and perspectives.
          </motion.p>
        </motion.div>

        {/* Categories with staggered animation */}
       <motion.div
  initial="hidden"
  animate="visible"
  variants={chipContainer}
  className="flex flex-wrap justify-center gap-4 mb-10"
>
  <motion.button
    variants={chipItem}
    whileHover="hover"
    whileTap="tap"
    onClick={() => document.getElementById('portraits').scrollIntoView({ behavior: 'smooth' })}
    className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
  >
    Portraits
  </motion.button>
  
  <motion.button
    variants={chipItem}
    whileHover="hover"
    whileTap="tap"
    onClick={() => document.getElementById('commercial').scrollIntoView({ behavior: 'smooth' })}
    className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
  >
    Commercial
  </motion.button>
  
  <motion.button
    variants={chipItem}
    whileHover="hover"
    whileTap="tap"
    onClick={() => document.getElementById('documentary').scrollIntoView({ behavior: 'smooth' })}
    className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
  >
    Documentary
  </motion.button>
</motion.div>


        {/* Portraits section with image animations */}
        <div id="portraits" className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl text-center text-black font-bold pb-7 mb-6 font-[cormorant_garamonnd]"
          >
            PORTRAITS
          </motion.h2>
          <div className="columns-1 sm:columns-2 md:columns-5 gap-2 space-y-4">
            {portraits.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="cursor-pointer hover:opacity-90 transition"
                onClick={() => openLightbox(portraits, i)}
              >
                <Image 
                  src={src} 
                  alt={`Portrait ${i + 1}`} 
                  width={300} 
                  height={400} 
                  className="rounded-lg w-full max-w-[300px] mx-auto object-cover" 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commercial section */}
        <div id="commercial" className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl text-center text-black font-bold pb-7 mb-6 font-[cormorant_garamonnd]"
          >
            COMMERCIAL
          </motion.h2>
          <div className="columns-1 sm:columns-2 md:columns-5 gap-2 space-y-4">
            {commercial.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="cursor-pointer hover:opacity-90 transition"
                onClick={() => openLightbox(commercial, i)}
              >
                <Image 
                  src={src} 
                  alt={`Commercial ${i + 1}`} 
                  width={300} 
                  height={400} 
                  className="rounded-lg w-full max-w-[300px] mx-auto object-cover" 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Documentary section */}
        <div id="documentary" className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl text-center text-black font-bold mb-6 pb-7 font-[cormorant_garamonnd]"
          >
            DOCUMENTARY
          </motion.h2>
          <div className="columns-1 sm:columns-2 md:columns-5 gap-2 space-y-4">
            {documentary.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="cursor-pointer hover:opacity-90 transition"
                onClick={() => openLightbox(documentary, i)}
              >
                <Image 
                  src={src} 
                  alt={`Documentary ${i + 1}`} 
                  width={300} 
                  height={400} 
                  className="rounded-lg w-full max-w-[300px] mx-auto object-cover" 
                />
              </motion.div>
            ))}
          </div>
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