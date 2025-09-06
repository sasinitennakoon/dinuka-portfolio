'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

export default function BlogDetailPage({ params }) {
  const router = useRouter();
  
  // Unwrap the params promise first
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  // Hooks must always come first
  const navRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [showArrows, setShowArrows] = useState(false);

  // Now you can compute post data
  const postIndex = blogPosts.findIndex((post) => post.slug === slug);
  const post = blogPosts[postIndex];
  const previousPost = blogPosts[postIndex - 1];
  const nextPost = blogPosts[postIndex + 1];

  // Remaining hooks can be used safely
  const wordCount = post?.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrows(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && nextPost) {
        router.push(`/blog/${nextPost.slug}`);
      } else if (e.key === 'ArrowLeft' && previousPost) {
        router.push(`/blog/${previousPost.slug}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPost, previousPost, router]);

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

  // If post doesn't exist, render fallback
  if (!post) return <div className="text-center mt-20">Blog not found.</div>;

  return (
    <>
      {/* Sticky Navbar - Fixed to prevent jumping */}
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 shadow-md transition-opacity duration-500 ease-in-out opacity-100 rounded-full"
        style={{
          background: "linear-gradient(90deg, rgba(29,42,65,0.9) 0%, rgba(13,19,33,0.9) 50%, rgba(29,42,65,0.9) 100%)",
          backdropFilter: "blur(10px)",
          width: "calc(100% - 3rem)",
          maxWidth: "1400px",
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

          {/* Mobile Menu - Fixed to appear below navbar without affecting its size */}
          {mobileMenuOpen && (
            <div 
              className="md:hidden absolute top-full left-0 right-0 mt-2 py-4 px-6 rounded-2xl z-50"
              style={{
                background: "linear-gradient(90deg, rgba(29,42,65,0.95) 0%, rgba(13,19,33,0.95) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex flex-col space-y-3 text-white">
                <Link
                  href="/#home"
                  className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/#about"
                  className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/portfolio"
                  className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WORK
                </Link>
                <Link
                  href="/blog"
                  className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BLOG
                </Link>
                <a
                  href="https://wa.me/94716295618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#E7E7E7] px-4 py-2 rounded-full hover:bg-white/10 font-[Inter] text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Add padding to main content to account for fixed navbar */}
      <main className="relative bg-[#E7E7E7] min-h-screen flex flex-col items-center px-4 md:px-10 pt-42 pb-10 text-black">
        {/* Floating Arrows */}
        {previousPost && showArrows && (
          <button
            onClick={() => router.push(`/blog/${previousPost.slug}`)}
            className="fixed left-2 top-1/2 transform -translate-y-1/2 z-40 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 transition-opacity duration-300"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        {nextPost && showArrows && (
          <button
            onClick={() => router.push(`/blog/${nextPost.slug}`)}
            className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 bg-white rounded-full shadow-lg p-2 hover:bg-gray-200 transition-opacity duration-300"
          >
            <ArrowRight size={24} />
          </button>
        )}

        {/* Blog Content */}
        <div className="w-full max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0D1321] bg-[#FFFBEE] px-4 py-2 rounded-full text-sm font-semibold border border-[#0D1321] shadow-sm hover:bg-[#0D1321] hover:text-[#FFFBEE] transition duration-300 ease-in-out"
          >
            ← Back to All Blogs
          </Link>

          <article
            className="mt-6 rounded-2xl shadow-lg bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: "url('/blog/Group 3.png')" }}
          >
            {/* Prev/Next on Top */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-100">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                >
                  <ArrowLeftCircle size={20} /> Previous
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                >
                  Next <ArrowRightCircle size={20} />
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* Cover Image + Title */}
            <div className="relative p-4">
              <div className="rounded-xl overflow-hidden shadow-lg relative border border-black">
                <div className="relative w-full aspect-[2.4/1]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent flex justify-center items-end pb-6">
                  <h1 className="text-3xl md:text-6xl font-bold text-black text-center drop-shadow-sm">
                    {post.title}
                  </h1>
                </div>
              </div>

              {post.photographer && (
                <p className="text-m text-right text-black italic mt-2 pr-2">
                  {post.photographer}
                </p>
              )}
            </div>

            {/* tag */}
            <div className="p-4 sm:p-6 md:p-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-4">
                {post.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white px-4 py-1 text-sm sm:text-base rounded-full font-medium border border-black"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-y-2 gap-x-4 sm:gap-x-6 text-base sm:text-lg md:text-xl text-gray-600 italic mb-6">
                <span className="block w-full sm:w-auto">📅 Published on {post.date}</span>
                <span className="block w-full sm:w-auto">⏱️ {readingTime} min read</span>
                <span className="block w-full sm:w-auto">
                  ✍️ Written by <span className="font-medium">{post.author}</span>
                </span>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="text-lg leading-8 text-justify whitespace-pre-line tracking-wide">
                {post.content}
              </div>
            </div>
          </article>
        </div>
      </main>

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