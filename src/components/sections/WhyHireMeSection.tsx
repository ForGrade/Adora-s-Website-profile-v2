"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { SystemCard } from "@/components/ui/elite/SystemCard";
import { fadeUp, staggerContainer } from "@/components/ui/elite/utils/animationPresets";
import { HIRE_REASONS } from "@/constants";

export function WhyHireMeSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section ref={ref} className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>CORE CAPABILITIES</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Why Should You Hire Me?
        </h2>
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
        >
          {HIRE_REASONS.map((reason) => (
            <motion.div key={reason.title} variants={fadeUp}>
              <SystemCard glowIntensity="medium" className="h-full">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{reason.description}</p>
              </SystemCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
