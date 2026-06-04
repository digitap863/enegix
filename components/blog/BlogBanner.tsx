"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BlogBanner() {
  return (
    <section className="w-full relative flex items-center overflow-hidden bg-white" style={{ minHeight: "100vh" }}>

      {/* ── MOBILE background image (hidden on md+) ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/assets/Blog/Mobile_banner.png')" }}
      />

      {/* Mobile overlay: dark top fade so text is readable, fade out to white at bottom */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.2) 100%)",
        }}
      />

      {/* ── DESKTOP background image: right-anchored ~65% width (hidden below md) ── */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block md:w-[68%] lg:w-[65%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/Blog/Banner.png')" }}
      />

      {/* Desktop blue tint overlays on image */}
      <div className="absolute right-0 top-0 bottom-0 hidden md:block md:w-[68%] lg:w-[65%] bg-[#001d4a]/15 mix-blend-color pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 hidden md:block md:w-[68%] lg:w-[65%] bg-gradient-to-br from-[#011540]/8 via-transparent to-[#003c71]/18 mix-blend-overlay pointer-events-none" />

      {/* Desktop seamless horizontal fade: white → transparent */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 0%, #ffffff 33%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0) 58%)",
        }}
      />

      {/* Desktop subtle bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,0.25) 85%, rgba(255,255,255,0.5) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full"
        style={{ paddingTop: "calc(96px + 4rem)", paddingBottom: "4rem" }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-[520px] text-left">
          {/* Category label */}
          <motion.span
            variants={itemVariants}
            className="font-roboto font-bold text-[#72D210] uppercase tracking-[0.18em] text-[11px] md:text-xs block mb-4"
          >
            JOURNAL &middot; FIELD NOTES FROM THE PLANT ROOM
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-exo font-extrabold text-[#011540] text-[38px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.05] tracking-tight uppercase mb-5"
          >
            ENGINEERING,
            <br />
            WRITTEN BY THE
            <br />
            ENGINEERS.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-roboto text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-[400px]"
          >
            Code updates, commissioning lessons and design decisions from ENEGIX
            projects across healthcare, industry, science and hospitality.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
