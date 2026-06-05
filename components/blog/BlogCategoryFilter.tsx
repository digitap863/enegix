"use client";

import React from "react";
import { BLOG_CATEGORIES, type BlogCategoryFilter } from "./types/blog.types";

type Props = {
  active: BlogCategoryFilter;
  onChange: (category: BlogCategoryFilter) => void;
};

/**
 * BlogCategoryFilter
 * A row of pill buttons — one per category.
 * The active pill gets the dark navy fill; others stay ghost.
 */
export default function BlogCategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-0.5">
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat}
          id={`blog-category-${cat.toLowerCase()}`}
          type="button"
          onClick={() => onChange(cat)}
          className={`
            shrink-0 font-roboto font-semibold text-[11px] uppercase tracking-wider
            px-3.5 py-2 rounded-full border transition-all duration-200
            ${
              active === cat
                ? "bg-[#011540] text-white border-[#011540] shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#72D210] hover:text-[#4E9208]"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
