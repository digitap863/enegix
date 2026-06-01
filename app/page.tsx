import HeroBanner from "@/components/HeroBanner";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import QualityBanner from "@/components/QualityBanner";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ServicesSection />
      <StatsSection />
      <ProductsSection />
      <QualityBanner />
      <TestimonialsSection />
    </>
  );
}
