"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    excerpt: "“Summit Level” යනු ශ්‍රී ලංකාවේ මධ්‍යම කඳුකරය හරහා දිවෙන ප්‍රධාන දුම්රිය මාර්ගයේ උසම...",
    image: "/blog/pattipola.jpg",
    link: "/blog/pattipola-summit-point",
  },
];

export default function BlogSection() {
  const containerRef = useRef(null);
  const scrollAmount = useRef(0);
  const animationId = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // ✅ CORRECT - Add curly braces
useEffect(() => {
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
}, [isPaused]);

  return (
    <section
      id="blog"
      className="py-20 px-6 md:px-16 bg-[#E7E7E7] text-black relative"
    >

      <div
        ref={containerRef}
        className="overflow-hidden w-full cursor-default select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-8 w-max">
          {[...blogs, ...blogs].map((blog, index) => (
            <Link
              href={blog.link}
              key={`${blog.id}-${index}`}
              className="flex-shrink-0 w-80 min-h-[430px] bg-[#FFFBEE] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-black text-left h-110"
            >
              <div className="relative w-full h-48 p-2">
                <div className="w-full h-full relative rounded-t-lg overflow-hidden border border-[#0D1321]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-3xl font-bold mb-2 font-[playfair_display] text-center">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 text-left">{blog.date}</p>
                <br />
                <p className="text-m text-gray-700 font-[DM_Sans]">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}