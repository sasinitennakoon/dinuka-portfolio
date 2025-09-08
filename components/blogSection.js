"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Noto_Sans_Sinhala } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sinhala font
const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  display: "swap",
});

// Detect Sinhala
const containsSinhala = (text) => /[\u0D80-\u0DFF]/.test(text);
const splitSinhalaAndEnglish = (text) => {
  const sinhalaRegex = /[\u0D80-\u0DFF]+/g;
  const parts = [];
  let lastIndex = 0,
    match;
  while ((match = sinhalaRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, match.index), isSinhala: false });
    }
    parts.push({ text: match[0], isSinhala: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), isSinhala: false });
  }
  return parts;
};

// Blogs
const blogs = [
  {
    id: 1,
    title: "දහසක් සිත් සනහන අවුකන බුදු පිළිම වහන්සේ",
    date: "මැයි 25, 2024",
    excerpt: "අනුරාධපුර යුගයේ නිර්මාණය වූ හිටි පිළිම සලකා බලන කල්හි ඉතාම වැදගත් නිර්මාණයක් ලෙස අවුකන බුද්ධ ප්‍රතිමාව...",
    image: "/blog/awukana.jpeg",
    link: "/blog/Awukana-buddha-statue",
  },
  {
    id: 2,
    title: "අභිමානවත් නිදහසේ අනුස්මරණ​ය",
    date: "MARCH 25, 2024",
    excerpt: "නිදහස සිහිගන්වමින් ඉදිකෙරුණු නිදහස් අනුස්මරණ ශාලාව එසේත් නැත්නම් නිදහස් චතුරස්‍රය...",
    image: "/blog/1700150925743.jpeg.jpg",
    link: "/blog/independent-square",
  },
  {
    id: 3,
    title: "Ceylon Cinnamon",
    date: "NOVEMBER 15, 2023",
    excerpt: "The Cinnamon industry in Sri Lanka is renowned worldwide for its high-quality cinnamon production. Often referred to as...",
    image: "/blog/Ceylon Cinnamon.jpg",
    link: "/blog/ceylon-cinnamon",
  },
  {
    id: 4,
    title: "Thelme Costume",
    date: "AUGUST 12, 2023",
    excerpt: "Thelme costume may refer to as the main costume of low country dance tradition. This costume arrangement is very...",
    image: "/blog/Thelme Costume.jpg",
    link: "/blog/thelme-costume",
  },
  {
    id: 5,
    title: "කෝච්චි පාරේ උසම තැන සොයා ගියෙ​මු",
    date: "AUGUST 03, 2023",
    excerpt: "Summit Level” යනු ශ්‍රී ලංකාවේ මධ්‍යම කඳුකරය හරහා දිවෙන ප්‍රධාන දුම්රිය මාර්ගයේ උසම...",
    image: "/blog/pattipola.jpg",
    link: "/blog/pattipola-summit-point",
  },
];

export default function BlogSection() {
  const containerRef = useRef(null);
  const scrollAmount = useRef(0);
  const animationId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll (desktop only)
  useEffect(() => {
    if (isMobile) return; // disable auto-scroll on mobile
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isPaused) {
        scrollAmount.current += 0.5;
        if (scrollAmount.current >= container.scrollWidth / 2) {
          scrollAmount.current = 0;
        }
        container.scrollLeft = scrollAmount.current;
      }
      animationId.current = requestAnimationFrame(scroll);
    };

    animationId.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId.current);
  }, [isPaused, isMobile]);

  // Manual scroll with arrows (mobile)
  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.querySelector(".blog-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // card + gap
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="blog" className="py-20 px-6 md:px-16 bg-[#E7E7E7] text-black relative">
      <div
        ref={containerRef}
        className={`w-full cursor-default select-none relative ${
          isMobile ? "overflow-x-auto flex snap-x snap-mandatory" : "overflow-hidden"
        }`}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
      >
        <div className={`flex gap-8 w-max ${isMobile ? "mx-auto" : ""}`}>
          {[...blogs, ...blogs].map((blog, index) => {
            const titleParts = splitSinhalaAndEnglish(blog.title);
            const dateParts = containsSinhala(blog.date) ? splitSinhalaAndEnglish(blog.date) : null;
            const excerptParts = containsSinhala(blog.excerpt) ? splitSinhalaAndEnglish(blog.excerpt) : null;

            return (
              <Link
                href={blog.link}
                key={`${blog.id}-${index}`}
                className={`blog-card flex-shrink-0 w-80 min-h-[430px] bg-[#FFFBEE] rounded-xl shadow-lg overflow-hidden 
                  hover:shadow-2xl transition-all border border-black text-left 
                  ${isMobile ? "snap-center" : ""}`}
              >
                <div className="relative w-full h-48 p-2">
                  <div className="w-full h-full relative rounded-t-lg overflow-hidden border border-[#0D1321]">
                    <Image src={blog.image} alt={blog.title} fill loading="lazy" className="object-cover" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-3xl font-bold mb-2 text-center">
                    {titleParts.map((part, i) => (
                      <span
                        key={i}
                        className={part.isSinhala ? notoSinhala.className : "font-[playfair_display]"}
                      >
                        {part.text}
                      </span>
                    ))}
                  </h3>
                  <p className="text-xs text-gray-500 text-left">
                    {dateParts ? (
                      dateParts.map((part, i) => (
                        <span key={i} className={part.isSinhala ? notoSinhala.className : ""}>
                          {part.text}
                        </span>
                      ))
                    ) : (
                      blog.date
                    )}
                  </p>
                  <br />
                  <p className="text-sm text-gray-700">
                    {excerptParts ? (
                      excerptParts.map((part, i) => (
                        <span
                          key={i}
                          className={part.isSinhala ? notoSinhala.className : "font-[DM_Sans]"}
                        >
                          {part.text}
                        </span>
                      ))
                    ) : (
                      <span className="font-[DM_Sans]">{blog.excerpt}</span>
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Arrow buttons (mobile only) */}
      {isMobile && (
        <>
          <button
            onClick={() => handleScroll("left")}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </section>
  );
}
