"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export default function HeroBanner() {
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
    <div className="w-full relative min-h-[calc(100vh-120px)] lg:h-[calc(100vh-136px)] flex items-center overflow-hidden bg-[#041B3A]">
      {/* 1. Background image — subtle continuous slow zoom */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/Home_Banner/Banner.png')",
          animation: "heroBgZoom 16s ease-in-out infinite alternate",
        }}
      />

      {/* 2. Responsive dark blue gradient overlay (reduced density, image has built-in shade) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B3A]/80 via-[#041B3A]/50 to-[#041B3A]/25 md:from-[#041B3A]/60 md:via-[#041B3A]/20 md:to-transparent pointer-events-none" />

      {/* 3. Main content wrapper using framer-motion (aligned slightly more to the left) */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-0 lg:pr-8 relative z-10 w-full py-16 md:py-24"
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

          {/* Heading (Exo font, slightly reduced size) */}
          <motion.h1 
            variants={itemVariants}
            className="font-exo font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-tight uppercase mb-6"
          >
            SAFE. RELIABLE.<br />
            BUILT TO PERFORM
          </motion.h1>

          {/* Paragraph description (Roboto font, slightly reduced size) */}
          <motion.p 
            variants={itemVariants}
            className="font-roboto text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl mb-8"
          >
            Reliable LPG, medical, and laboratory gas systems for modern facilities — engineered where precision and safety matter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-16"
          >
            {/* Primary CTA — pulsing glow */}
            <Link
              href="#start"
              className="relative inline-flex items-center justify-center bg-[#72D210] hover:bg-[#5bb808] active:scale-95
                         text-white text-[15px] leading-[26px] font-bold px-7 py-3 rounded-sm shadow-md
                         transition-all duration-300 uppercase text-center font-roboto
                         hover:shadow-[0_0_24px_rgba(114,210,16,0.5)]"
              style={{ animation: "ctaPulse 2.6s ease-in-out infinite" }}
            >
              Start a Project
            </Link>

            <a
              href="tel:+97145936064"
              className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-[#72D210]
                         hover:text-[#72D210] active:scale-95 text-white text-[15px] leading-[26px] font-bold
                         px-7 py-2.5 rounded-sm transition-all uppercase text-center font-roboto group"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#72D210] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c-.01-.55-.46-1-1.01-1z" />
              </svg>
              <span>Call Now</span>
            </a>
          </motion.div>

          {/* 4. Bottom feature badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-white/10 pt-8 max-w-4xl"
          >
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <motion.div
                  className="w-10 h-10 relative shrink-0"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={feat.icon}
                    alt={`${feat.title} icon`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <div className="flex flex-col text-left">
                  <span className="font-roboto font-bold text-white text-xs md:text-sm leading-none tracking-wider">{feat.title}</span>
                  <span className="font-roboto font-bold text-white text-xs md:text-sm leading-none tracking-wider mt-0.5">{feat.subtitle}</span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
