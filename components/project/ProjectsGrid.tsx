"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Category = "ALL" | "MEDICAL" | "FUEL&OIL" | "LABORATORY" | "LPG";

interface Project {
  id: number | string;
  projectCode: string;       // e.g. "P-01"
  category: Exclude<Category, "ALL">;
  year: number;
  title: string;
  client: string;
  location: string;
  description: string;
  image: string;
}


/* ─────────────────────────────────────────
   Config
───────────────────────────────────────── */
const CATEGORIES: Category[] = [
  "ALL",
  "MEDICAL",
   "FUEL&OIL",
  "LABORATORY",
  "LPG"
];

// Category badge colours (image overlay)
const BADGE_COLORS: Record<Exclude<Category, "ALL">, string> = {
  MEDICAL: "bg-[#041B3A]",
  "FUEL&OIL": "bg-[#b45309]",
  LABORATORY: "bg-[#166534]",
  LPG: "bg-[#6d28d9]"
};

const ITEMS_PER_PAGE = 6;

/* ─────────────────────────────────────────
   Card — matches the reference design
───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="flex flex-col bg-[#F5F6FA] rounded-lg overflow-hidden border border-[#e2e8f0] border-l-4 border-l-transparent hover:border-l-[#72D210] shadow-[0_2px_12px_rgba(4,27,58,0.07)] hover:shadow-[0_8px_30px_rgba(4,27,58,0.13)] transition-all duration-300 group"
    >
      {/* ── Image ── */}
      <div className="relative h-32 sm:h-52 shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category badge — top left on image */}
        <span
          className={`absolute top-0 left-0 ${BADGE_COLORS[project.category]} text-white font-roboto font-bold text-[11px] uppercase tracking-wider px-3 py-1.5`}
        >
          {project.category}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 px-3 py-3 sm:px-5 sm:py-5">

          {/* Meta row: project code + year */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="font-roboto text-[10px] sm:text-[12px] text-[#7a8fa6] font-medium tracking-wide">
              {project.projectCode}
            </span>
            <span className="font-roboto text-[10px] sm:text-[12px] text-[#7a8fa6] font-medium">
              {project.year}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e8edf5] mb-2 sm:mb-4" />

          {/* Title */}
          <h3 className="font-roboto font-extrabold text-[#0d2045] text-[13px] sm:text-[18px] leading-snug uppercase mb-2 sm:mb-3 group-hover:text-[#4E9208] transition-colors duration-200">
            {project.title}
          </h3>

          {/* Client | Location */}
          <p className="font-roboto text-[10px] sm:text-[12px] text-[#4a5e80] leading-snug mb-2 sm:mb-3">
            {project.client} |<br />
            {project.location}
          </p>

          {/* Description */}
          <p className="font-roboto text-[10px] sm:text-[13px] text-[#637188] leading-relaxed line-clamp-3 flex-1 hidden sm:block">
            {project.description}
          </p>

          {/* Bottom rule */}
          <div className="h-px bg-black mt-4" />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function ProjectsGrid() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`/api/projects?t=${Date.now()}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((p: any) => ({
            id: p._id,
            projectCode: p.projectCode,
            category: p.category,
            year: p.year,
            title: p.title,
            client: p.client,
            location: p.location,
            description: p.description,
            image: p.image,
          }));
          setProjectsList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch projects from API, using fallback data:", err);
        
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "ALL") return projectsList;
    return projectsList.filter((p) => p.category === activeCategory);
  }, [activeCategory, projectsList]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleCategory(cat: Category) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  return (
    <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => handleCategory(cat)}
              className={`font-roboto font-semibold text-xs uppercase tracking-widest px-5 py-2.5 transition-all duration-200 border
                ${
                  activeCategory === cat
                    ? "bg-[#041B3A] text-white border-[#041B3A] shadow-md"
                    : "bg-white text-[#4a5e80] border-[#dde3ed] hover:border-[#041B3A] hover:text-[#041B3A]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}-${loading}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="flex flex-col bg-[#F5F6FA] rounded-lg overflow-hidden border border-[#e2e8f0] border-l-4 border-l-gray-300 shadow-[0_2px_12px_rgba(4,27,58,0.07)] animate-pulse"
                >
                  <div className="bg-gray-300 h-32 sm:h-52 w-full" />
                  <div className="flex flex-col p-3 sm:p-5 space-y-3">
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-300 rounded w-16" />
                      <div className="h-3 bg-gray-300 rounded w-12" />
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="h-5 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                    <div className="h-3 bg-gray-300 rounded w-full hidden sm:block" />
                    <div className="h-3 bg-gray-300 rounded w-5/6 hidden sm:block" />
                  </div>
                </div>
              ))
            ) : paginated.length > 0 ? (
              paginated.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 font-roboto">
                No projects found in this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {/* Prev */}
            <button
              id="pagination-prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center border border-[#dde3ed] text-[#4a5e80] hover:border-[#041B3A] hover:text-[#041B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                id={`pagination-page-${page}`}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center font-roboto font-semibold text-sm border transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-[#041B3A] text-white border-[#041B3A]"
                      : "bg-white text-[#4a5e80] border-[#dde3ed] hover:border-[#041B3A] hover:text-[#041B3A]"
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              id="pagination-next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center border border-[#dde3ed] text-[#4a5e80] hover:border-[#041B3A] hover:text-[#041B3A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
