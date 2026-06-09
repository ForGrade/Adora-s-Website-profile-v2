"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MetricPanel } from "@/components/ui/elite/MetricPanel";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { fadeUp } from "@/components/ui/elite/utils/animationPresets";
import { usePortfolioData } from "@/features/portfolio/hooks/usePortfolioData";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { projects, skillCategories } = usePortfolioData();

  const techCount = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section id="about" ref={ref} className="bg-[var(--color-card)] px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>MISSION</SectionLabel>
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
        >
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Engineering systems that solve real-world problems.
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5 text-base leading-8 text-[var(--color-muted)]">
              <p>
                I am John Mark R. Adora, a Bachelor of Science in Computer Science student who is
                passionate about software development, problem solving, and continuous learning.
              </p>
              <p>
                I enjoy building modern web applications, exploring new technologies, and creating
                solutions that improve user experiences.
              </p>
              <p>
                My engineering philosophy centres on clean architecture, deliberate trade-offs, and
                systems that remain maintainable as they scale. I am continuously expanding my
                knowledge in software engineering, databases, web development, and modern
                development practices.
              </p>
            </div>
            <MetricPanel
              items={[
                { label: "Years Learning", value: 4, unit: "yrs" },
                { label: "Projects Built", value: projects.length },
                { label: "Technologies", value: techCount },
                { label: "Problem Domains", value: skillCategories.length },
              ]}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
