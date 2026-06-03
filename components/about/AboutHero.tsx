"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AboutHero() {
  return (
    <section
      className="w-full relative flex items-center overflow-hidden bg-[#041B3A] min-h-screen"
    >
      {/* Background image — slow zoom */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/About/Banner.png')",
          animation: "heroBgZoom 18s ease-in-out infinite alternate",
        }}
      />

      {/* Dark gradient overlay — heavier on the left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B3A]/90 via-[#041B3A]/50 to-transparent pointer-events-none" />

      {/* Bottom green accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] via-[#4E9208]/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-2xl">

          {/* Breadcrumb label */}
          <motion.span
            variants={itemVariants}
            className="font-roboto font-medium text-[#72D210] uppercase tracking-widest text-xs md:text-base block"
          >
            ABOUT
          </motion.span>

          {/* Main heading — Exo font */}
          <motion.h1
            variants={itemVariants}
            className="font-exo font-extrabold text-white text-4xl sm:text-5xl md:text-[58px] leading-tight tracking-tight uppercase mb-2"
          >
            ENGINEERING TRUST
            <br />
            INTO EVERY SYSTEM
          </motion.h1>

          {/* Description — Roboto font */}
          <motion.p
            variants={itemVariants}
            className="font-roboto  text-sm md:text-base leading-relaxed max-w-xl"
          >
            ENEGIX delivers precision-engineered gas infrastructure solutions for medical,
            industrial, laboratory, and commercial environments — where safety and
            performance cannot fail.
          </motion.p>

        </div>
      </motion.div>
    </section>
  );
}
