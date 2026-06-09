"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "FAQs", href: "/faqs" },
    { name: "Teams", href: "/teams" },
    { name: "Contact Us", href: "/contact" },
  ];

  const services = [
    { name: "LPG Systems", href: "/services/lpg" },
    { name: "Maintenance & AMC", href: "/services/maintenance" },
    { name: "Medical Gas System", href: "/services/medical" },
    { name: "Laboratory Turnkey Solutions", href: "/services/laboratory" },
    { name: "Fuel Oil System", href: "/services/fuel-oil" },
    { name: "Emergency Gas Services", href: "/services/emergency" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.167 1.449 4.753 1.451 5.405 0 9.803-4.364 9.805-9.728.002-2.597-1.005-5.04-2.838-6.87a9.638 9.638 0 0 0-6.862-2.846C6.012 1.16 1.616 5.526 1.614 10.89c-.001 1.69.444 3.336 1.289 4.773l-1.02 3.722 3.821-.996c1.4.762 2.946 1.165 4.933 1.165zm10.793-7.41c-.297-.15-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full flex flex-col font-roboto text-white">
      {/* 1. TOP CALL-TO-ACTION BAR */}
      <div className="w-full bg-[#001E52] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Headline & Description */}
          <div className="flex-1 max-w-xl text-center lg:text-left space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">
              NEED RELIABLE <span className="text-[#72D210]">GAS SOLUTIONS?</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Reliable LPG, medical, and laboratory gas systems for modern facilities.
            </p>
          </div>

          {/* Contact Numbers block */}
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center shrink-0">
            {/* Phone */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6.5 h-6.5 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c-.01-.55-.46-1-1.01-1z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase leading-none mb-1">Call Us Now</span>
                <a href="tel:123456789" className="text-sm font-bold leading-tight hover:text-[#4E9208] transition-colors">12 345 6789</a>
                <a href="tel:123456789" className="text-sm font-bold leading-tight hover:text-[#4E9208] transition-colors">12 345 6789</a>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-10 border-r border-white/10" />

            {/* WhatsApp */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6.5 h-6.5 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.167 1.449 4.753 1.451 5.405 0 9.803-4.364 9.805-9.728.002-2.597-1.005-5.04-2.838-6.87a9.638 9.638 0 0 0-6.862-2.846C6.012 1.16 1.616 5.526 1.614 10.89c-.001 1.69.444 3.336 1.289 4.773l-1.02 3.722 3.821-.996c1.4.762 2.946 1.165 4.933 1.165zm10.793-7.41c-.297-.15-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase leading-none mb-1">Call Us Now</span>
                <a href="tel:123456789" className="text-sm font-bold leading-tight hover:text-[#4E9208] transition-colors">12 345 6789</a>
                <a href="tel:123456789" className="text-sm font-bold leading-tight hover:text-[#4E9208] transition-colors">12 345 6789</a>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="shrink-0 text-center lg:text-right">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#4E9208] hover:bg-[#3a6f06] text-white text-[16px] leading-[26px] font-normal px-5 py-2.5 rounded-sm shadow-sm transition-all hover:shadow-md uppercase"
            >
              <span>Request a Quote</span>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* 2. DOTTED SEPARATOR */}
      <div className="w-full bg-[#041B3A]">
        <div className="max-w-7xl mx-auto border-t-2 border-dotted border-[#005691]/40" />
      </div>

      {/* 3. BOTTOM FOOTER INFO BLOCKS */}
      <div className="w-full bg-[#041B3A] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Logo & About Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/Enegix_Gas_Logo_Footer.png"
                alt="Enegix Gas Logo"
                width={190}
                height={55}
                className="h-11 md:h-14 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Reliable LPG, medical, and laboratory gas <br /> systems for modern facilities.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[#72D210] font-bold text-lg mb-5 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white hover:text-[#72D210] transition-colors flex items-center group">
                    <span className="text-[#72D210] mr-2 transition-transform group-hover:translate-x-0.5">&lt;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="lg:col-span-2">
            <h3 className="text-[#72D210] font-bold text-lg mb-5 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-sm text-white hover:text-[#72D210] transition-colors flex items-center group">
                    <span className="text-[#72D210] mr-2 transition-transform group-hover:translate-x-0.5">&lt;</span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact US Column */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[#72D210] font-bold text-lg uppercase tracking-wider">Contact US</h3>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <span className="text-[#72D210] shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="text-sm text-white leading-relaxed">
                  Office#10, Mezanine Floor<br />
                  Paradeshi building,<br />
                  Nad Al Hamar,<br />
                  Dubai - United Arab Emirates
                </span>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="text-[#72D210] shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c-.01-.55-.46-1-1.01-1z" />
                  </svg>
                </span>
                <a href="tel:+1234567890" className="text-sm text-white hover:text-[#72D210] transition-colors">
                  +123 456 7890
                </a>
              </li>
              {/* Email */}
              <li className="flex items-center gap-3">
                <span className="text-[#72D210] shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <a href="mailto:support@enegix.com" className="text-sm text-white hover:text-[#72D210] transition-colors">
                  support@enegix.com
                </a>
              </li>
            </ul>
          </div>

          {/* Our Location Column */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[#72D210] font-bold text-lg uppercase tracking-wider">Our Location</h3>
            <div className="flex flex-col gap-4">
              <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=Office%2310%2C%20Mezanine%20Floor%2C%20Paradeshi%20building%2C%20Nad%20Al%20Hamar%2C%20Dubai%20-%20UAE&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Enegix Office Location Map"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Office%2310%2C%20Mezanine%20Floor%2C%20Paradeshi%20building%2C%20Nad%20Al%20Hamar%2C%20Dubai%20-%20UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-white hover:text-[#72D210] transition-colors group mt-2"
              >
                <span className="text-[#72D210]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="underline underline-offset-4 decoration-white/10 group-hover:decoration-white transition-all">
                  View on Google Maps
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4. COPYRIGHT & LEGAL BAR */}
      <div className="w-full bg-[#001220] py-6 px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p>
            © 2026 <span className="text-[#4E9208] font-semibold">Tapclone</span> | All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
            <Link href="/map" className="hover:text-white transition-colors">Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
