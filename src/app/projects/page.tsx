import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse the projects built by John Mark R. Adora, including mobile applications, web apps, and software engineering work.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="px-4 pb-4 pt-16 sm:px-6 lg:pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <SectionLabel>PORTFOLIO OPS</SectionLabel>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            Things I&apos;ve built — classified operations and engineering deliverables.
          </p>
        </div>
      </section>
      <ProjectsSection />
    </main>
  );
}
