'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const navRef = useRef(null);

  const router = useRouter();

  // Navigation scroll effect
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
    <Navbar />
      

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 px-6 pt-32 md:px-12 lg:px-20 pb-20">
        {/* Hero Section */}
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
            A showcase of visual storytelling through the lens of design &amp; media
          </p>
        </motion.section>

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Link href={item.href}>
                  <div 
                    className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${item.color} border border-gray-200`}
                    onMouseEnter={() => setActiveCard(item.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    onTouchStart={() => setActiveCard(item.id)}
                    onTouchEnd={() => setTimeout(() => setActiveCard(null), 300)}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          activeCard === item.id ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div 
                        className={`absolute top-0 left-0 w-1 transition-all duration-700 ${item.accent} ${activeCard === item.id ? 'h-full' : 'h-0'}`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          className="flex flex-col"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h3 className="text-2xl font-bold font-[cormorant_garamond] mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-200 font-[DM_sans] text-sm mb-4">
                            {item.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section className="text-center mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="bg-gradient-to-r from-[#0D1321] to-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-5xl font-bold font-[playfair_display] mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-[cormorant_garamond] mb-8 max-w-2xl mx-auto">
              Let&apos;s collaborate to bring your creative vision to life through stunning visuals and compelling stories.
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
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D1321] text-white w-full py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-2 text-center">
          <div className="text-sm text-[#FFFBEE] font-[DM_sans]">
            © {new Date().getFullYear()} Dinuka Gunawardana. All rights reserved.
          </div>
          <div className="text-xs text-[#FFFBEE] font-[DM_sans]">
            Designed &amp; Developed by{' '}
            <a
              href="https://sasinitennakoon.vercel.app/"
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
