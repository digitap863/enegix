"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full flex flex-col font-roboto">
      {/* 1. TOP INFORMATION BAR */}
      <div className="w-full bg-[#001729] text-white py-2.5 text-xs border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          {/* Location info */}
          <div className="flex items-center gap-2 text-white/90">
            <svg
              className="w-4 h-4 text-white/70 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>Office#10, Mezanine Floor, UAE</span>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap items-center gap-5 justify-center">
            {/* Phone */}
            <a href="tel:+97145936064" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <svg
                className="w-4 h-4 text-white/70 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c-.01-.55-.46-1-1.01-1z" />
              </svg>
              <span>+971 4 593 6064</span>
            </a>

            {/* Email */}
            <a href="mailto:info@enegixtec.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <svg
                className="w-4 h-4 text-white/70 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>info@enegixtec.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="w-full bg-white shadow-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo area */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/Enegix_Gas_Logo.png"
                alt="Enegix Gas Logo"
                width={200}
                height={55}
                className="h-11 md:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-exo text-[16px] leading-[26px] transition-colors hover:text-[#529e0b] ${
                      isActive ? "text-[#001729] font-bold" : "text-[#4b5563] font-normal"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Quote Button (Desktop) */}
            <div className="hidden lg:flex items-center">
              <a
                href="#quote"
                className="inline-flex items-center gap-2 bg-[#4E9208] hover:bg-[#3a6f06] text-white text-[16px] leading-[26px] font-normal px-5 py-2.5 rounded-sm shadow-sm transition-all hover:shadow-md uppercase"
              >
                <span>Request a Quote</span>
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Hamburger menu button (Mobile) */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-[#001729] hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU (Drawer) */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out border-b border-black/5 bg-white ${
          mobileMenuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden py-0"
        }`}
      >
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-exo hover:bg-gray-50 hover:text-[#72D210] ${
                  isActive ? "bg-gray-50 text-[#001729] font-bold" : "text-gray-600 font-normal"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 border-t border-gray-100">
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 bg-[#72D210] hover:bg-[#5bb808] text-white text-[16px] leading-[26px] font-normal py-3 rounded-none shadow-sm uppercase"
            >
              <span>Request a Quote</span>
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
