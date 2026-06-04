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
    <section className="w-full relative flex items-center overflow-hidden bg-white min-h-screen">
      {/* Background image container - full 100vh/100vw coverage */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-right bg-no-repeat opacity-80 md:opacity-100"
        style={{
          backgroundImage: "url('/assets/Contact/background.png')",
        }}
      />

      {/* Blue color shade/tint overlay on the image */}
      <div className="absolute inset-0 bg-[#001729]/12 mix-blend-color pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#001729]/5 to-[#003c71]/25 mix-blend-overlay pointer-events-none" />

      {/* Fading overlays:
          1. Horizontal fade (left-to-right): Solid white on the left (covering text/nav links) and transitioning to transparent on the right to match the blend model.
          2. Vertical fade (top-to-bottom): Transparent at top, solid white at the bottom to blend with the next section.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-40% md:via-white md:via-45% lg:via-white lg:via-50% to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />

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
            className="font-exo font-extrabold text-[#011540] text-3xl sm:text-4xl md:text-[72px] leading-tight tracking-tight uppercase mb-4"
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
