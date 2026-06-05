"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_CATEGORIES, type BlogCategoryFilter, type BlogPost } from "./types/blog.types";
import { useDebounce } from "./hooks/useDebounce";
import SearchWidget from "./SearchWidget";
import CategoriesWidget from "./CategoriesWidget";
import RecentPostsWidget from "./RecentPostsWidget";
import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 2;

export default function BlogListSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [rawSearch, setRawSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategoryFilter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  // Which card is stretched open (null = all collapsed)
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(rawSearch, 320);
  const isSearching = rawSearch !== debouncedSearch;

  // Fetch blogs from DB
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((p: any) => ({
            id: p._id,
            slug: p.slug,
            category: p.category,
            categoryColor: p.categoryColor,
            title: p.title,
            content: p.content,
            date: p.date,
            readTime: p.readTime,
            image: p.image || "/assets/Blog/Banner.png",
            tags: p.tags || [],
          }));
          setBlogPosts(mapped);
        } else {
          setBlogPosts([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs from API:", err);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Filtered list (all pages)
  const filtered = useMemo(() => {
    let results = blogPosts;
    if (activeCategory !== "All") results = results.filter((p) => p.category === activeCategory);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return results;
  }, [blogPosts, debouncedSearch, activeCategory]);

  // Reset page + collapse on filter change
  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [debouncedSearch, activeCategory]);

  // Collapse expanded card on page change
  useEffect(() => { setExpandedId(null); }, [currentPage]);

  // Close mobile filter drawer when activeCategory changes
  useEffect(() => {
    setIsFilterOpen(false);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Toggle: same id collapses, different id expands (only one open at a time)
  const handleToggle = useCallback((id: string | number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  // Sidebar recent-post click: jump to that post's page and expand it
  const handleRecentSelect = useCallback(
    (id: string | number) => {
      const idx = filtered.findIndex((p) => p.id === id);
      if (idx === -1) {
        // Post not in current filter — reset and find in all posts
        setActiveCategory("All");
        setRawSearch("");
        const globalIdx = blogPosts.findIndex((p) => p.id === id);
        if (globalIdx !== -1) {
          const targetPage = Math.floor(globalIdx / POSTS_PER_PAGE) + 1;
          setCurrentPage(targetPage);
          setExpandedId(id);
        }
      } else {
        const targetPage = Math.floor(idx / POSTS_PER_PAGE) + 1;
        setCurrentPage(targetPage);
        setExpandedId(id);
      }
    },
    [filtered, blogPosts]
  );

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Blog post list */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button (Top on mobile) */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-[#F5F6FA] hover:bg-gray-100 text-[11px] font-roboto font-bold text-[#011540] uppercase tracking-wider rounded-sm transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-[#4E9208]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filter & Search
              </button>
              
              {activeCategory !== "All" && (
                <span className="text-[10px] font-roboto font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-sm" style={{ backgroundColor: blogPosts.find((p) => p.category === activeCategory)?.categoryColor ?? "#011540" }}>
                  {activeCategory}
                </span>
              )}
            </div>

            {/* Active filter badge */}
            <AnimatePresence>
              {activeCategory !== "All" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 mb-5"
                >
                  <span className="font-roboto text-[11px] text-gray-500">Showing:</span>
                  <span
                    className="font-roboto text-[11px] font-semibold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-sm"
                    style={{ backgroundColor: blogPosts.find((p) => p.category === activeCategory)?.categoryColor ?? "#011540" }}
                  >
                    {activeCategory}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className="font-roboto text-[11px] text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕ clear
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards, skeleton loading, or empty state */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6 animate-pulse"
                >
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="bg-[#F5F6FA] border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                      <div className="bg-gray-200 w-full h-[220px]" />
                      <div className="p-5 space-y-4">
                        <div className="flex gap-4">
                          <div className="h-3 bg-gray-200 rounded w-20" />
                          <div className="h-3 bg-gray-200 rounded w-20" />
                          <div className="h-3 bg-gray-200 rounded w-20" />
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-8 bg-gray-200 rounded w-28 mt-4" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : paginated.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-exo font-bold text-gray-400 text-base">No posts found</p>
                  <p className="font-roboto text-gray-400 text-sm mt-1">Try a different search or category</p>
                  <button
                    type="button"
                    onClick={() => { setRawSearch(""); setActiveCategory("All"); }}
                    className="mt-3 font-roboto text-sm font-semibold text-[#4E9208] hover:text-[#72D210] transition-colors"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${currentPage}-${debouncedSearch}-${activeCategory}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col gap-6"
                >
                  {paginated.map((post, index) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      index={index}
                      isExpanded={expandedId === post.id}
                      onToggle={handleToggle}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filtered.length > 0 && (
              <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
            )}
          </div>

          {/* RIGHT — Sidebar (hidden on mobile, visible on desktop) */}
          <aside className="hidden lg:block w-full lg:w-[300px] shrink-0">
            <SearchWidget value={rawSearch} onChange={setRawSearch} isLoading={isSearching} />
            <CategoriesWidget posts={blogPosts} active={activeCategory} onChange={setActiveCategory} />
            <RecentPostsWidget posts={blogPosts} onSelect={handleRecentSelect} />
          </aside>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[200] bg-[#011540]/50 backdrop-blur-xs lg:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[201] w-[290px] max-w-[85vw] bg-white shadow-2xl p-5 flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <h3 className="font-exo font-bold text-[#011540] text-[13px] uppercase tracking-wider">Filters</h3>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-[14px]"
                >
                  ✕
                </button>
              </div>

              {/* Widgets inside mobile drawer */}
              <SearchWidget value={rawSearch} onChange={setRawSearch} isLoading={isSearching} />
              <CategoriesWidget posts={blogPosts} active={activeCategory} onChange={setActiveCategory} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
