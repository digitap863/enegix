import React, { useMemo } from "react";
import WidgetHeading from "./WidgetHeading";
import { BLOG_CATEGORIES, type BlogCategoryFilter, type BlogPost } from "./types/blog.types";

export default function CategoriesWidget({
  posts,
  active,
  onChange,
}: {
  posts: BlogPost[];
  active: BlogCategoryFilter;
  onChange: (c: BlogCategoryFilter) => void;
}) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const post of posts) map[post.category] = (map[post.category] ?? 0) + 1;
    return map;
  }, [posts]);

  const categories = BLOG_CATEGORIES.filter((c) => c !== "All") as BlogCategoryFilter[];

  return (
    <div className="bg-[#F5F6FA] border border-gray-200 rounded-sm p-4 mb-5 shadow-sm">
      <WidgetHeading title="Categories" />
      <ul className="divide-y divide-gray-100">
        {categories.map((cat) => {
          const count = counts[cat] ?? 0;
          if (!count) return null;
          return (
            <li key={cat}>
              <button
                type="button"
                id={`blog-cat-${cat.toLowerCase()}`}
                onClick={() => onChange(active === cat ? "All" : cat)}
                className={`w-full flex items-center justify-between py-2.5 text-[12px] font-roboto transition-colors text-left group ${active === cat ? "text-[#4E9208] font-semibold" : "text-gray-600 hover:text-[#4E9208]"}`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${active === cat ? "bg-[#72D210]" : "bg-gray-300 group-hover:bg-[#72D210]"}`} />
                  {cat}
                </span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-sm font-roboto font-semibold ${active === cat ? "bg-[#72D210]/15 text-[#4E9208]" : "bg-gray-100 text-gray-400"}`}>
                  ({count})
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
