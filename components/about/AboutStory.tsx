"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const certLogos = [
  { src: "/assets/About/IAF.png",   alt: "IAF Certified" },
  { src: "/assets/About/eiaci.png", alt: "EIACI Certified" },
  { src: "/assets/About/eagle.png", alt: "Eagle Certification" },
];

export default function AboutStory() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-10">

        {/* ── Full-width Heading ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span className="font-roboto font-medium text-[#4E9208] uppercase tracking-widest text-base block">
            TRUSTED GAS SYSTEM SPECIALISTS
          </span>
          <h2 className="font-roboto font-extrabold text-[#1C2539] text-3xl sm:text-4xl md:text-[38px] leading-tight tracking-tight uppercase">
            EXCELLENCE THROUGH PRECISION
          </h2>
        </motion.div>

        {/* ── Two-column: Image left | Text right ── */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

          {/* LEFT: Image + cert logos */}
          <motion.div
            className="w-full lg:w-[48%] flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
          >
            {/* Main image */}
            <div className="relative w-full aspect-[551/309] rounded-[28px] overflow-hidden">
              <Image
                src="/assets/About/secondSection.png"
                alt="Enegix Gas facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>

            {/* Certification logos row */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-nowrap">
              {certLogos.map((logo) => (
                <div key={logo.alt} className="relative h-10 w-16 sm:h-14 sm:w-24 md:h-16 md:w-28 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Description + Founded / HQ */}
          <motion.div
            className="w-full lg:w-[52%] flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <p className="font-roboto text-black text-sm md:text-[15px] leading-relaxed text-justify">
              Enegix Gas Contracting specializes in the design, supply, and installation of
              Central Gas Systems, Medical Gas Systems, and Laboratory Gas Systems across
              the UAE. Driven by a vision to become a leading Central Gas System provider
              in the Middle East, the company is committed to delivering innovative,
              reliable, and high-quality solutions tailored to client needs.
            </p>

            <p className="font-roboto text-black text-sm md:text-[15px] leading-relaxed text-justify">
              Enegix Gas Contracting is Dubai Civil Defence approved company proudly
              certified with ISO 9001, ISO 14001, and ISO 45001 standards, reflecting its
              strong commitment to quality management, environmental responsibility, and
              occupational health &amp; safety. With a focus on excellence and customer
              satisfaction, Enegix ensures the highest standards of service in every
              project undertaken.
            </p>

            {/* Divider */}
            <div className="h-px bg-[#E9ECF1]" />

            {/* Founded / HQ */}
            <div className="flex items-start gap-12">
              <div>
                <p className="font-roboto text-[#011540] text-xs uppercase tracking-widest mb-1">
                  FOUNDED
                </p>
                <p className="font-roboto font-extrabold text-[#1C2539] text-2xl">2019</p>
              </div>
              <div>
                <p className="font-roboto text-[#011540] text-xs uppercase tracking-widest mb-1">
                  HQ
                </p>
                <p className="font-roboto font-extrabold text-[#1C2539] text-2xl">UAE</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
