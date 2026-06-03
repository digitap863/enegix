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

export default function ContactHero() {
  return (
    <section className="w-full relative flex items-center overflow-hidden bg-white min-h-[50vh] border-b border-gray-100">
      {/* Background image on the right - taking up about half the screen on desktop */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[50%] bg-cover bg-center md:bg-left bg-no-repeat opacity-90"
        style={{
          backgroundImage: "url('/assets/Contact/background.png')",
        }}
      />

      {/* Fade overlay: goes from solid white on the left (where text is) to transparent on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-80% md:via-50% to-white/10 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 md:pt-44 md:pb-24 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-2xl text-left">
          {/* Category label */}
          <motion.span
            variants={itemVariants}
            className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm block mb-3"
          >
            CONTACT
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-exo font-extrabold text-[#001729] text-3xl sm:text-4xl md:text-[52px] leading-tight tracking-tight uppercase mb-4"
          >
            TALK TO OUR
            <br />
            ENGINEERING TEAM.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-roboto text-gray-600 text-sm md:text-base leading-relaxed max-w-xl"
          >
            Share your scope, site, and compliance requirements.
            <br />
            We'll respond within 24 hours.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
