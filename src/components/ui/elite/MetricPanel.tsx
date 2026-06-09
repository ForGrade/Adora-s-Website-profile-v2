"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface MetricItem {
  readonly label: string;
  readonly value: string | number;
  readonly unit?: string;
}

interface MetricPanelProps {
  readonly items: readonly MetricItem[];
  readonly className?: string;
}

function isAnimatableNumber(value: string | number): value is number {
  return typeof value === "number" && value > 0;
}

interface MetricCellProps {
  readonly item: MetricItem;
}

function MetricCell({ item }: MetricCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const animatable = isAnimatableNumber(item.value);

  const motionVal = useMotionValue(
    shouldReduceMotion || !animatable ? (animatable ? item.value : 0) : 0,
  );
  const rounded = useTransform(motionVal, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!shouldReduceMotion && isInView && animatable) {
      void animate(motionVal, item.value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, shouldReduceMotion, animatable, item.value, motionVal]);

  const valueContent =
    typeof item.value === "string" ? (
      <span className="font-mono text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
        {item.value}
        {item.unit ? (
          <span className="ml-1 text-lg text-[var(--color-muted)]">{item.unit}</span>
        ) : null}
      </span>
    ) : item.value === 0 ? (
      <span className="font-mono text-3xl font-bold text-[var(--color-text)] sm:text-4xl">0</span>
    ) : animatable ? (
      <span className="font-mono text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
        <motion.span>{rounded}</motion.span>
        {item.unit ? (
          <span className="ml-1 text-lg text-[var(--color-muted)]">{item.unit}</span>
        ) : null}
      </span>
    ) : (
      <span className="font-mono text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
        {String(item.value)}
        {item.unit ? (
          <span className="ml-1 text-lg text-[var(--color-muted)]">{item.unit}</span>
        ) : null}
      </span>
    );

  return (
    <div ref={ref} className="flex flex-col gap-1 p-3">
      {valueContent}
      <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
        {item.label}
      </span>
    </div>
  );
}

/**
 * Intelligence-dashboard metric grid with optional counting animation for numeric values.
 */
export function MetricPanel({ items, className }: MetricPanelProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-card)]",
        className,
      )}
    >
      {items.map((item) => (
        <MetricCell key={item.label} item={item} />
      ))}
    </div>
  );
}
