"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProjectsBanner() {
  return (
    <section className="w-full relative flex items-center overflow-hidden bg-[#041B3A] min-h-screen">
      {/* Background image — slow continuous zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/Project/Banner.png')",
          animation: "heroBgZoom 20s ease-in-out infinite alternate",
        }}
      />

      {/* Dark blue gradient overlay — heavy left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B3A]/92 via-[#041B3A]/65 to-[#041B3A]/25 pointer-events-none" />

      {/* Subtle bottom green accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] via-[#4E9208]/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-16 md:pt-40 md:pb-20 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-2xl">
          {/* Label */}
          <motion.span
            variants={itemVariants}
            className="font-roboto font-semibold text-[#72D210] uppercase tracking-[0.2em] text-xs md:text-sm block mb-3"
          >
            OUR PROJECTS
          </motion.span>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-exo font-extrabold text-white text-4xl sm:text-5xl md:text-[58px] leading-[1.05] tracking-tight uppercase mb-5"
          >
            ENGINEERED,
            <br />
            INSTALLED,
            <br className="sm:hidden" />
            <span className="sm:inline hidden"> </span>
            CERTIFIED.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-roboto text-sm md:text-base text-gray-300 leading-relaxed max-w-lg"
          >
            A portfolio of precision gas infrastructure delivered across
            healthcare, industry, science and hospitality — under live
            operational constraints, with zero compromise on safety.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
