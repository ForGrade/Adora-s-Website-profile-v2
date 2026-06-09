"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { IntelPanel } from "@/components/ui/elite/IntelPanel";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { TechBadge } from "@/components/ui/elite/TechBadge";
import { fadeUp, staggerContainer } from "@/components/ui/elite/utils/animationPresets";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { skillCategories } = usePortfolioData();

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section id="skills" ref={ref} className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>CAPABILITY MATRIX</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Technology Matrix
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
          Technologies grouped by the way they support real software delivery — all categories
          visible simultaneously.
        </p>
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2"
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.id} variants={fadeUp}>
              <IntelPanel title={category.label}>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <TechBadge
                      key={skill.id}
                      name={skill.name}
                      className="transition hover:border-[var(--color-primary)] hover:shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    />
                  ))}
                </div>
              </IntelPanel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
