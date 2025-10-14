'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
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

  const router = useRouter();

  const handleAboutClick = (e) => {
    e.preventDefault();
    router.push('/#about');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 500);
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Photography",
      href: "/photography",
      image: "/portfolio/2.jpg",
      description: "Capturing moments through creative lens",
      color: "from-purple-500/20 to-blue-500/20",
      accent: "bg-gradient-to-r from-purple-500 to-blue-500"
    },
    {
      id: 2,
      title: "Videography",
      href: "/videography",
      image: "/portfolio/IMG_2791.jpg",
      description: "Storytelling through motion pictures",
      color: "from-red-500/20 to-orange-500/20",
      accent: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      id: 3,
      title: "Editing",
      href: "/editing",
      image: "/portfolio/Gayora 2.jpg",
      description: "Crafting perfection in post-production",
      color: "from-green-500/20 to-teal-500/20",
      accent: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Graphic Design",
      href: "/design",
      image: "/portfolio/grap.jpg",
      description: "Visual communication through design",
      color: "from-yellow-500/20 to-pink-500/20",
      accent: "bg-gradient-to-r from-yellow-500 to-pink-500"
    }
  ];

  return (
    <>
      {/* Navigation */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          navVisible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(29,42,65,0.95) 0%, rgba(13,19,33,0.95) 100%)",
          backdropFilter: "blur(20px)",
          width: "calc(100% - 3rem)",
          maxWidth: "1400px",
          borderRadius: mobileMenuOpen ? "1.5rem" : "2rem",
          transition: "border-radius 0.4s ease",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <div className="flex flex-col md:flex-row items-center px-6 py-3">
          <div className="flex justify-between w-full items-center md:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <Link href="/#home">
                <Image
                  src="/signature-dinuka.png"
                  alt="Signature"
                  width={180}
                  height={28}
                  className="object-contain cursor-pointer brightness-0 invert"
                />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-xl p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </motion.button>
          </div>

          <div className="hidden md:flex space-x-2 text-sm font-medium ml-auto mr-4">
            {['HOME', 'ABOUT', 'WORK', 'BLOG', 'CONTACT'].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {item === 'ABOUT' ? (
                  <button
                    onClick={handleAboutClick}
                    className="text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-[Inter]"
                  >
                    {item}
                  </button>
                ) : item === 'CONTACT' ? (
                  <a
                    href="https://wa.me/94716295618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-[Inter] block"
                  >
                    {item}
                  </a>
                ) : (
                  <Link
                    href={item === 'HOME' ? '/#home' : `/${item.toLowerCase()}`}
                    className="text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-[Inter] block"
                  >
                    {item}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full mt-4 space-y-2 overflow-hidden"
              >
                {['HOME', 'ABOUT', 'WORK', 'BLOG', 'CONTACT'].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 10 }}
                    className="border-l-2 border-white/20 pl-4"
                  >
                    {item === 'ABOUT' ? (
                      <button
                        onClick={handleAboutClick}
                        className="block w-full text-white/80 hover:text-white py-3 text-left transition-colors font-[Inter]"
                      >
                        {item}
                      </button>
                    ) : item === 'CONTACT' ? (
                      <a
                        href="https://wa.me/94716295618"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white/80 hover:text-white py-3 transition-colors font-[Inter]"
                      >
                        {item}
                      </a>
                    ) : (
                      <Link
                        href={item === 'HOME' ? '/#home' : `/${item.toLowerCase()}`}
                        className="block text-white/80 hover:text-white py-3 transition-colors font-[Inter]"
                      >
                        {item}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 px-6 pt-32 md:px-12 lg:px-20 pb-20">
        {/* Hero Section - Original Headings */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#0D1321] font-[playfair_display] mb-4">
            Explore My Creative Work
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-[cormorant_garamond]">
            A showcase of visual storytelling through the lens of design & media
          </p>
        </motion.section>

        {/* Portfolio Grid - Mobile Compatible Effects */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <Link href={item.href}>
                  <div 
                    className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${item.color} border border-gray-200
                      ${activeCard === item.id ? 'shadow-2xl -translate-y-2' : ''}
                    `}
                    onMouseEnter={() => setActiveCard(item.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    onTouchStart={() => setActiveCard(item.id)}
                    onTouchEnd={() => setTimeout(() => setActiveCard(null), 300)}
                  >
                    {/* Background Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          activeCard === item.id ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      
                      {/* Color Strip Effect - Works on both desktop and mobile */}
                      <div 
                        className={`absolute top-0 left-0 w-1 transition-all duration-700 ${
                          item.accent
                        } ${
                          activeCard === item.id ? 'h-full' : 'h-0'
                        }`}
                      />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          className="flex flex-col"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        >
                          <h3 className="text-2xl font-bold font-[cormorant_garamond] mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-200 font-[DM_sans] text-sm mb-4">
                            {item.description}
                          </p>
                          
                          {/* Animated Arrow */}
                          <motion.div
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ml-auto transition-all duration-300"
                            animate={{
                              scale: activeCard === item.id ? 1.1 : 1,
                              backgroundColor: activeCard === item.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)'
                            }}
                          >
                            <motion.span
                              className="text-lg"
                              animate={{ 
                                x: activeCard === item.id ? 3 : 0 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              →
                            </motion.span>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Hover/Touch Effect */}
                      <div 
                        className={`absolute inset-0 transition-all duration-300 ${
                          activeCard === item.id ? 'bg-black/20' : 'bg-black/0'
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-[#0D1321] to-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[playfair_display] mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-[cormorant_garamond] mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your creative vision to life through stunning visuals and compelling stories.
            </p>
            <motion.a
              href="https://wa.me/94716295618"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#0D1321] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold font-[Inter] text-base md:text-lg hover:shadow-2xl transition-all duration-300"
            >
              Start a Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.section>
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

      {/* Scroll to Top 
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>*/}
    </>
  );
}