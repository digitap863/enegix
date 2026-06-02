"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

const milestones = [
  {
    num: "01",
    title: "Foundation",
    desc: "Started with specialized LPG infrastructure projects across UAE industrial sites.",
  },
  {
    num: "02",
    title: "Expansion",
    desc: "Expanded capability into laboratory and medical gas engineering systems.",
  },
  {
    num: "03",
    title: "Regional Projects",
    desc: "Delivered infrastructure across critical facilities throughout the Emirates.",
  },
  {
    num: "04",
    title: "Engineering Leadership",
    desc: "Recognized for precision, compliance, and uninterrupted reliability.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.12 },
  }),
};

export default function AboutMilestones() {
  const LINE_DURATION = 4; // Slow animation duration (in seconds)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-roboto font-medium text-[#4E9208] uppercase tracking-widest text-base block">
            OUR STORY
          </span>
          <h2 className="font-roboto font-extrabold text-[#1C2539] text-3xl sm:text-4xl md:text-[42px] tracking-tight uppercase">
            ENGINEERING MILESTONES
          </h2>
        </motion.div>

       {/* ── Timeline ── */}
<div className="relative">

  {/* Dotted green line — full width, positioned to strike through the center of the dots */}
  <motion.div
    className="hidden md:block absolute z-0"
    style={{
      top: "11px",
      left: "0",
      borderTop: "2px dashed #4E9208",
    }}
    initial={{ width: "0%" }}
    whileInView={{ width: "100%" }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: LINE_DURATION, ease: "linear" }}
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
    {milestones.map((m, i) => (
      <div key={m.num} className="relative flex flex-col items-center text-center md:items-start md:text-left">
        {/* Dot — pops up exactly when the line draws to it (staggered delay on desktop, instant on mobile) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.45,
            ease: "backOut",
            delay: isMobile ? 0.15 : i * (LINE_DURATION * 0.25),
          }}
          className="relative z-10 w-[22px] h-[22px] rounded-full border-2 border-[#4E9208] bg-white flex items-center justify-center mb-8 mx-auto md:mx-0"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-[#4E9208]" />
        </motion.div>

        {/* Text content — animates at the exact same time the dot is struck */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: isMobile ? 0.15 : i * (LINE_DURATION * 0.25),
          }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <span className="font-roboto font-extrabold text-[#4E9208] text-sm mb-1 block">
            {m.num}
          </span>
          <h3 className="font-roboto font-bold text-[#1C2539] text-[15px] mb-2">
            {m.title}
          </h3>
          <p className="font-roboto text-[#6A6A6A] text-xs leading-relaxed max-w-[280px] md:max-w-none">
            {m.desc}
          </p>
        </motion.div>
      </div>
    ))}
  </div>

</div>
      </div>
    </section>
  );
}
