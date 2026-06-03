"use client";

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
  duration = 2.2,
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
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   Stats data
───────────────────────────────────────── */
const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 10,  suffix: "+", label: "Years of Engineering" },
  { value: 9,   suffix: "+", label: "Sectors Served" },
  { value: 100, suffix: "%", label: "Compliance Record" },
];

/* ─────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────── */
const wrapperVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function ProjectsStats() {
  return (
    <section className="w-full bg-white py-10 md:pt-25 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto bg-[#F5F6FA] rounded-2xl shadow-[0_4px_32px_rgba(4,27,58,0.08)] border-x border-black overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={wrapperVariants}
      >
        {/* Flex row — manual dividers with my inset so they don't touch borders */}
        <div className="flex flex-row">
          {stats.map((stat, i) => (
            <div key={i} className="flex md:flex-1">
              {/* Vertical divider — shown between items only, inset from top & bottom */}
              {i > 0 && (
                <div className="hidden md:flex items-stretch self-stretch">
                  <div className="w-px bg-black my-6" />
                </div>
              )}

              {/* Horizontal divider for mobile stacking */}
              {i > 0 && (
                <div className="md:hidden absolute left-6 right-6 h-px bg-[#d1d9e6]" />
              )}

              <motion.div
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center text-center justify-center px-2 py-4 md:px-8 md:py-8 lg:py-10 group flex-1 relative"
              >
                {/* Horizontal divider for mobile — inside the cell */}
                {i > 0 && (
                  <div className="hidden absolute top-0 left-6 right-6 h-px bg-black" />
                )}

                {/* Animated number */}
                <span className="font-exo font-extrabold text-[#0d2045] text-2xl md:text-4xl lg:text-5xl leading-none mb-1 md:mb-2 tabular-nums">
                  <CountUp to={stat.value} suffix={stat.suffix} duration={2.2} />
                </span>

                {/* Label */}
                <span className="font-roboto text-[#4a5e80] text-[11px] md:text-sm leading-snug">
                  {stat.label}
                </span>

                {/* Hover green underline */}
                <div className="mt-3 h-[2px] w-0 group-hover:w-10 bg-[#72D210] transition-all duration-300 rounded-full" />
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
