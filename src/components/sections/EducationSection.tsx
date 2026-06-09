"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { SystemCard } from "@/components/ui/elite/SystemCard";
import { fadeUp, lineGrow, staggerContainer } from "@/components/ui/elite/utils/animationPresets";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, { marker: string; badge: string }> = {
  Education: {
    marker: "bg-[var(--color-primary)]",
    badge: "text-[var(--color-primary)] border-[var(--color-primary)]/30",
  },
  Achievements: {
    marker: "bg-[var(--color-secondary)]",
    badge: "text-[var(--color-secondary)] border-[var(--color-secondary)]/30",
  },
  Certificates: {
    marker: "bg-[var(--color-accent)]",
    badge: "text-[var(--color-accent)] border-[var(--color-accent)]/30",
  },
};

function getCategoryStyle(category: string) {
  return (
    categoryStyles[category] ?? {
      marker: "bg-[var(--color-muted)]",
      badge: "text-[var(--color-muted)] border-[var(--color-border)]",
    }
  );
}

export function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { timelineItems } = usePortfolioData();

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section ref={ref} className="bg-[var(--color-card)] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>INTEL TIMELINE</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Education, Achievements &amp; Certificates
        </h2>

        <div className="relative mt-10 pl-8">
          <motion.div
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-[var(--color-border)]"
            variants={lineGrow}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={animationState}
            aria-hidden="true"
          />

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={animationState}
          >
            {timelineItems.map((item) => {
              const style = getCategoryStyle(item.category);
              return (
                <motion.div key={item.id} variants={fadeUp} className="relative">
                  <span
                    className={cn(
                      "absolute -left-8 top-6 size-3 rounded-full border-2 border-[var(--color-card)]",
                      style.marker,
                    )}
                    aria-hidden="true"
                  />
                  <SystemCard glowIntensity="low">
                    <span
                      className={cn(
                        "inline-block rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                        style.badge,
                      )}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
                    {item.subtitle ? (
                      <p className="mt-2 text-sm font-semibold text-[var(--color-muted)]">
                        {item.subtitle}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{item.description}</p>
                    ) : null}
                  </SystemCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
