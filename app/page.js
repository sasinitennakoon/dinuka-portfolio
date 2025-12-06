'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AutoScrollingClients from '../components/AutoScrollingClients.js';
import BlogSection from '../components/blogSection.js';
import Counter from '../components/Counter.js';
import { Playfair_Display } from 'next/font/google'
import { useRouter } from "next/navigation";
import { Heading1 } from 'lucide-react';
import Navbar from '../components/Navbar.js';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Add weights as needed
  display: 'swap',
})


export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeClass, setFadeClass] = useState('opacity-0');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef(null);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { margin: '-100px' });
  const imageControls = useAnimation();
  const textControls = useAnimation();


  const router = useRouter();

const handleAboutClick = (e) => {
  e.preventDefault();
  router.push("/#about");

  setTimeout(() => {
    if (typeof window !== "undefined") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, 500);
};


  
  
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  

  const services = [
    {
      title: 'PHOTOGRAPHY',
      href: '/photography',
      img: '/services/photography.png',
      desc: 'Photography captures moments,telling stories through images,preserving memories, and showcasing perspectives with creativity and technical skills',
      delay: 0.1,
    },
    {
      title: 'VIDEOGRAPHY',
      href: '/videography',
      img: '/services/video.png',
      desc: 'Videogrphy captures moving images, creating visual narratives, documenting events,and conveying emotions through dynamic and creative storytelling',
      delay: 0.2,
    },
    {
      title: 'EDITING',
      href: '/editing',
      img: '/services/editing2.png',
      desc: 'Editing refines and arranging content, enhancing storytelling by cutting, adjusting, and polishing visuals or text for clarity and impact',
      delay: 0.3,
    },
    {
      title: 'GRAPHIC DESIGN',
      href: '/design',
      img: '/services/graphic.png',
      desc: 'Graphic design combines visuals and text, crafting appealing and effective communication through typography, imagery, and layout to convey messages',
      delay: 0.4,
    },
  ];

  // Splash screen logic
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowWelcome(false);
      return;
    }
    sessionStorage.setItem('hasVisited', 'true');

    const fadeInTimer = setTimeout(() => setFadeClass('opacity-100'), 100);
    const fadeOutTimer = setTimeout(() => setFadeClass('opacity-0'), 2500);
    const hideTimer = setTimeout(() => setShowWelcome(false), 3300);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Scroll logic for navbar visibility
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (showWelcome) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) setNavVisible(false);
      else if (currentScrollY < lastScrollYRef.current) setNavVisible(true);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showWelcome]);

  // Scroll to hash section safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      }
    }
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
    <main className="relative min-h-screen text-white">
      {/* Splash / Welcome Screen */}
      {showWelcome ? (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#0D1321] via-[#1D2A41] to-[#263B5E] z-50 transition-opacity duration-800 ease-in-out ${fadeClass}`}
        >
          <Image
            src="/signature-dinuka.png"
            alt="Client Logo"
            width={500}
            height={500}
            className={`w-full h-auto max-w-[80%] md:max-w-[500px] transition-opacity duration-800 ease-in-out ${fadeClass}`}
          />
        </div>
      ) : (
        <>
          <Navbar />


          <section id="home" className="relative w-full h-screen pt-20 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/Web Cover New11.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Gradient Overlay - Increased opacity for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>
            
            {/* Content Container - Using Framer Motion for reliable animation */}
            <div className="relative z-10 h-[90vh] flex items-center">
              <div className="container mx-auto px-6 md:px-16">
                <motion.div 
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {/* First Line - Welcome to My */}
                  <h1 
                    className={`text-3xl md:text-6xl font-light text-white mb-2 leading-tight whitespace-nowrap ${playfair.className}`}
                  >
                    Welcome to My
                  </h1>
                  <h2 
                    className={`text-4xl md:text-7xl font-bold text-white mb-6 leading-tight whitespace-nowrap ${playfair.className}`}
                  >
                    CREATIVE WORLD!
                  </h2>
                  
                  
                  {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      {/* Download CV Button */}
                      <motion.a
                        href="/Dinuka Gunawardana CV.pdf"
                        download
                        className="w-full sm:w-auto text-center bg-white text-[#0D1321] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-200 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download CV
                      </motion.a>

                      {/* Visit My Creative Eye Button */}
                      <motion.a
                        href="https://www.pexels.com/@dinukagunawardana/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-[#0D1321] transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Visit My Creative Eye
                      </motion.a>
                    </div>

                </motion.div>
              </div>
            </div>
          </section>
          
          {/* About Section */}
          <section id="about" ref={aboutRef} className="py-20 px-6 md:px-16 bg-[#E7E7E7] text-black">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Image From Left */}
                <div className="overflow-hidden lg:w-1/3 w-full flex justify-center pt-30">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="w-full flex justify-center"
                  >
                    <Image
                      src="/dinuka4 1.png"
                      alt="Dinuka Gunawardana"
                      width={700}
                      height={600}
                      className="rounded-lg object-cover w-full h-auto max-w-sm sm:max-w-md md:max-w-lg border border-black"
                      style={{ objectPosition: 'center' }}
                    />
                  </motion.div>
                </div>

                {/* Text From Right */}
                <div className="overflow-hidden lg:w-2/3 w-full space-y-8 p-6">
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0D1321] mb-12 font-[cormorant_garamond]">
                      I&apos;m Dinuka Gunawardana
                    </h1>
                    <div className="space-y-6">
                      <p className="text-xl text-[#0D1321] leading-relaxed font-[DM_Sans] text-justify">
                        I am a multidisciplinary visual artist with a deep passion for storytelling through art. As a dedicated freelancer, I engage in a wide range of creative services including photography, videography, editing, graphic design, and more. I take pride in my attention to detail and commitment to creativity, always striving to bring unique visions to life.
                        <br />
                        <br />
                        Every project I take on is an opportunity to create something meaningful and memorable. Whether it is capturing a fleeting moment, crafting compelling visuals, or designing powerful graphics, my goal is to transform ideas into lasting impressions.
                        <br />
                        <br />
                        In addition to my freelance work, I am the founder of IMAGIC CREATION - a creative house committed to delivering high-quality digital content and innovative visual solutions. At IMAGIC, we collaborate with individuals, brands, and organizations to turn imagination into impactful reality.
                        <br />
                        <br />
                        Let us collaborate and bring your vision to life through art, creativity, and storytelling.
                      </p>
                      <p className="flex items-center gap-8">
                        <a
                          href="https://www.linkedin.com/in/dinuka-gunawardana"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/icon.png"
                            alt="LinkedIn"
                            width={30}
                            height={30}
                            className="hover:opacity-80 transition-opacity"
                          />
                        </a>
                        <a
                          href="https://www.imagiccreation.lk/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="/imagic.png"
                            alt="Imagic Creation"
                            width={100}
                            height={24}
                            className="hover:opacity-80 transition-opacity"
                          />
                        </a>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Counter Section */}
          <section className="py-20 bg-[#FFFBEE] text-[#0D1321]">
            <div className="max-w-6xl mx-auto px-4 md:px-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <Counter target={5} suffix="+" />
                <p className="text-lg font-medium text-[#0D1321] font-[cormorant_garamond]">Years of Experience</p>
              </div>

              <div className="space-y-3">
                <Counter target={150} />
                <p className="text-lg font-medium text-[#0D1321] font-[cormorant_garamond]">Projects Completed</p>
              </div>

              <div className="space-y-3">
                <Counter target={20} suffix="+" />
                <p className="text-lg font-medium text-[#0D1321] font-[cormorant_garamond]">Working with Professional Teams</p>
              </div>
            </div>
          </section>
          {/* Skilled Software Logos Section */}
          <section className="py-12 bg-[#FFFBEE]">
            <div className="max-w-6xl mx-auto px-2 md:px-8 text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 font-[playfair_display] text-[#0D1321]">
                Tools That Shape My Craft
              </h2>
              
            </div>

            <motion.div
              className="max-w-6xl mx-auto px-2 md:px-8 grid grid-cols-2 sm:grid-cols-5 gap-20 justify-items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {[
                { src: '/logos/Adobe2.png', alt: 'Adobe' },
                { src: '/logos/black.PNG', alt: 'Blackmagic' },
                { src: '/logos/sony.png', alt: 'Sony' },
                { src: '/logos/canon.png', alt: 'Canon' },
                { src: '/logos/zeiss.png', alt: 'Zeiss' },
                { src: '/logos/zoom1.png', alt: 'Zoom' },
                { src: '/logos/Rode.png', alt: 'Rode' },
                { src: '/logos/godox.png', alt: 'Godox' },
                { src: '/logos/dji.png', alt: 'Dji' },
                { src: '/logos/sigma.PNG', alt: 'Sigma' },
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  className="flex justify-center items-center w-30 h-30 bg-white rounded-lg shadow-sm p-4"
                  variants={itemVariants}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Services Section */}
