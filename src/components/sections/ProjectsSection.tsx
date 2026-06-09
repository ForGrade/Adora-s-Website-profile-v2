"use client";

import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";

export function ProjectsSection() {
  const { projects } = usePortfolioData();

  return (
    <section id="projects" className="bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured Projects"
          description="Building more than applications-building the skills, discipline, and experience needed to create meaningful digital solutions."
        />
        <div className="mx-auto grid max-w-3xl gap-5">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col p-7 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-accent">{project.type}</p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 flex-1 text-base leading-7 text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {project.githubUrl ? (
                  <Button href={project.githubUrl} variant="secondary" target="_blank" rel="noreferrer">
                    GitHub
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Repository Coming Soon
                  </Button>
                )}
                {project.showcaseUrl ? (
                  <Button href={project.showcaseUrl} target="_blank" rel="noreferrer">
                    Project Showcase
                  </Button>
                ) : (
                  <Button disabled>Project Showcase</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
        <Card className="mx-auto mt-8 max-w-3xl border-accent/30 bg-background">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Coming Soon</p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">More Projects in Progress</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            I am actively working on additional software and web development projects that will be
            showcased here as I continue building my technical skills and professional experience.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {[
              "Future Web Applications",
              "Full-Stack Development Projects",
              "Mobile Development Projects",
              "Personal Software Solutions",
            ].map((item) => (
              <div
                key={item}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
