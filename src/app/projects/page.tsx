import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Things I&apos;ve Built
          </p>
        </div>
      </section>
      <ProjectsSection />
    </main>
  );
}
