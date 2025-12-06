"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence} from "framer-motion";
import { Noto_Sans_Sinhala } from "next/font/google";
import Navbar from '../../components/Navbar';

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
    excerpt: "The aroma is unmistakable sweet, warm, and subtly complex.It is the scent of history, of luxury, and of a...",
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
      <Navbar />

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
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="flex flex-col h-full"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl backdrop-blur-md bg-white/70 
                border border-gray-200 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image container */}
                <div className="relative w-full h-60 overflow-hidden group">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Text content with fixed spacing */}
                <div className="flex flex-col justify-between flex-grow px-5 py-4">
                  <div>
                    <h3
                      className={`text-xl font-medium mb-1 text-[#0D1321] leading-snug line-clamp-2 ${
                        containsSinhala(post.title)
                          ? notoSinhala.className
                          : "font-[playfair_display]"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`text-xs text-gray-500 mb-3 ${
                        containsSinhala(post.date) ? notoSinhala.className : ""
                      }`}
                    >
                      {post.date}
                    </p>
                    <p
                      className={`text-gray-700 text-base line-clamp-3 ${
                        containsSinhala(post.excerpt)
                          ? notoSinhala.className
                          : "font-[DM_Sans]"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Button pinned at bottom */}
                  <div className="mt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#0D1321] font-regular 
                      group-hover:text-black hover:gap-3 transition-all duration-300"
                    >
                      <span className="underline underline-offset-4">Read More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
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