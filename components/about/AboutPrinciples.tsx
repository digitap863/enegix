"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -6,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const borderTopVariants: Variants = {
  hidden: { width: "0%" },
  hover: { width: "100%", transition: { duration: 0.15, ease: "linear" } },
};

const borderRightVariants: Variants = {
  hidden: { height: "0%" },
  hover: { height: "100%", transition: { duration: 0.15, ease: "linear", delay: 0.15 } },
};

const borderBottomVariants: Variants = {
  hidden: { width: "0%" },
  hover: { width: "100%", transition: { duration: 0.15, ease: "linear", delay: 0.3 } },
};

const borderLeftVariants: Variants = {
  hidden: { height: "0%" },
  hover: { height: "100%", transition: { duration: 0.15, ease: "linear", delay: 0.45 } },
};

const principles = [
  {
    num: "01",
    title: "SAFTY FIRST",
    desc: "Zero compromise on safety standards across design, install, and maintenance.",
  },
  {
    num: "02",
    title: "PRECISION ENGINEERING",
    desc: "Every system designed for reliability under continuous operational load.",
  },
  {
    num: "03",
    title: "COMPLIANCE & STANDARDS",
    desc: "Aligned with NFPA, ISO, and UAE Civil Defense regulatory frameworks.",
  },
  {
    num: "04",
    title: "LONG-TERM SUPPORT",
    desc: "Maintenance contracts and 24/7 emergency response infrastructure.",
  },
];

export default function AboutPrinciples() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-roboto font-bold text-[#4E9208] uppercase tracking-widest text-sm">
            CORE VALUES
          </span>
          <h2 className="font-roboto font-extrabold text-[#011540] text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight uppercase max-w-4xl">
            PRINCIPLES WELDED INTO EVERY PROJECT.
          </h2>
          <p className="font-roboto text-[#5D666F] text-sm md:text-base max-w-xl leading-relaxed">
            Four non-negotiables that shape how we plan, build, and maintain every system.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {principles.map((p) => (
            <motion.div
              key={p.num}
              variants={cardVariants}
              whileHover="hover"
              className="group relative flex flex-col justify-between p-8 bg-white border border-[#E9ECF1] rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(1,21,64,0.06)] transition-all duration-300 min-h-[250px] cursor-pointer overflow-hidden"
            >
              {/* Sequential Border Drawing on Hover */}
              <motion.span
                variants={borderTopVariants}
                className="absolute top-0 left-0 h-[2px] bg-[#011540] z-20"
              />
              <motion.span
                variants={borderRightVariants}
                className="absolute top-0 right-0 w-[2px] bg-[#011540] z-20"
              />
              <motion.span
                variants={borderBottomVariants}
                className="absolute bottom-0 right-0 h-[2px] bg-[#011540] z-20"
              />
              <motion.span
                variants={borderLeftVariants}
                className="absolute bottom-0 left-0 w-[2px] bg-[#011540] z-20"
              />

              <div className="flex flex-col gap-6">
                {/* Top Row: Number & Green Horizontal Line */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-roboto font-extrabold text-[#4E9208] text-lg">
                    {p.num}
                  </span>
                  <div className="w-8 h-[2px] bg-[#4E9208]" />
                </div>

                {/* Title */}
                <h3 className="font-roboto font-extrabold text-[#011540] text-lg sm:text-[19px] leading-snug uppercase tracking-tight group-hover:text-[#4E9208] transition-colors duration-300">
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-roboto text-[#5D666F] text-xs sm:text-[13px] leading-relaxed mt-4">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
