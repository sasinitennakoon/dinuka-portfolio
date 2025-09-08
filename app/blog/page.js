"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Noto_Sans_Sinhala } from "next/font/google";

// Import the font directly in this component
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  display: "swap",
});

const blogPosts = [
  {
    title: "දහසක් සිත් සනහන අවුකන බුදු පිළිම වහන්සේ",
    slug: "Awukana-buddha-statue",
    date: "මැයි 25, 2024",
    image: "/blog/awukana.jpeg",
    excerpt: "අනුරාධපුර යුගයේ නිර්මාණය වූ හිටි පිළිම සලකා බලන කල්හි ඉතාම වැදගත් නිර්මාණයක් ලෙස අවුකන බුද්ධ ප්‍රතිමාව...",
    photographer: "© Dinuka Gunawardana"
  },
  {
    title: "අභිමානවත් නිදහසේ අනුස්මරණ​ය",
    slug: "independent-square",
    date: "MARCH 25, 2024",
    image: "/blog/1700150925743.jpeg.jpg",
    excerpt: "නිදහස සිහිගන්වමින් ඉදිකෙරුණු නිදහස් අනුස්මරණ ශාලාව එසේත් නැත්නම් නිදහස් චතුරස්‍රය අද දිනයේ කාගේත් අවධානයට පාත්‍ර වූ ගොඩනැගිල්ලකි...",
  },
  {
    title: "Ceylon Cinnamon",
    slug: "ceylon-cinnamon",
    date: "NOVEMBER 15, 2023",
    image: "/blog/Ceylon Cinnamon.jpg",
    excerpt: "The Cinnamon industry in Sri Lanka is renowned worldwide for its high-quality cinnamon production. Often referred to...",
  },
  {
    title: "Thelme Costume",
    slug: "thelme-costume",
    date: "AUGUST 12, 2023",
    image: "/blog/Thelme Costume.jpg",
    excerpt: "Thelme costume may refer to as the main costume of low country dance tradition. This costume arrangement is very...",
  },
  {
    title: "කෝච්චි පාරේ උසම තැන සොයා ගියෙ​මු",
    slug: "pattipola-summit-point",
    date: "AUGUST 03, 2023",
    image: "/blog/pattipola.jpg",
    excerpt: "“Summit Level” යනු ශ්‍රී ලංකාවේ මධ්‍යම කඳුකරය හරහා දිවෙන ප්‍රධාන දුම්රිය මාර්ගයේ උසම ස්ථානයයි...",
  },
];

// Function to detect if text contains Sinhala characters
const containsSinhala = (text) => {
  return /[\u0D80-\u0DFF]/.test(text);
};

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef(null);
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
    <main className="bg-[#E7E7E7] min-h-screen flex flex-col text-black">
      {/* Navbar */}
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
          borderRadius: mobileMenuOpen ? "1rem" : "9999px",
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
              className="text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter]"
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
              <Link
                href="/#home"
                className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
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

      <div className="flex-grow pt-32 px-4 sm:px-10 md:px-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[playfair_display] mb-4"
          >
            Welcome to My Creative Journal!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-700 font-[DM_Sans]"
          >
            A collection of ideas, creative journeys, and lessons I&apos;ve learned along the way.
          </motion.p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="border border-[#0D1321] rounded-lg shadow hover:shadow-xl bg-[#FFFBEE] transition-all p-4 w-full h-full flex flex-col"
              >
                {/* Image container with fixed height */}
                <div className="rounded w-full h-52 overflow-hidden mb-4 border border-[#0D1321] flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                
                {/* Text content container with flex-grow */}
                <div className="flex-grow flex flex-col">
                  {/* Apply Sinhala font only to Sinhala titles */}
                  <h3 className={`text-xl md:text-2xl font-semibold text-center mb-1 ${
                    containsSinhala(post.title) ? notoSinhala.className : "font-[playfair_display]"
                  }`}>
                    {post.title}
                  </h3>
                  
                  {/* Apply Sinhala font only to Sinhala dates */}
                  <p className={`text-sm text-gray-500 text-center ${
                    containsSinhala(post.date) ? notoSinhala.className : ""
                  }`}>
                    {post.date}
                  </p>
                  
                  {/* Apply Sinhala font only to Sinhala excerpts */}
                  <p className={`text-[#0D1321] text-base line-clamp-3 mt-2 flex-grow ${
                    containsSinhala(post.excerpt) ? notoSinhala.className : "font-[DM_Sans]"
                  }`}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

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
    </main>
  );
}