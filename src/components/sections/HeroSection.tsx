"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { fadeLeft, fadeRight } from "@/components/ui/elite/utils/animationPresets";
import { ProfileImageCarousel } from "@/components/sections/hero/ProfileImageCarousel";

const SUB_HEADLINES = ["Software Engineer", "Systems Builder", "Problem Solver"] as const;
const CYCLE_MS = 3000;

function AbstractSystemVisualisation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" stroke="rgba(0,229,255,0.5)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#hero-grid)" />
        <circle cx="200" cy="200" r="120" stroke="rgba(0,229,255,0.6)" strokeWidth="1" className="origin-center animate-[spin_20s_linear_infinite]" />
        <circle cx="200" cy="200" r="80" stroke="rgba(0,163,255,0.4)" strokeWidth="1" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % SUB_HEADLINES.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      ref={ref}
      className="px-[var(--space-section-x-mobile)] py-[var(--space-section-y-mobile)] sm:px-[var(--space-section-x-desktop)] lg:py-[var(--space-section-y-desktop)]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        {/* Left — text content */}
        <motion.div
          variants={fadeLeft}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
          className="flex flex-col justify-center"
        >
          <SectionLabel>PERSONAL SYSTEM</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-[56px] lg:leading-tight">
            John Mark Adora
          </h1>
          <p className="mt-4 min-h-[2rem] font-mono text-xl text-[var(--color-primary)] sm:text-2xl">
            {SUB_HEADLINES[headlineIndex]}
            {!shouldReduceMotion ? (
              <span
                className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-[var(--color-primary)] motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : null}
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            I build modern web experiences while growing strong foundations in software engineering,
            databases, problem solving, and clean application architecture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projects">View Projects</Button>
            <Button href="/contact" variant="secondary">
              Contact Me
            </Button>
          </div>
        </motion.div>

        {/* Right — profile image carousel */}
        <motion.div
          variants={fadeRight}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
        >
          {!shouldReduceMotion ? <AbstractSystemVisualisation /> : null}
          <ProfileImageCarousel />
        </motion.div>
      </div>
    </section>
  );
}
