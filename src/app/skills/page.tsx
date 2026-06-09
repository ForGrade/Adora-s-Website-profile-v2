import type { Metadata } from "next";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore John Mark R. Adora's technical skills across programming languages, databases, web technologies, and development tools.",
};

export default function SkillsPage() {
  return (
    <main>
      <section className="px-4 pb-4 pt-16 sm:px-6 lg:pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <SectionLabel>TECHNICAL EXPERTISE</SectionLabel>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Skills &amp; Technologies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            A working toolkit built through academic projects, self-directed learning, and
            continuous hands-on practice.
          </p>
        </div>
      </section>
      <SkillsSection />
    </main>
  );
}
