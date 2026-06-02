import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutVision from "@/components/about/AboutVision";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutCertifications from "@/components/about/AboutCertifications";
import AboutMilestones from "@/components/about/AboutMilestones";

export const metadata: Metadata = {
  title: "About Us | Enegix Gas — Engineering Trust Into Every System",
  description:
    "Learn about Enegix Gas — UAE's trusted specialists in LPG, medical, and laboratory gas infrastructure. Precision-engineered solutions where safety and performance cannot fail.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutMilestones />
      <AboutVision />
      <AboutPrinciples />
      <AboutCertifications />
    </main>
  );
}
