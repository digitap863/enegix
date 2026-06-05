import React, { useMemo } from "react";
import Image from "next/image";
import WidgetHeading from "./WidgetHeading";
import type { BlogPost } from "./types/blog.types";

export default function RecentPostsWidget({
  posts,
  onSelect,
}: {
  posts: BlogPost[];
  onSelect: (id: string | number) => void;
}) {
  const recent = useMemo(() => posts.slice(0, 3), [posts]);
  return (
    <div className="hidden lg:block bg-[#F5F6FA] border border-gray-200 rounded-sm p-4 shadow-sm">
      <WidgetHeading title="Recent Posts" />
      <ul className="space-y-3">
        {recent.map((post) => (
          <li key={post.id}>
            <button
              type="button"
              className="flex items-start gap-3 w-full text-left group"
              onClick={() => onSelect(post.id)}
            >
              <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-sm border border-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="flex items-center gap-1 text-[10px] font-roboto text-gray-400 mb-0.5">
                  <svg className="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </p>
                <p className="font-roboto text-[11px] font-semibold text-[#011540] leading-snug line-clamp-2 group-hover:text-[#4E9208] transition-colors">
                  {post.title}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
