import type { Metadata } from "next";
import { Button } from "@/components/common/Button";
import { ProjectStatus } from "@/components/ui/elite/ProjectStatus";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { SystemCard } from "@/components/ui/elite/SystemCard";
import { TechBadge } from "@/components/ui/elite/TechBadge";

export const metadata: Metadata = {
  title: { absolute: "Case Studies | John Mark R. Adora" },
  description:
    "Deep engineering case studies showcasing architectural thinking and problem-solving approach.",
};

interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly overview: string;
  readonly technologies: readonly string[];
  readonly published: boolean;
}

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "stack-n-stock-deep-dive",
    title: "Stack n Stock — Architecture Deep Dive",
    overview:
      "How a team of CS students designed and shipped a Flutter + Firebase inventory app from whiteboard to production.",
    technologies: ["Dart", "Flutter", "Firebase"],
    published: false,
  },
  {
    id: "portfolio-systems",
    title: "ADORA.SYSTEMS — Portfolio Architecture",
    overview:
      "Designing a dark intelligence-interface portfolio with Next.js 15, elite component primitives, and zero backend duplication.",
    technologies: ["Next.js", "TypeScript", "Framer Motion"],
    published: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <section
        className="px-4 py-16 sm:px-6 lg:py-20"
        aria-labelledby="cs-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel>INTEL ARCHIVE</SectionLabel>
          <h1
            id="cs-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl"
          >
            Case Studies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
            Deep engineering write-ups exploring architectural decisions, trade-offs, and
            problem-solving approaches behind real projects.
          </p>

          <div
            role="list"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CASE_STUDIES.map((cs) => (
              <SystemCard key={cs.id} role="listitem" glowIntensity="medium" className="flex flex-col">
                <h2 className="text-lg font-bold text-[var(--color-text)]">{cs.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-muted)]">{cs.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
                <div className="mt-4">
                  <ProjectStatus status={cs.published ? "Operational" : "Development"} />
                </div>
                <div className="mt-5">
                  <Button disabled={!cs.published} aria-disabled={!cs.published}>
                    {cs.published ? "Read More" : "Coming Soon"}
                  </Button>
                </div>
              </SystemCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
