"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Category = "ALL" | "MEDICAL" | "INDUSTRIAL" | "LABORATORY" | "LPG" | "COMMERCIAL";

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
   Demo data
───────────────────────────────────────── */
const DEMO_IMAGE = "/assets/Project/Banner.png";

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    projectCode: "P-01",
    category: "MEDICAL",
    year: 2024,
    title: "Tertiary Hospital Medical Gas Plant",
    client: "Confidential Healthcare Group",
    location: "Abu Dhabi | UAE",
    description:
      "Turnkey O₂, N₂O, MA4, MA7 and vacuum plant with reticulated pipework to 412 bedhead outlets, AVSU panels and master alarms — HTM 02-01 compliant.",
    image: DEMO_IMAGE,
  },
  {
    id: 2,
    projectCode: "P-02",
    category: "INDUSTRIAL",
    year: 2024,
    title: "Petrochemical Nitrogen Distribution",
    client: "Petrofac Middle East",
    location: "Ruwais | Abu Dhabi",
    description:
      "High-pressure nitrogen distribution system serving 12 process units. Designed and commissioned under live operational constraints.",
    image: DEMO_IMAGE,
  },
  {
    id: 3,
    projectCode: "P-03",
    category: "LABORATORY",
    year: 2024,
    title: "Research Laboratory Specialty Gases",
    client: "Khalifa University",
    location: "Dubai | UAE",
    description:
      "Specialty gas distribution covering Ar, He, H₂, N₂ and CO₂ across 32 lab benches with individual point-of-use regulators and centralised monitoring.",
    image: DEMO_IMAGE,
  },
  {
    id: 4,
    projectCode: "P-04",
    category: "LABORATORY",
    year: 2024,
    title: "Research Laboratory Specialty Gases",
    client: "UAEU Science Labs",
    location: "Al Ain | UAE",
    description:
      "Piped N₂, Ar and compressed air for 45 fume hoods across 5 floors, commissioned without disrupting adjacent occupied laboratories.",
    image: DEMO_IMAGE,
  },
  {
    id: 5,
    projectCode: "P-05",
    category: "LABORATORY",
    year: 2024,
    title: "Research Laboratory Specialty Gases",
    client: "Petro Lab Emirates",
    location: "Dubai | UAE",
    description:
      "Full specialty gas infrastructure for a petroleum testing laboratory with intrinsically-safe zone classification and LEL monitoring.",
    image: DEMO_IMAGE,
  },
  {
    id: 6,
    projectCode: "P-06",
    category: "LPG",
    year: 2024,
    title: "Commercial LPG Distribution",
    client: "Emaar Hospitality",
    location: "Downtown Dubai | UAE",
    description:
      "Bulk LPG storage and distribution for a mixed-use hospitality complex covering 4 restaurants, banquet kitchen and central laundry.",
    image: DEMO_IMAGE,
  },
  {
    id: 7,
    projectCode: "P-07",
    category: "MEDICAL",
    year: 2023,
    title: "Day Surgery Centre MGPS",
    client: "Aster DM Healthcare",
    location: "Sharjah | UAE",
    description:
      "Complete MGPS installation for a 120-bed day surgery centre including AGSS and nurse call integration.",
    image: DEMO_IMAGE,
  },
  {
    id: 8,
    projectCode: "P-08",
    category: "COMMERCIAL",
    year: 2023,
    title: "Hotel Chain Gas Infrastructure",
    client: "Rotana Hotels",
    location: "Abu Dhabi | UAE",
    description:
      "LPG and CO₂ systems for a 5-star hotel — kitchen, laundry, pool and spa — with BMS integration and automatic leak detection.",
    image: DEMO_IMAGE,
  },
  {
    id: 9,
    projectCode: "P-09",
    category: "INDUSTRIAL",
    year: 2023,
    title: "Food & Beverage CO₂ System",
    client: "Agthia Group",
    location: "Al Ain | UAE",
    description:
      "High-purity food-grade CO₂ distribution for carbonation and purging lines across a large-scale beverage manufacturing facility.",
    image: DEMO_IMAGE,
  },
];

/* ─────────────────────────────────────────
   Config
───────────────────────────────────────── */
const CATEGORIES: Category[] = [
  "ALL",
  "MEDICAL",
  "INDUSTRIAL",
  "LABORATORY",
  "LPG",
  "COMMERCIAL",
];

// Category badge colours (image overlay)
const BADGE_COLORS: Record<Exclude<Category, "ALL">, string> = {
  MEDICAL:    "bg-[#041B3A]",
  INDUSTRIAL: "bg-[#b45309]",
  LABORATORY: "bg-[#166534]",
  LPG:        "bg-[#6d28d9]",
  COMMERCIAL: "bg-[#0e7490]",
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
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        const res = await fetch("/api/projects");
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
            image: p.image || "/assets/Project/Banner.png",
          }));
          setProjectsList(mapped);
        } else {
          setProjectsList(FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.error("Failed to fetch projects from API, using fallback data:", err);
        setProjectsList(FALLBACK_PROJECTS);
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
