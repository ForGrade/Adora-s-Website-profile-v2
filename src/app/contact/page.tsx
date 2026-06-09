import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with John Mark R. Adora. Send a message for collaboration, opportunities, or general inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="px-4 pb-4 pt-16 sm:px-6 lg:pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contact
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Open to opportunities, collaborations, and conversations. Reach out and I&apos;ll get
            back to you.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
