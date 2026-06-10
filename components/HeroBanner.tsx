"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export default function HeroBanner() {
  const texts = [
    "SAFE. RELIABLE.\nBUILT TO PERFORM",
    "ENGINEERING TRUST\nINTO EVERY SYSTEM",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === fullText) {
          setTypingSpeed(2000); // pause on full text
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40); // faster delete

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setTypingSpeed(400); // pause before next text
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingSpeed, currentTextIndex]);

  const features = [
    {
      icon: "/assets/Home_Banner/shield.png",
      title: "CIVIL DEFENCE",
      subtitle: "APPROVED",
    },
    {
      icon: "/assets/Home_Banner/Engineers.png",
      title: "CERTIFIED",
      subtitle: "ENGINEERS",
    },
    {
      icon: "/assets/Home_Banner/workinghours.png",
      title: "24/7",
      subtitle: "SUPPORT",
    },
    {
      icon: "/assets/Home_Banner/ontimeDelivery.png",
      title: "ON TIME",
      subtitle: "DELIVERY",
    },
  ];

  // Framer Motion variants for minimal entrance transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full relative min-h-screen flex items-center overflow-hidden bg-[#041B3A]">
      {/* 1. Background image — subtle continuous slow zoom (responsive assets) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: "url('/assets/Home_Banner/mobile_banner.png')",
          animation: "heroBgZoom 16s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: "url('/assets/Home_Banner/Banner.png')",
          animation: "heroBgZoom 16s ease-in-out infinite alternate",
        }}
      />

      {/* 2. Responsive dark blue gradient overlay (darker on left for high text readability on mobile) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B3A]/95 via-[#041B3A]/60 to-[#041B3A]/10 md:from-[#041B3A]/70 md:via-[#041B3A]/30 md:to-transparent pointer-events-none" />

      {/* 3. Main content wrapper using framer-motion (aligned slightly more to the left) */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:pl-0 lg:pr-8 relative z-10 w-full pt-32 pb-16 md:pt-40 md:pb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl">
          
          {/* Accent tag (Roboto font) */}
          <motion.span 
            variants={itemVariants}
            className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-4 block"
          >
            TRUSTED GAS SYSTEM SPECIALISTS
          </motion.span>

          {/* Heading (Exo font) */}
          <motion.h1 
            variants={itemVariants}
            className="font-exo font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-tight uppercase mb-6 min-h-[72px] sm:min-h-[90px] md:min-h-[120px] lg:min-h-[135px]"
          >
            {displayedText.split("\n").map((line, i, arr) => (
              <span key={i} className="block relative">
                {line}
                {i === arr.length - 1 && (
                  <span className="inline-block w-[3px] h-[24px] sm:h-[32px] md:h-[42px] lg:h-[48px] bg-[#72D210] ml-1 animate-pulse align-middle" />
                )}
              </span>
            ))}
          </motion.h1>

          {/* Paragraph description (Roboto font) */}
          <motion.p 
            variants={itemVariants}
            className="font-roboto text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl mb-8"
          >
            Reliable LPG, medical, and laboratory gas systems for modern facilities — engineered where precision and safety matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-[280px] sm:max-w-none mb-16"
          >
            {/* Primary CTA — pulsing glow */}
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center bg-[#4E9208] hover:bg-[#3d7306] active:scale-95
                         text-white text-[15px] leading-[26px] font-bold px-7 py-3 rounded-sm shadow-md
                         transition-all duration-300 uppercase text-center font-roboto
                         hover:shadow-[0_0_24px_rgba(78,146,8,0.5)]"
              style={{ animation: "ctaPulse 2.6s ease-in-out infinite" }}
            >
              START A PROJECT
            </Link>

            <a
              href="tel:+97145758258"
              className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-[#4E9208]
                         hover:text-[#4E9208] active:scale-95 text-white text-[15px] leading-[26px] font-bold
                         px-7 py-2.5 rounded-sm transition-all uppercase text-center font-roboto group"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#4E9208] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c-.01-.55-.46-1-1.01-1z" />
              </svg>
              <span>CALL NOW</span>
            </a>
          </motion.div>

          {/* 4. Bottom feature badges & Logo */}
          <motion.div
            variants={itemVariants}
            className="border-t border-white/10 pt-6 flex flex-row items-center justify-between gap-4 w-full"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 md:gap-8 flex-grow">
              {features.map((feat, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <motion.div
                    className="w-8 h-8 md:w-10 md:h-10 relative shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={feat.icon}
                      alt={`${feat.title} icon`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  <div className="flex flex-col text-left">
                    <span className="font-roboto font-bold text-white text-[10px] md:text-xs leading-none tracking-wider">{feat.title}</span>
                    <span className="font-roboto font-bold text-white text-[10px] md:text-xs leading-none tracking-wider mt-0.5">{feat.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Logo on the right */}
            
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
