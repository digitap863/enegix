"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, AnimatePresence } from "framer-motion";

const oilAndGasServices = [
  {
    image: "/assets/Home_Service/Lpg.png",
    title: "LPG\nSystems",
    desc: "Reliable LPG, medical, and laboratory gas systems for modern facilities.",
    link: "/services/lpg",
  },
  {
    image: "/assets/Home_Service/medical.png",
    title: "Medical\nGas System",
    desc: "HTM/NFPA-compliant oxygen, vacuum, and nitrous oxide networks for hospitals and clinics.",
    link: "/services/medical",
  },
  {
    image: "/assets/Home_Service/laboratory.png",
    title: "LABORATORY TURNKEY\nSOLUTIONS",
    desc: "End-to-end gas room, manifold, and reticulation systems for research and teaching labs.",
    link: "/services/laboratory",
  },
  {
    image: "/assets/Home_Service/maintenance.png",
    title: "Maintenance\n& AMC",
    desc: "Preventive and corrective maintenance contracts with audit-ready documentation.",
    link: "/services/maintenance",
  },
  {
    image: "/assets/Home_Service/fuel.png",
    title: "Fuel Oil\nSystem",
    desc: "Diesel and HFO storage, transfer, and metering systems with bunded tanks.",
    link: "/services/fuel-oil",
  },
  {
    image: "/assets/Home_Service/emergency.png",
    title: "Emergency Gas\nServices",
    desc: "Fast, reliable support when gas systems need immediate attention.",
    link: "/services/emergency",
  },
];

const engineeringSolutions = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.25 6.125a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Conceptual &\nFeasibility Studies",
    desc: "Early-stage design development, layout planning, and system definition to establish a strong foundation.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Basic & Detailed\nEngineering",
    desc: "Preparation of complete engineering packages including PFDs, equipment layouts, piping arrangements, and specs.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "3D Modeling &\nVisualization",
    desc: "Creation of intelligent 3D models for accurate layout planning, clash detection, and multi-discipline coordination.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-12-6h18M3 13.5h18M3.75 6.75h16.5M3.75 17.25h16.5" />
      </svg>
    ),
    title: "Drafting\nServices",
    desc: "Development of precise 2D drawings such as P&IDs, isometrics, GA drawings, and fabrication details using CAD.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Design Documentation\n& Reports",
    desc: "Preparation of datasheets, calculation reports, design notes, and technical documentation to support construction.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Engineering Support\n& Coordination",
    desc: "Integration with client engineering teams to ensure smooth project execution and timely updates.",
  },
  // {
  //   image: "/assets/Home_Service/safety.png",
  //   title: "As-Built &\nRedline Drawings",
  //   desc: "Conversion of field modifications and survey data into accurate as-built documentation for project handover.",
  // },
  // {
  //   image: "/assets/Home_Service/mdi_worker-outline.png",
  //   title: "Technical\nStaffing",
  //   desc: "Highly skilled and qualified engineers, draftsmen, and technical personnel to support your project teams.",
  // },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"oil-gas" | "engineering">("oil-gas");

  return (
    <section className="w-full bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Main Header */}
        <div className="text-center mb-10">
          {/* <motion.span
            className="font-outfit font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-2 block"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Our Services
          </motion.span> */}
          <div className="relative inline-block">
            <motion.h2
              className="font-outfit font-extrabold text-[#041B3A] text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Services
            </motion.h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-8 md:gap-12 mb-12 border-b border-[#041B3A]/10">
          <button
            onClick={() => setActiveTab("oil-gas")}
            className={`relative pb-3.5 font-outfit font-bold uppercase tracking-wider text-[11px] sm:text-xs md:text-sm transition-colors duration-300 cursor-pointer ${
              activeTab === "oil-gas" ? "text-[#72D210]" : "text-[#041B3A] hover:text-[#72D210]"
            }`}
          >
            complete gas solutions
            {activeTab === "oil-gas" && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("engineering")}
            className={`relative pb-3.5 font-outfit font-bold uppercase tracking-wider text-[11px] sm:text-xs md:text-sm transition-colors duration-300 cursor-pointer ${
              activeTab === "engineering" ? "text-[#72D210]" : "text-[#041B3A] hover:text-[#72D210]"
            }`}
          >
            Engineering Solutions
            {activeTab === "engineering" && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {activeTab === "oil-gas"
              ? oilAndGasServices.map((item, index) => (
                  <motion.div
                    key={`oil-gas-${index}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg
                               transition-shadow duration-300
                               py-6 px-3 flex flex-col items-center group cursor-default"
                  >
                    {/* Green top border reveal on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                      style={{ originX: 0 }}
                    />

                    {/* Image */}
                    <motion.div
                      className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0"
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title.replace("\n", " ")}
                        fill
                        className="object-contain transition-transform duration-300"
                        sizes="(max-width: 640px) 56px, 64px"
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-outfit font-bold text-[#041B3A] text-[10px] sm:text-xs uppercase tracking-wide
                                   text-center mt-4 mb-2 whitespace-pre-line leading-snug
                                   min-h-[28px] flex items-center justify-center">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="hidden sm:block font-outfit text-gray-500 text-[10px] sm:text-xs
                                  text-center leading-relaxed max-w-[140px] mx-auto flex-1">
                      {item.desc}
                    </p>

                    {/* Read More */}
                    <Link
                      href={item.link}
                      className="font-outfit text-[#72D210] hover:text-[#5bb808]
                                 text-[10px] sm:text-xs font-bold uppercase tracking-wider
                                 mt-4 inline-flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Read More</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
                    </Link>
                  </motion.div>
                ))
              : engineeringSolutions.map((item, index) => (
                  <motion.div
                    key={`eng-${index}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg
                               transition-shadow duration-300
                               py-6 px-3 flex flex-col items-center group cursor-default"
                  >
                    {/* Green top border reveal on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#72D210] to-[#4E9208]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                      style={{ originX: 0 }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-[#72D210]/10 flex items-center justify-center text-[#72D210] group-hover:bg-[#72D210] group-hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-outfit font-bold text-[#041B3A] text-[10px] sm:text-xs uppercase tracking-wide
                                   text-center mt-4 mb-2 whitespace-pre-line leading-snug
                                   min-h-[28px] flex items-center justify-center">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="hidden sm:block font-outfit text-gray-500 text-[10px] sm:text-xs
                                  text-center leading-relaxed max-w-[140px] mx-auto flex-1">
                      {item.desc}
                    </p>

                    {/* Invisible spacer to match height of Read More button in first tab */}
                    <div className="font-outfit text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-1 opacity-0 select-none pointer-events-none">
                      Read More →
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
