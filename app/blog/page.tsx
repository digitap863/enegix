import type { Metadata } from "next";
import BlogBanner from "@/components/blog/BlogBanner";

export const metadata: Metadata = {
  title: "Blog | Enegix Gas — Engineering, Written By The Engineers",
  description:
    "Code updates, commissioning lessons and design decisions from ENEGIX projects across healthcare, industry, science and hospitality.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogBanner />
    </main>
  );
}
