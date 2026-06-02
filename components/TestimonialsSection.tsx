"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────── */
const testimonials = [
  {
    name: "David Smith",
    role: "Finance Manager",
    avatar: "/assets/avatar.png",
    quote:
      '"Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse rhoncus mauris dignissim ante"',
    rating: 4,
  },
  {
    name: "Sarah Johnson",
    role: "Hospital Director",
    avatar: "/assets/avatar.png",
    quote:
      '"Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse rhoncus mauris dignissim ante"',
    rating: 5,
  },
  {
    name: "Michael Lee",
    role: "Project Engineer",
    avatar: "/assets/avatar.png",
    quote:
      '"Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse rhoncus mauris dignissim ante"',
    rating: 5,
  },
  {
    name: "Ahmed Al Rashid",
    role: "Facility Manager",
    avatar: "/assets/avatar.png",
    quote:
      '"Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse rhoncus mauris dignissim ante"',
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Lab Supervisor",
    avatar: "/assets/avatar.png",
    quote:
      '"Dabus nisl aliquet congue tellus nascetur lectus sagpien mattis arcu dictums augue volutpat felis etiam suspendisse rhoncus mauris dignissim ante"',
    rating: 4,
  },
];

/* ─── Star Rating ──────────────────────────────────────── */
function Stars({ rating, size = "text-lg" }: { rating: number; size?: string }) {
  return (
    <div className={`flex gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-[#F5A623]" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

/* ─── Google Logo (coloured text) ─────────────────────── */
function GoogleLogo() {
  return (
    <span className="font-roboto font-semibold text-2xl tracking-tight select-none">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

/* ─── Main Component ───────────────────────────────────── */
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Build the 3 indices to display (circular)
  const indices = [0, 1, 2].map((i) => (current + i) % total);

  return (
    <section
      className="w-full bg-white flex flex-col"
      style={{ minHeight: "655px" }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 flex flex-col flex-1 py-12">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-roboto font-extrabold text-[#1C2539] uppercase tracking-wide text-3xl sm:text-4xl">
            What Our Clients Say
          </h2>

          {/* Decorative divider with logo icon (masked, no text) */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[2px] w-16 bg-gradient-to-l from-[#4E9208] to-transparent rounded-full" />
            {/* Clip to show only the icon part of the logo */}
            <div className="shrink-0 overflow-hidden" style={{ width: 40, height: 40 }}>
              <Image
                src="/Enegix_Gas_Logo.png"
                alt="Enegix Gas Logo Icon"
                width={120}
                height={40}
                className="object-contain object-left h-[40px] w-auto max-w-none"
              />
            </div>
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#4E9208] to-transparent rounded-full" />
          </div>
        </motion.div>

        {/* ── Carousel Row ── */}
        <div className="relative flex items-center gap-2 flex-1 mt-4">

          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="shrink-0 w-9 h-9 rounded-full border border-[#1C2539] flex items-center justify-center
                       text-[#1C2539] hover:bg-[#1C2539] hover:text-white transition-colors duration-200 z-10"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <AnimatePresence mode="wait">
              {indices.map((idx, pos) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${pos}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: pos * 0.07 }}
                    className={`bg-white border border-[#E9ECF1] rounded-xl shadow-sm hover:shadow-md
                               transition-shadow duration-300 p-5 flex flex-col gap-4
                               ${pos === 0 ? "flex" : "hidden sm:flex"}`}
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#E9ECF1]">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-roboto font-bold text-[#1C2539] text-sm">{t.name}</p>
                        <p className="font-roboto text-[#6A6A6A] text-xs">{t.role}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#E9ECF1]" />

                    {/* Quote */}
                    <p className="font-roboto text-[#5D666F] text-xs sm:text-[13px] leading-relaxed flex-1">
                      {t.quote}
                    </p>

                    {/* Stars */}
                    <Stars rating={t.rating} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="shrink-0 w-9 h-9 rounded-full border border-[#1C2539] flex items-center justify-center
                       text-[#1C2539] hover:bg-[#1C2539] hover:text-white transition-colors duration-200 z-10"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* ── Dot Indicators ── */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#4E9208] w-5" : "bg-[#E9ECF1]"
              }`}
            />
          ))}
        </div>

        {/* ── Bottom Rating Bar ── */}
        <div className="mt-8 pt-6 border-t border-[#E9ECF1] flex items-center justify-between flex-wrap gap-4">
          {/* Left: Excellent + stars */}
          <div className="flex items-center gap-3">
            <span className="font-roboto font-extrabold text-[#1C2539] text-sm uppercase tracking-widest">
              Excellent
            </span>
            <Stars rating={4} size="text-xl" />
          </div>

          {/* Center: Score */}
          <p className="font-roboto text-[#6A6A6A] text-sm">
            4.9 out of 5 based on{" "}
            <span className="font-semibold text-[#1C2539]">120+</span> reviews
          </p>

          {/* Right: Google */}
          <GoogleLogo />
        </div>

      </div>
    </section>
  );
}
