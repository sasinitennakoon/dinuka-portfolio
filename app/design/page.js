"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GraphicDesignPage() {
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Fade-in effect for images + logos
  useEffect(() => {
    const images = document.querySelectorAll(".fade-in-image");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
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
  } ${mobileMenuOpen ? "rounded-xl" : "rounded-full"}`} // ✅ snap between pill & rounded square
  style={{
    background:
      "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
    backdropFilter: "blur(10px)",
    width: "calc(100% - 3rem)",
    maxWidth: "1400px",
    overflow: "hidden", // ✅ keeps dropdown inside rounded shape
  }}
>
  <div className="flex flex-col md:flex-row items-center px-8 py-4">
    {/* Top row: Logo + Toggle */}
    <div className="flex justify-between w-full items-center md:w-auto">
      <Link href="/#home" className="flex-shrink-0">
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
      <div className="md:hidden w-full mt-4 border-t border-white/20 pt-4 space-y-2 transition-all duration-300">
        <Link href="/#home" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">HOME</Link>
        <Link href="/#about" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">ABOUT</Link>
        <Link href="/portfolio" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">WORK</Link>
        <Link href="/blog" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">BLOG</Link>
        <a href="https://wa.me/94716295618" target="_blank" rel="noopener noreferrer" className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center">CONTACT</a>
      </div>
    )}
  </div>
</nav>


      <main className="bg-[#E7E7E7] min-h-screen px-4 md:px-20 pt-32 pb-12">
        <div className="w-full max-w-6xl mb-4 md:mb-0">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#0D1321] bg-[#FFFBEE] px-4 py-2 rounded-full text-sm font-semibold border border-[#0D1321] shadow-sm hover:bg-[#0D1321] hover:text-[#FFFBEE] transition duration-300 ease-in-out"
          >
            ← Back to Work
          </Link>
        </div>

        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl text-black font-bold font-[playfair_display]">
            GRAPHIC & LOGO DESIGN
          </h1>
          <p className="text-base md:text-xl text-gray-700 mt-4 font-[cormorant_garamond]">
            Crafting bold identities and visual elements that stand out and
            speak clearly.
          </p>
        </section>

        {/* Designs Section */}
        <section
          id="packaging"
          className="border border-black rounded-lg p-6 mb-12 bg-[#FFFCF5]"
        >
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {[
              "1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg",
              "7.jpg","8.jpg","9.jpg","10.jpg","12.jpg","13.jpg",
            ].map((img, i) => (
              <Image
                key={i}
                src={`/design/${img}`}
                alt={`Design ${i}`}
                width={600}
                height={800}
                className={`w-full mb-4 rounded  object-cover shadow-xl fade-in-image opacity-0 translate-y-6 transition-all duration-[2000ms] ease-in-out delay-[${i * 150}ms]`}
              />
            ))}
          </div>
          <br />
          <Image
            src="/design/11.jpg"
            alt="Poster 11"
            width={600}
            height={800}
            className="w-full mb-4 rounded  object-cover shadow-xl fade-in-image opacity-0 translate-y-6 transition-all duration-[2000ms] ease-in-out delay-[1800ms]"
          />
        </section>

        {/* Logo Designs with fade-in */}
        <section
  id="logos"
  className="border border-black rounded-lg px-10 py-16 mb-12 bg-[#FFFCF5]"
>
  <div className="grid grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
    {["L1.jpg","L2.jpg","L3.jpg","L4.jpg","L5.jpg","L6.jpg"].map(
      (logo, i) => (
        <div
          key={i}
          className="flex items-center justify-center h-40 w-full"
        >
          <Image
            src={`/design/${logo}`}
            alt={`Logo ${i + 1}`}
            width={150}
            height={150}
            className={`object-contain border border-black fade-in-image opacity-0 translate-y-6 transition-all duration-[2000ms] ease-in-out delay-[${i * 200}ms]`}
          />
        </div>
      )
    )}
  </div>
</section>


        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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