"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  {
    src: "/assets/Home_Products/eagle.png",
    alt: "UAE Government Emblem",
  },
  {
    src: "/assets/Home_Products/dubaiMuncipality.png",
    alt: "Dubai Municipality",
  },
  {
    src: "/assets/Home_Products/iso.png",
    alt: "ISO Certified Company",
  },
];

export default function QualityBanner() {
  return (
    <section className="w-full bg-[#F0F4F8] border-y border-gray-200 py-8 md:py-0 md:h-[200px]">
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12
                      flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

        {/* Left: Heading */}
        <motion.h2
          className="font-roboto font-extrabold text-[#4E9208] uppercase tracking-wide
                     text-lg sm:text-xl md:text-2xl text-center md:text-left"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          Quality Work. Proven Results.
        </motion.h2>

        {/* Right: Logos */}
        <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="relative shrink-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={89}
                width={122}
                className="object-contain h-[60px] sm:h-[75px] md:h-[89px] w-auto"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
