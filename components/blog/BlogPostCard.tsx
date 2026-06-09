import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "./types/blog.types";
import { renderMarkdown } from "./utils/renderMarkdown";

export default function BlogPostCard({
  post,
  index,
  isExpanded,
  onToggle,
}: {
  post: BlogPost;
  index: number;
  isExpanded: boolean;
  onToggle: (id: string | number) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.5, delay: index * 0.07, ease: [0.215, 0.61, 0.355, 1] }, y: { duration: 0.5, delay: index * 0.07 } }}
      className={`bg-[#F5F6FA] border rounded-sm shadow-sm overflow-hidden transition-shadow duration-300 ${isExpanded ? "border-[#72D210]/60 shadow-md" : "border-gray-200 hover:shadow-md"}`}
    >
      {/* Cover image (fixed height, always visible) */}
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ height: "220px" }}
        onClick={() => onToggle(post.id)}
      >
        <img
          src={post.image}
          alt={post.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isExpanded ? "scale-105" : "hover:scale-105"}`}
        />
        {/* Gradient overlay when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-[#011540]/50 to-transparent"
            />
          )}
        </AnimatePresence>
        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 text-white text-[9px] font-roboto font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
          style={{ backgroundColor: post.categoryColor }}
        >
          {post.category}
        </span>
      </div>

      {/* Card body */}
      <motion.div layout className="p-5">
        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[11px] font-roboto text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-exo font-bold text-[#011540] text-[16px] sm:text-[17px] leading-snug mb-2 uppercase tracking-wide cursor-pointer hover:text-[#4E9208] transition-colors duration-200"
          onClick={() => onToggle(post.id)}
        >
          {post.title}
        </h2>

        {/* EXPANDED CONTENT */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="full-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-roboto text-[10px] font-semibold uppercase tracking-wider text-[#4E9208] bg-[#72D210]/10 border border-[#72D210]/25 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#72D210] via-gray-200 to-transparent mb-5" />

              {/* Article body */}
              <article className="pb-2">{renderMarkdown(post.content)}</article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Read More / Read Less button */}
        <motion.div layout className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggle(post.id)}
            className={`inline-flex items-center gap-1.5 font-roboto text-[11px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-sm border transition-all duration-200 ${
              isExpanded
                ? "bg-[#011540] text-white border-[#011540] hover:bg-[#0a2a5e]"
                : "text-[#4E9208] border-[#72D210] hover:bg-[#72D210] hover:text-white"
            }`}
          >
            {isExpanded ? (
              <>
                Read Less
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Read More
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>

          {/* Read time pill */}
          <span className="font-roboto text-[10px] text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
