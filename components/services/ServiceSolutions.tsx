"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { type ServiceData } from "./data/services";

// Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ServiceSolutionsProps {
  service: ServiceData;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ServiceSolutions({ service }: ServiceSolutionsProps) {
  if (!service.solutions || service.solutions.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="font-roboto font-bold text-[#72D210] uppercase tracking-widest text-xs md:text-sm mb-3 block"
          >
            {service.solutionsLabel || "CORE SOLUTIONS"}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-roboto font-extrabold text-[#041B3A] text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-4"
          >
            {service.solutionsHeading || `COMPLETE ${service.subtitle.toUpperCase()} SOLUTIONS`}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-roboto text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            {service.solutionsSubheading || "Key elements that shape how we plan, build, and maintain every system."}
          </motion.p>
        </div>

        {/* Solutions Swiper Carousel */}
        <div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="solutions-swiper !pb-14"
          >
            {service.solutions.map((sol, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="bg-white border border-gray-200/80 rounded-2xl shadow-[3px_6px_16px_rgba(4,27,58,0.08)] hover:shadow-[3px_12px_24px_rgba(4,27,58,0.16)] transition-all duration-300 flex flex-col h-[400px] sm:h-[420px] overflow-hidden mx-1"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative w-full h-[180px] sm:h-[200px] shrink-0 bg-[#041B3A]/5 overflow-hidden">
                    <Image
                      src={sol.image}
                      alt={sol.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-start">
                    <span className="font-roboto font-extrabold text-[#72D210] text-[28px] leading-none mb-3 block">
                      {sol.number}
                    </span>
                    <h3 className="font-roboto font-bold text-[#041B3A] text-[15px] uppercase tracking-wide mb-3 leading-snug">
                      {sol.title}
                    </h3>
                    <p className="font-roboto text-gray-500 text-[13px] leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
