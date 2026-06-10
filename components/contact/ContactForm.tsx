"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Dark Navy Details Card */}
          <div className="lg:col-span-5 bg-[#011540] rounded-[24px] p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-[#72D210]/10 rounded-full blur-3xl pointer-events-none" />

            <span className="font-roboto font-bold text-[#4E9208] uppercase tracking-widest text-xs md:text-sm block mb-3">
              CONTACT
            </span>

            <h2 className="font-roboto font-extrabold text-[#4E9208] text-2xl sm:text-3xl md:text-[34px] leading-tight tracking-tight uppercase mb-4">
              TALK TO OUR
              <br />
              ENGINEERING TEAM.
            </h2>

            <p className="font-roboto text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              Share your scope, site, and compliance requirements.
              <br />
              We'll respond within 24 hours.
            </p>

            {/* Info Items List */}
            <div className="space-y-8">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4E9208] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-exo font-bold text-base text-white mb-1">
                    Address
                  </span>
                  <span className="font-roboto text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    Office#10, Mezanine Floor{"\n"}
                    Paradeshi building,{"\n"}
                    Nad Al Hamar,{"\n"}
                    Dubai - United Arab Emirates
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4E9208] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-exo font-bold text-base text-white mb-1">
                    Email Address
                  </span>
                  <a
                    href="mailto:support@enegix.com"
                    className="font-roboto text-gray-300 text-sm hover:text-[#72D210] transition-colors"
                  >
                    support@enegix.com
                  </a>
                </div>
              </div>

              {/* Contact Us (Phone) */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4E9208] flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-exo font-bold text-base text-white mb-1">
                    Contact Us
                  </span>
                  <a
                    href="tel:+97145758258"
                    className="font-roboto text-gray-300 text-sm hover:text-[#72D210] transition-colors"
                  >
                    +971 4 575 8258
                  </a>
                  <a
                    href="tel:+971564166050"
                    className="font-roboto text-gray-300 text-sm hover:text-[#72D210] transition-colors mt-1"
                  >
                    +971 56 416 6050
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Enquiry Form */}
          <div className="lg:col-span-7 w-full md:pt-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Input fields */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full bg-[#EAEAEA] text-[#001729] placeholder-[#8E8E8E] text-base px-6 py-4.5 rounded-[12px] border border-transparent focus:border-[#4E9208] focus:bg-white focus:outline-none transition-all font-roboto"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                  className="w-full bg-[#EAEAEA] text-[#001729] placeholder-[#8E8E8E] text-base px-6 py-4.5 rounded-[12px] border border-transparent focus:border-[#4E9208] focus:bg-white focus:outline-none transition-all font-roboto"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-[#EAEAEA] text-[#001729] placeholder-[#8E8E8E] text-base px-6 py-4.5 rounded-[12px] border border-transparent focus:border-[#4E9208] focus:bg-white focus:outline-none transition-all font-roboto"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full bg-[#EAEAEA] text-[#001729] placeholder-[#8E8E8E] text-base px-6 py-4.5 rounded-[12px] border border-transparent focus:border-[#4E9208] focus:bg-white focus:outline-none transition-all font-roboto resize-none"
                />
              </div>

              {/* Status Alert Message */}
              {submitStatus.type && (
                <div
                  className={`p-4.5 rounded-[12px] text-sm font-roboto ${
                    submitStatus.type === "success"
                      ? "bg-[#72D210]/15 text-[#4E9208] border border-[#72D210]/30"
                      : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button & Subtitle */}
              <div className="flex flex-col items-center justify-center pt-2 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#011540] hover:bg-[#011540]/95 active:scale-[0.98] text-white font-exo font-semibold text-base py-3.5 px-8 rounded-lg shadow-md transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
                  {!isSubmitting && (
                    <span className="inline-block transition-transform group-hover:translate-x-1 duration-200">
                      →
                    </span>
                  )}
                </button>

                <p className="font-roboto text-black text-s tracking-wide">
                  Please fill out the form, and we'll get in touch with you shortly.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
