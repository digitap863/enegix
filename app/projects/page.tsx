import type { Metadata } from "next";
import ProjectsBanner from "@/components/project/ProjectsBanner";
import ProjectsStats from "@/components/project/ProjectsStats";
import ProjectsGrid from "@/components/project/ProjectsGrid";

export const metadata: Metadata = {
  title: "Our Projects | Enegix Gas — Engineered, Installed, Certified",
  description:
    "Explore Enegix Gas's portfolio of precision gas infrastructure projects delivered across healthcare, industry, science and hospitality — under live operational constraints, with zero compromise on safety.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsBanner />
      <ProjectsStats />
      <ProjectsGrid />
    </main>
  );
}
