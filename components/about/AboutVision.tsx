"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
  }),
};

const visionCards = [
  {
    title: "Vision",
    desc: "ENEGIX Aims To Be The Acknowledged Leader In The Market By Offering State-Of-The-Art Gas Solutions And Superior Services Utilizing The Best Practice In The Industry.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#4E9208] shrink-0">
        <path d="M12 20V12H20" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 20V12H44" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 44V52H20" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 44V52H44" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 32C18 32 24 20 32 20C40 20 46 32 46 32C46 32 40 44 32 44C24 44 18 32 18 32Z" stroke="#4E9208" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="6" stroke="#4E9208" strokeWidth="2.5" fill="#4E9208" />
      </svg>
    ),
  },
  {
    title: "Mission",
    desc: "As A Dynamic Business Partner, ENEGIX Is Committed To Offer Cutting-Edge Quality Services And ENEGIX Intends To Achieve This By Incorporating A Sense Of Belonging In Each Of Its Staff Through Quality Management Techniques, Positive Attitude And Team Work.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#4E9208] shrink-0">
        <circle cx="32" cy="32" r="20" stroke="#4E9208" strokeWidth="2.5" strokeDasharray="4 4" />
        <circle cx="32" cy="32" r="14" stroke="#4E9208" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="6" stroke="#4E9208" strokeWidth="2.5" fill="#4E9208" />
        <line x1="32" y1="6" x2="32" y2="12" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="52" x2="32" y2="58" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6" y1="32" x2="12" y2="32" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="32" x2="58" y2="32" stroke="#4E9208" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Strength",
    desc: "ENEGIX Offers Comprehensive Services As A Single Or Multi-Service Engineering Partner For Both Small And Large Projects, With An Established Reputation For Delivering High-Quality, Reliable Infrastructure.",
    icon: (
      <svg className="w-12 h-12 text-[#4E9208] shrink-0" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35.7344 25.0379L30.5562 19.841C30.0604 19.3452 29.8125 18.7618 29.8125 18.091C29.8125 17.4202 30.0656 16.8306 30.5719 16.3223L35.75 11.1285C36.2437 10.6327 36.8292 10.3848 37.5063 10.3848C38.1833 10.3848 38.7771 10.6379 39.2875 11.1441L44.4625 16.3379C44.9583 16.8337 45.2062 17.4171 45.2062 18.0879C45.2062 18.7587 44.9531 19.3483 44.4469 19.8566L39.2687 25.0504C38.775 25.5462 38.1896 25.7941 37.5125 25.7941C36.8354 25.7941 36.2417 25.5421 35.7312 25.0379M8.8375 60.5785C8.12292 60.5785 7.52396 60.3368 7.04063 59.8535C6.55521 59.3681 6.3125 58.7681 6.3125 58.0535V49.6379C6.3125 48.3879 6.725 47.315 7.55 46.4191C8.37292 45.5212 9.38333 45.0316 10.5812 44.9504H19.6125C20.4542 44.9504 21.2531 45.1514 22.0094 45.5535C22.7677 45.9535 23.3927 46.5368 23.8844 47.3035C25.476 49.5327 27.4583 51.2619 29.8312 52.491C32.2062 53.716 34.7635 54.3285 37.5031 54.3285C40.2615 54.3285 42.8354 53.715 45.225 52.4879C47.6167 51.2629 49.6021 49.5337 51.1812 47.3004C51.6979 46.5358 52.3281 45.9535 53.0719 45.5535C53.8135 45.1535 54.5875 44.9535 55.3937 44.9535H64.425C65.6354 45.0327 66.6594 45.5212 67.4969 46.4191C68.3344 47.315 68.7531 48.3879 68.7531 49.6379V58.0535C68.7531 58.7681 68.5115 59.3681 68.0281 59.8535C67.5427 60.3368 66.9427 60.5785 66.2281 60.5785H52.5281C51.8115 60.5785 51.2115 60.3368 50.7281 59.8535C50.2427 59.3681 50 58.7681 50 58.0535V52.9879C48.2562 54.4108 46.3156 55.5108 44.1781 56.2879C42.0406 57.065 39.8094 57.4535 37.4844 57.4535C35.2135 57.4535 33.026 57.0702 30.9219 56.3035C28.8135 55.5389 26.8594 54.4473 25.0594 53.0285V58.0535C25.0594 58.7681 24.8177 59.3681 24.3344 59.8535C23.851 60.3389 23.251 60.5806 22.5344 60.5785H8.8375ZM14.3125 39.4223C12.1854 39.4223 10.35 38.6514 8.80625 37.1098C7.26458 35.5681 6.49375 33.7327 6.49375 31.6035C6.49375 29.4327 7.26458 27.5889 8.80625 26.0723C10.3479 24.5577 12.1833 23.8004 14.3125 23.8004C16.4833 23.8004 18.3271 24.5577 19.8438 26.0723C21.3604 27.5889 22.1188 29.4327 22.1188 31.6035C22.1188 33.7327 21.3604 35.5681 19.8438 37.1098C18.3271 38.6514 16.4833 39.4223 14.3125 39.4223ZM60.7062 39.4223C58.5792 39.4223 56.7448 38.6514 55.2031 37.1098C53.6594 35.5681 52.8875 33.7327 52.8875 31.6035C52.8875 29.4327 53.6583 27.5889 55.2 26.0723C56.7417 24.5577 58.5771 23.8004 60.7062 23.8004C62.8771 23.8004 64.7208 24.5577 66.2375 26.0723C67.7542 27.5889 68.5125 29.4327 68.5125 31.6035C68.5125 33.7327 67.7542 35.5681 66.2375 37.1098C64.7208 38.6514 62.8771 39.4223 60.7062 39.4223Z" fill="#4E9208"/>
</svg>

    ),
  },
];

