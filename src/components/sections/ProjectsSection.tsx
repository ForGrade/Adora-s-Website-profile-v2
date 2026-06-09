"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { MetricPanel } from "@/components/ui/elite/MetricPanel";
import { ProjectStatus } from "@/components/ui/elite/ProjectStatus";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { SystemCard } from "@/components/ui/elite/SystemCard";
import { TechBadge } from "@/components/ui/elite/TechBadge";
import { fadeUp, staggerContainer } from "@/components/ui/elite/utils/animationPresets";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";
import type { Project } from "@/types";

function getProjectStatus(project: Project): "Operational" | "Development" | "Archived" {
  if (project.githubUrl || project.showcaseUrl) return "Operational";
  return "Development";
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { projects } = usePortfolioData();

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section id="projects" ref={ref} className="bg-[var(--color-card)] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>CLASSIFIED OPS</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Classified Operations
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
          Building more than applications — building the skills, discipline, and experience needed
          to create meaningful digital solutions.
        </p>

        <motion.div
          className="mt-10 grid gap-6"
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp}>
              <SystemCard glowIntensity="high" className="relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,229,255,0.03)] to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 motion-reduce:opacity-0"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                  PROJECT_{String(index + 1).padStart(3, "0")}
                </p>
                <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
                    {project.title}
                  </h3>
                  <ProjectStatus status={getProjectStatus(project)} />
                </div>
                <p className="mt-1 font-mono text-xs text-[var(--color-secondary)]">{project.type}</p>
                <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <TechBadge key={technology} name={technology} />
                  ))}
                </div>
                <div className="mt-5">
                  <MetricPanel
                    items={[
                      { label: "Performance", value: "High" },
                      { label: "Complexity", value: "Med" },
                      { label: "Scale", value: "Team" },
                    ]}
                    className="grid-cols-3"
                  />
                </div>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {project.githubUrl ? (
                    <Button
                      href={project.githubUrl}
                      variant="secondary"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      GitHub
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled aria-disabled="true">
                      Repository Coming Soon
                    </Button>
                  )}
                  {project.showcaseUrl ? (
                    <Button
                      href={project.showcaseUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      Live Demo
                    </Button>
                  ) : (
                    <Button disabled aria-disabled="true">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </SystemCard>
            </motion.div>
          ))}
        </motion.div>

        <SystemCard className="mt-8 border-[var(--color-primary)]/30" glowIntensity="low">
          <SectionLabel as="span">INCOMING</SectionLabel>
          <h3 className="mt-3 text-2xl font-bold text-[var(--color-text)]">
            More Projects in Progress
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
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
                className="rounded-sm border border-[var(--color-border)] bg-[var(--color-dark-surface)] px-3 py-2 font-mono text-sm text-[var(--color-text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </SystemCard>
      </div>
    </section>
  );
}
