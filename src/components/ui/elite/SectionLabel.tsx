"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "p" | "span" | "div";
}

/**
 * Typographic primitive for section/subsection labels.
 * Renders children in uppercase, letter-spaced, monospace cyan text.
 * No animation — purely presentational.
 */
export function SectionLabel({
  children,
  className,
  as: Component = "p",
}: SectionLabelProps) {
  return (
    <Component
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
