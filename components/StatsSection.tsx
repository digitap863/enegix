"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type Variants,
} from "framer-motion";

/* ─────────────────────────────────────────
   CountUp — counts from 0 → `to` when the
   element first enters the viewport.
───────────────────────────────────────── */
function CountUp({
  to,
  suffix,
  duration = 2,
}: {
  to: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, to, duration]);

  return (
    <span ref={ref} className="font-exo font-extrabold text-[#72D210] text-3xl sm:text-4xl leading-none">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   Stats data
───────────────────────────────────────── */
const stats = [
  {
    icon: "/assets/Home_Service/experience.png",
    countTo: 100,
    suffix: "+",
    isSpecial: false,
    specialValue: "",
    label1: "PROJECTS",
    label2: "COMPLETED",
  },
  {
    icon: "/assets/Home_Service/mdi_worker-outline.png",
    countTo: 10,
    suffix: "+",
    isSpecial: false,
    specialValue: "",
    label1: "YEARS OF",
    label2: "EXPERIENCE",
  },
  {
    icon: "/assets/Home_Service/safety.png",
    countTo: 100,
    suffix: "%",
    isSpecial: false,
    specialValue: "",
    label1: "SAFETY",
    label2: "COMPLIANCE",
  },
  {
    icon: "/assets/Home_Service/emergencysupport.png",
    countTo: 0,
    suffix: "",
    isSpecial: true,
    specialValue: "24/7",
    label1: "EMERGENCY",
    label2: "SUPPORT",
  },
];

/* ─────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────── */
const leftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function StatsSection() {
  return (
    <section className="w-full relative overflow-hidden">

      {/* Background image — subtle slow zoom via CSS animation */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/Home_Service/image.png')",
          animation: "bgZoom 14s ease-in-out infinite alternate",
        }}
      />

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#001736]/90" />

      {/* Top subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#72D210 1px, transparent 1px), linear-gradient(90deg, #72D210 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />



      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT ── */}
          <motion.div
            className="flex-1 max-w-xl text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={leftVariants}
          >
            {/* Accent tag */}
            <motion.span
              className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-4 block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Trusted Gas System Specialists
            </motion.span>

            {/* Heading — word-by-word reveal */}
            <h2 className="font-exo font-extrabold text-white text-2xl sm:text-3xl md:text-[38px] leading-tight tracking-wide uppercase mb-5">
              {"Experience. Safety. Reliability.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Description */}
            <motion.p
              className="font-roboto text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Reliable LPG, medical, and laboratory gas systems for modern
              facilities — engineered where precision and safety matter.
              Reliable LPG, medical, and laboratory gas systems for modern
              facilities — engineered where precision and safety matter.
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2
                           bg-[#72D210] hover:bg-[#5bb808] active:scale-95
                           text-white font-roboto font-bold text-sm uppercase tracking-wider
                           px-7 py-3 rounded-sm shadow-md transition-all duration-300
                           hover:shadow-[0_0_20px_rgba(114,210,16,0.4)]"
              >
                About Us
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stat Cards ── */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  transition={{ delay: index * 0.12 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center
                             bg-[#001d44]/60 border border-[#1a3a6b]
                             rounded-xl px-4 py-7 sm:py-9
                             hover:border-[#72D210]/60 hover:bg-[#00234f]/70
                             transition-colors duration-300 group cursor-default"
                  style={{
                    boxShadow: "inset 0 0 0 0 rgba(114,210,16,0)",
                  }}
                >
                  {/* Icon — spins slightly then settles on enter */}
                  <motion.div
                    className="relative w-12 h-12 sm:w-14 sm:h-14 mb-5"
                    initial={{ rotate: -15, scale: 0.7, opacity: 0 }}
                    whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.12 + 0.2, ease: "easeOut" }}
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  >
                    <Image
                      src={stat.icon}
                      alt={stat.label1}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </motion.div>

                  {/* Stat value — CountUp or static */}
                  <div className="mb-3">
                    {stat.isSpecial ? (
                      <motion.span
                        className="font-exo font-extrabold text-[#72D210] text-3xl sm:text-4xl leading-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: index * 0.12 + 0.3 }}
                      >
                        {stat.specialValue}
                      </motion.span>
                    ) : (
                      <CountUp to={stat.countTo} suffix={stat.suffix} duration={2} />
                    )}
                  </div>

                  {/* Labels */}
                  <span className="font-roboto text-gray-300 text-[10px] sm:text-xs uppercase tracking-wider leading-snug">
                    {stat.label1}
                    <br />
                    {stat.label2}
                  </span>

                  {/* Bottom green line reveal on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#72D210] rounded-b-xl"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
