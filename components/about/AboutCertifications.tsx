"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const certs = [
  { src: "/assets/About/eagle.png", alt: "Eagle Certification", width: "w-40 sm:w-24 h-34" },
  { src: "/assets/About/eiaci.png", alt: "EIACI Certification", width: "w-36 sm:w-44 h-24" },
  { src: "/assets/About/ISO_2018.png", alt: "ISO 45001:2018 Certified Company", width: "w-24 sm:w-28 h-28" },
  { src: "/assets/About/ISO_9001.png", alt: "ISO 9001:2015 Certified Company", width: "w-24 sm:w-28 h-28" },
  { src: "/assets/About/ISO_14001.png", alt: "ISO 14001:2015 Certified Company", width: "w-24 sm:w-28 h-28" },
];

export default function AboutCertifications() {
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
            CERTIFICATIONS
          </span>
          <h2 className="font-roboto font-extrabold text-[#011540] text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight uppercase">
            CERTIFIED. APPROVED.
          </h2>
          <p className="font-roboto text-[#5D666F] text-sm md:text-base max-w-2xl leading-relaxed text-center">
            Every system we deliver is documented, inspected, and certified to the most demanding standards in the region.
          </p>
        </motion.div>

        {/* ── Certifications Row ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certs.map((c) => (
            <motion.div
              key={c.alt}
              variants={logoVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className={`relative ${c.width} flex-shrink-0 flex items-center justify-center`}
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 120px, 180px"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
