"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { type ServiceData } from "./data/services";

interface ServiceDetailsContentProps {
  service: ServiceData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const bottomCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
  },
};

export default function ServiceDetailsContent({ service }: ServiceDetailsContentProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
      
      {/* Top Details Grid */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-12 items-center justify-between mb-20 md:mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* LEFT: Label + Heading + Paragraphs */}
        <div className="w-full lg:w-[580px] space-y-6">
          <motion.div variants={itemVariants}>
            <span className="font-roboto font-bold text-[#72D210] text-[13px] md:text-[14px] uppercase tracking-widest block mb-3">
              {service.detailsLabel}
            </span>
            <h2 className="font-roboto font-extrabold text-[#041B3A] text-[32px] sm:text-[40px] md:text-[50px] leading-[1.1] uppercase tracking-tight mb-6">
              {service.detailsHeading}
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="font-roboto text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            {service.paragraph1}
          </motion.p>
          <motion.p variants={itemVariants} className="font-roboto text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
            {service.paragraph2}
          </motion.p>
        </div>

        {/* RIGHT: Callout card */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="w-full lg:w-[450px] shrink-0"
        >
          <div className="bg-[#F8FAFC] border border-gray-200 border-l-[3.5px] border-l-[#041B3A] rounded-2xl p-2 sm:p-4 shadow-[3px_6px_16px_rgba(4,27,58,0.15)] flex gap-4 items-center transition-shadow duration-300 hover:shadow-[3px_8px_20px_rgba(4,27,58,0.2)]">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src={service.callout.icon}
                alt="Callout Icon"
                fill
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(55%) saturate(5833%) hue-rotate(213deg) brightness(93%) contrast(98%)" }}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-roboto font-semibold text-[#041B3A] text-base sm:text-base leading-tight mb-2">
                {service.callout.title}
              </h3>
              <p className="font-roboto text-[#28284A] text-sm sm:text-sm leading-relaxed">
                {service.callout.body}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom 4-features Row Card */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={bottomCardVariants}
        className="w-full bg-white border border-gray-200 border-x-[2.5px] border-x-[#041B3A] rounded-2xl shadow-[3px_6px_16px_rgba(4,27,58,0.15)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-200"
      >
        {service.features.map((feature, idx) => (
          <motion.div 
            key={idx} 
            className="flex gap-4 items-start p-6 sm:p-8 group cursor-default"
            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)", transition: { duration: 0.2 } }}
          >
            <div className="relative w-10 h-10 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={feature.icon}
                alt={feature.title}
                fill
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(55%) saturate(5833%) hue-rotate(213deg) brightness(93%) contrast(98%)" }}
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-roboto font-bold text-[#041B3A] text-[15px] sm:text-[16px] mb-1.5 transition-colors duration-200 group-hover:text-[#72D210]">
                {feature.title}
              </h4>
              <p className="font-roboto text-gray-500 text-[12px] sm:text-[13px] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
