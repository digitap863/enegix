"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SERVICES_DATA, type ServiceData } from "./data/services";

export default function ServiceBanner({ service }: { service: ServiceData }) {
  const params = useParams();
  const currentSlug = params?.slug as string;

  return (
    <div className="relative w-full overflow-hidden bg-[#041B3A] h-screen min-h-screen flex items-center">
      {/* Background image filling the banner with fade animation */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={service.bannerImage}
          alt={service.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Container wrapper */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-30">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-12">
          
          {/* LEFT — Info block */}
          <motion.div 
            className="flex-1 text-white flex flex-col justify-center max-w-2xl lg:max-w-none"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
          >
            {/* Breadcrumb */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex items-center gap-1.5 text-[11px] font-roboto font-medium uppercase tracking-wider mb-4"
            >
              <Link href="/" className="text-[#72D210] hover:text-[#4E9208] transition-colors">
                SERVICES
              </Link>
              <span className="text-gray-400 font-medium">&gt;</span>
              <span className="text-gray-300">{service.breadcrumb}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-exo font-extrabold text-white text-[28px] sm:text-[36px] md:text-[58px] leading-[1.1] mb-6 uppercase tracking-wide md:max-w-2xl"
            >
              {service.title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-roboto text-gray-300 text-[13px] sm:text-[14px] md:text-[20px] leading-relaxed max-w-xl"
            >
              {service.description}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
