"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Pages where "Visit My Creative Eye" should appear
  const creativeEyePages = [
    "/portfolio",
    "/photography",
    "/videography",
    "/editing",
    "/design",
    "/blog",
  ];

  const showCreativeEye =
    creativeEyePages.some((page) => pathname.startsWith(page)) &&
    pathname !== "/"; // Don't show on home

  // Hide navbar on scroll & close mobile menu
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setNavVisible(currentScroll < lastScroll || currentScroll < 100);
      lastScroll = currentScroll;

      if (mobileMenuOpen) setMobileMenuOpen(false); // close mobile menu on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Links
  const links = [
    { label: "HOME", href: "/#home" },
    { label: "ABOUT", href: "/#about" },
    { label: "WORK", href: "/portfolio" },
    { label: "BLOG", href: "/blog" },
    {
      label: "CONTACT",
      href: "https://wa.me/94716295618", // <-- WhatsApp link
      external: true,
    },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        navVisible ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(29,42,65,0.95) 0%, rgba(13,19,33,0.95) 100%)",
        backdropFilter: "blur(20px)",
        width: "calc(100% - 3rem)",
        maxWidth: "1400px",
        borderRadius: mobileMenuOpen ? "1.5rem" : "2rem",
        transition: "border-radius 0.4s ease",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center px-6 py-3">
        {/* Logo + Mobile Button */}
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

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-2 text-sm font-medium ml-auto mr-4 items-center">
          {links.map((item) =>
            item.external ? (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-[Inter]"
              >
                {item.label}
              </motion.a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                scroll={true}
                className="text-white/80 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-[Inter]"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Creative Eye Button */}
          {showCreativeEye && (
            <motion.a
              href="https://www.pexels.com/@dinukagunawardana/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all"
            >
              Visit My Creative Eye
            </motion.a>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full mt-4 space-y-2 overflow-hidden"
            >
              {links.map((item) =>
                item.external ? (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 10 }}
                    className="block border-l-2 border-white/20 pl-4 text-white/80 py-3 hover:text-white transition-all font-[Inter]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    scroll={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border-l-2 border-white/20 pl-4 text-white/80 py-3 hover:text-white transition-all font-[Inter]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile Creative Eye Button */}
              {showCreativeEye && (
                <motion.a
                  href="https://www.pexels.com/@dinukagunawardana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all mx-4 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Visit My Creative Eye
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
