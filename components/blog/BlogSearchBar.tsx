"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  /** Controlled value of the search input */
  value: string;
  /** Called on every keystroke */
  onChange: (value: string) => void;
  /** Show a spinning icon while the debounce delay is pending */
  isLoading?: boolean;
};

/**
 * BlogSearchBar
 * A styled search input with:
 *  - animated search / loading icon swap
 *  - clear (×) button when the field has content
 */
export default function BlogSearchBar({ value, onChange, isLoading = false }: Props) {
  return (
    <div className="relative flex-1">
      {/* Icon area */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        {isLoading ? (
          <motion.svg
            className="w-4 h-4 text-[#72D210]"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </motion.svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>

      {/* Input */}
      <input
        id="blog-search"
        type="search"
        placeholder="Search articles, topics, authors…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white
                   font-roboto text-sm text-gray-700 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-[#72D210]/40 focus:border-[#72D210]
                   transition-all shadow-sm"
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                     hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
