"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollNavigator() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
      setShowButton(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call in case of pre-scrolled page
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208] z-50 transition-all duration-75 ease-out"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(114, 210, 16, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 bg-[#041B3A] hover:bg-[#4E9208] text-white p-3.5 rounded-full shadow-lg cursor-pointer transition-colors duration-300 border border-white/10 flex items-center justify-center"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
