'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogPosts } from '../../data/blogPosts';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
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

  const handleAboutClick = () => {
  console.log("About clicked!");
  setMobileMenuOpen(false); // maybe you want to close the menu
};


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
     <Navbar />



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
                    className="bg-white px-4 py-1 text-sm sm:text-xs rounded-full font-medium border border-black"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-y-2 gap-x-4 sm:gap-x-6 text-base sm:text-xs md:text-m text-gray-600 italic mb-6">
                <span className="block w-full sm:w-auto">📅 Published on {post.date}</span>
                <span className="block w-full sm:w-auto">⏱️ {readingTime} min read</span>
                <span className="block w-full sm:w-auto">
                  ✍️ Written by <span className="font-medium">{post.author}</span>
                </span>
              </div>

              <hr className="my-4 border-gray-300" />

              <div
  className="prose max-w-none
             prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6
             prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4
             prose-p:text-justify"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
            </div>
          </article>
        </div>
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