import React from "react";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/components/services/data/services";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceDetailsContent from "@/components/services/ServiceDetailsContent";
import ServiceSolutions from "@/components/services/ServiceSolutions";
import ServiceProcess from "@/components/services/ServiceProcess";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to find service by slug, key, or common aliases
function getServiceBySlug(slug: string) {
  const normalizedSlug = slug.toLowerCase();
  
  // 1. Direct match by key in SERVICES_DATA
  if (SERVICES_DATA[normalizedSlug]) {
    return SERVICES_DATA[normalizedSlug];
  }
  
  // 2. Match by the 'slug' property in the service values
  const slugMatch = Object.values(SERVICES_DATA).find(
    (s) => s.slug.toLowerCase() === normalizedSlug
  );
  if (slugMatch) return slugMatch;

  // 3. Match by common alias mappings used in website links
  const aliasMap: Record<string, string> = {
    "medical": "medical-gas-system",
    "laboratory": "laboratory-turnkey-solutions",
    "fuel-oil": "fuel-oil-system",
    "maintenance": "maintenance-amc",
    "emergency": "emergency-gas-services",
  };
  
  const mappedKey = aliasMap[normalizedSlug];
  if (mappedKey && SERVICES_DATA[mappedKey]) {
    return SERVICES_DATA[mappedKey];
  }

  // 4. Prefix/fallback match
  const fallbackMatch = Object.values(SERVICES_DATA).find(
    (s) => s.slug.startsWith(normalizedSlug) || normalizedSlug.startsWith(s.slug)
  );
  return fallbackMatch || null;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Enegix Gas",
    };
  }

  return {
    title: `${service.subtitle} | Enegix Gas`,
    description: service.description,
  };
}

// Generate static params for all services so they load instantly
export async function generateStaticParams() {
  const paths = new Set<string>();
  
  Object.keys(SERVICES_DATA).forEach((key) => {
    paths.add(key);
    paths.add(SERVICES_DATA[key].slug);
  });
  
  // Add common aliases
  const aliases = ["medical", "laboratory", "fuel-oil", "maintenance", "emergency"];
  aliases.forEach((alias) => paths.add(alias));

  return Array.from(paths).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full bg-white pb-20 md:pb-32">
      {/* Dynamic Service Banner overlaying active menu */}
      <ServiceBanner service={service} />
      
      {/* Animated details and features content */}
      <ServiceDetailsContent service={service} />

      {/* Complete solutions with grid layout and cards */}
      <ServiceSolutions service={service} />

      {/* End-to-end Turnkey Process section */}
      <ServiceProcess service={service} />
    </main>
  );
}