export default function AboutVision() {
  return (
    <section className="w-full relative bg-[#020B18] py-20 md:py-28 overflow-hidden">
      {/* Background Image covering only the left half on desktop, full width on mobile */}
      <div className="absolute top-0 bottom-0 left-0 w-full lg:w-1/2 z-0">
        <Image
          src="/assets/About/mission-vission.png"
          alt="Enegix Gas Plant background"
          fill
          className="object-cover object-center pointer-events-none opacity-90"
          priority
        />
        {/* Richer blue shade overlay to tint the image outlines and shadows */}
        <div className="absolute inset-0 bg-[#0c3c78]/85 mix-blend-color pointer-events-none" />
        <div className="absolute inset-0 bg-[#0a2f61]/50 mix-blend-multiply pointer-events-none" />

        {/* Gradient overlays to fade out to the right and top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020B18]/30 to-[#020B18] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020B18] via-transparent to-[#020B18] pointer-events-none" />
      </div>

      {/* Center Spotlight / Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1E50A2] rounded-full blur-[140px] opacity-35 pointer-events-none z-0" />


      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT: Text intro block */}
          <motion.div 
            className="w-full lg:w-[45%] flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
          >
            <span className="font-roboto font-medium text-[#4E9208] uppercase tracking-widest text-base">
              Vision · Mission · Strength
            </span>
            <h2 className="font-exo font-extrabold text-white text-3xl sm:text-4xl md:text-[36px] leading-tight tracking-tight uppercase">
              What Drives The Engineering
            </h2>
            <p className="font-roboto text-slate-300 text-base md:text-md leading-relaxed max-w-xl">
              The intent, the commitment, and the capability behind every ENEGIX install.
            </p>
          </motion.div>

          {/* RIGHT: Stacked Cards */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {visionCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className="flex flex-col sm:flex-row items-start gap-5 p-6 md:p-8 rounded-2xl transition-all duration-300 border border-[#11294A] bg-[#03142D]/45 hover:border-[#4E9208] hover:bg-[#041F45]/70 hover:shadow-[0_0_20px_rgba(78,146,8,0.15)] backdrop-blur-sm"
              >
                {/* Icon wrapper */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 shrink-0">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-roboto font-extrabold text-[#4E9208] text-xl md:text-2xl leading-none">
                    {card.title}
                  </h3>
                  <p className="font-roboto text-slate-300 text-sm leading-relaxed text-justify font-light">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
