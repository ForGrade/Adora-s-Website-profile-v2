"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getMotionProps } from "./utils/motionHelpers";

type GlowIntensity = "low" | "medium" | "high";

const glowShadows: Record<GlowIntensity, string> = {
  low: "0 8px 32px rgba(0,229,255,0.12)",
  medium: "0 12px 40px rgba(0,229,255,0.22)",
  high: "0 16px 48px rgba(0,229,255,0.40)",
};

interface SystemCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly glowIntensity?: GlowIntensity;
  readonly href?: string;
  readonly role?: string;
}

const baseClasses =
  "block rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]";

/**
 * Elite classified-ops card with glow elevation on hover.
 * Renders as an anchor when href is provided, otherwise a div.
 */
export function SystemCard({
  children,
  className,
  glowIntensity = "medium",
  href,
  role,
}: SystemCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = getMotionProps(shouldReduceMotion);
  const hoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          boxShadow: glowShadows[glowIntensity],
        },
      };

  const content = (
    <div role={href ? "article" : undefined} className="h-full">
      {children}
    </div>
  );

  if (href) {
    return (
      <motion.div {...motionProps} {...hoverProps} className="h-full">
        <Link href={href} className={cn(baseClasses, "hover-lift h-full", className)} role={role}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...motionProps}
      {...hoverProps}
      role={role}
      className={cn(baseClasses, "hover-lift h-full", className)}
    >
      {children}
    </motion.div>
  );
}
