"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    image: "/assets/Home_Service/Lpg.png",
    title: "LPG\nSystems",
    desc: "Reliable LPG, medical, and laboratory gas systems for modern facilities",
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
    title: "LABORATORY TRUNKEY \SOLUTIONS",
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

// Each card animates itself when IT enters the viewport
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#F8FAFC] py-14 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-2 block"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Our Services
          </motion.span>

          {/* Heading + animated underline */}
          <div className="relative inline-block">
            <motion.h2
              className="font-roboto font-extrabold text-[#041B3A] text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Complete Engineering Solutions
            </motion.h2>

          </div>
        </div>

        {/*
          Grid layout:
            mobile  → 2 cols  (3 rows of 2, each row triggers on scroll)
            md      → 3 cols  (2 rows of 3)
            lg+     → 6 cols  (single row)

          Each card has its OWN whileInView observer.
          On mobile, as you scroll past each row, the cards in that row
          fade+slide up individually because each card watches itself.
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {services.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: (index % 2) * 0.1 }}
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
              <h3 className="font-roboto font-bold text-[#041B3A] text-[10px] sm:text-xs uppercase tracking-wide
                             text-center mt-4 mb-2 whitespace-pre-line leading-snug
                             min-h-[28px] flex items-center justify-center">
                {item.title}
              </h3>

              {/* Description — hidden on xs for compact mobile cards */}
              <p className="hidden sm:block font-roboto text-gray-500 text-[10px] sm:text-xs
                            text-center leading-relaxed max-w-[140px] mx-auto flex-1">
                {item.desc}
              </p>

              {/* Read More */}
              <Link
                href={item.link}
                className="font-roboto text-[#72D210] hover:text-[#5bb808]
                           text-[10px] sm:text-xs font-bold uppercase tracking-wider
                           mt-4 inline-flex items-center gap-1 transition-colors group/link"
              >
                <span>Read More</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
