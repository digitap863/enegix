"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { type ServiceData } from "./data/services";

interface ServiceProcessProps {
  service: ServiceData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ServiceProcess({ service }: ServiceProcessProps) {
  // Use generic term "System" unless it's the Laboratory service
  const isLab = service.slug.includes("laboratory");
  
  const steps = [
    { number: "01", title: "Consultation &\nRequirement Analysis" },
    { number: "02", title: isLab ? "Laboratory Planning\n& Engineering" : "System Planning\n& Engineering" },
    { number: "03", title: "Supply & Infrastructure\nInstallation" },
    { number: "04", title: "Testing & System\nCommissioning" },
    { number: "05", title: "Client Approval &\nHandover" },
    { number: "06", title: "Maintenance &\nTechnical Support" },
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-3 block"
          >
            END-TO-END TURNKEY SOLUTIONS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-roboto font-extrabold text-[#041B3A] text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide"
          >
            OUR PROVEN SUCCESS
          </motion.h2>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* We use a flex container that wraps on mobile but stays in a row on desktop */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Item */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center w-full lg:w-[150px] shrink-0"
                >
                  <span className="font-roboto font-bold text-[#72D210] text-[22px] md:text-[26px] mb-4 block">
                    {step.number}
                  </span>
                  <h4 className="font-roboto font-bold text-[#041B3A] text-[14px] md:text-[15px] leading-snug whitespace-pre-line">
                    {step.title}
                  </h4>
                </motion.div>

                {/* Arrow Connector (hidden on last item) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    variants={itemVariants}
                    className="hidden lg:flex items-center justify-center flex-grow opacity-60"
                  >
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 10H58M58 10L50 4M58 10L50 16" stroke="#72D210" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}

                {/* Mobile Down Arrow Connector (hidden on last item) */}
                {index < steps.length - 1 && (
                  <motion.div 
                    variants={itemVariants}
                    className="flex lg:hidden items-center justify-center py-2 opacity-60"
                  >
                    <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0V38M10 38L4 32M10 38L16 32" stroke="#72D210" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
