import React from "react";
import { motion } from "framer-motion";
import WidgetHeading from "./WidgetHeading";

export default function SearchWidget({
  value,
  onChange,
  isLoading,
}: {
  value: string;
  onChange: (v: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="bg-[#F5F6FA] border border-gray-200 rounded-sm p-4 mb-5 shadow-sm">
      <WidgetHeading title="Search" />
      <div className="relative">
        <input
          id="blog-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search posts…"
          className="w-full pr-10 pl-3 py-2 text-[12px] font-roboto text-gray-600 border border-gray-200 rounded-sm bg-white focus:outline-none focus:border-[#72D210] focus:bg-white transition-colors"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {isLoading ? (
            <motion.svg className="w-3.5 h-3.5 text-[#72D210]" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </motion.svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