<section id="services" className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-50 to-gray-100 text-black">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 font-[playfair_display] text-[#0D1321]">
        Here&apos;s What I Create
      </h2>
     
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: service.delay }}
          viewport={{ once: true, amount: 0.3 }}
          className="h-full"
        >
          <Link
            href={service.href}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 ease-out overflow-hidden h-full flex flex-col border border-gray-200 hover:border-[#0D1321]/20"
          >
            {/* Improved Image Container */}
            <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden p-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0D1321_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <Image
                src={service.img}
                alt={service.title}
                width={140}
                height={140}
                className="object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out z-10 drop-shadow-lg"
              />
              
              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D1321]/0 via-[#0D1321]/0 to-[#0D1321]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#0D1321] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-3 text-[#0D1321] group-hover:text-[#0D1321]/90 transition-colors duration-300 font-[cormorant_garamond] text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-[DM_sans] text-center">
                {service.desc}
              </p>
              
              {/* Hover Indicator */}
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-0.5 bg-[#0D1321] transform group-hover:scale-x-150 transition-transform duration-300"></div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>
          
          {/* Clients*/}
          <section id="clients" className="py-20 px-2 md:px-4 bg-[#FFFBEE] text-[#0D1321]">
            <h2 className="text-5xl font-semibold mb-10 text-center font-[cormorant_garamond]">People Who Trusted My Vision</h2>
            <AutoScrollingClients />
          </section>

          {/* Blog Section */}
          <section id="blog" className="py-20 px-0 bg-[#E7E7E7] text-[#0D1321]">
            <h2 className="text-6xl font-semibold mb-4 font-[cormorant_garamond] text-center">Life Behind the Lens</h2>
            <BlogSection />
          </section>

          {!showWelcome && (
  <footer className="bg-[#0D1321] text-white py-12 w-full">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
      {/* Left: Logo + Text + Back to Top */}
      <div className="flex flex-col items-center md:items-start space-y-4 max-w-xs text-center md:text-left">
        <Image
          src="/signature-dinuka.png"
          alt="Logo"
          width={300}
          height={100}
          className="object-contain"
        />
        <p className="text-[#FFFBEE] font-[DM_Sans]">
          Let&apos;s connect and create something amazing together.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition font-[DM_Sans]"
        >
          ↑ Back to Top
        </button>
      </div>

      {/* Middle: Navigation (aligned right on md+) */}
      <div className="w-full md:w-auto">
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-[#FFFBEE] font-[DM_Sans] text-lg">
          <Link href="/#home" className="hover:underline">
            Home
          </Link>
          <Link href="/#about" className="hover:underline">
            About
          </Link>
          <Link href="/portfolio" className="hover:underline">
            Work
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <a
            href="https://wa.me/94716295618"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </div>

    {/* Divider line */}
    <hr className="border-[#FFFBEE] opacity-30 mt-10 max-w-7xl mx-auto px-6" />

    {/* Address | Email | Phone line */}
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-center gap-4 text-[#FFFBEE] font-[DM_Sans] mt-6 text-center text-sm">
      <span>Nawala, Colombo, Sri Lanka</span>
      <span className="hidden sm:inline">|</span>
      <span>dinukab202@gmail.com</span>
      <span className="hidden sm:inline">|</span>
      <span>+94 71 629 5618</span>
    </div>

    {/* Divider line */}
    <hr className="border-[#FFFBEE] opacity-30 mt-6 max-w-7xl mx-auto px-6" />

    {/* Copyright + Developer credit */}
    <div className="text-center mt-6">
      <div className="text-sm text-[#FFFBEE] font-[DM_Sans]">
        &copy; {new Date().getFullYear()} All rights reserved Dinuka Gunawardana
      </div>
      <div className="text-xs text-[#FFFBEE] font-[DM_Sans] mt-1">
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
)}

        </>
      )}
    </main>
  );
}