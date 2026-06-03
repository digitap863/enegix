import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Enegix Gas — Engineering Trust Into Every System",
  description:
    "Get in touch with Enegix Gas — UAE's trusted specialists in LPG, medical, and laboratory gas infrastructure. Reach out to our engineering team for customized, safe, and certified gas solution designs.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
    </main>
  );
}
