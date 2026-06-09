"use client";

import { cn } from "@/lib/utils";

export type ProjectStatusValue = "Operational" | "Development" | "Archived";

interface ProjectStatusProps {
  readonly status: ProjectStatusValue;
  readonly className?: string;
}

const statusConfig: Record<
  ProjectStatusValue,
  { label: string; dotColor: string; textColor: string; bgColor: string; pulse: boolean }
> = {
  Operational: {
    label: "Operational",
    dotColor: "#00E5FF",
    textColor: "text-[#00E5FF]",
    bgColor: "bg-[rgba(0,229,255,0.08)]",
    pulse: true,
  },
  Development: {
    label: "Development",
    dotColor: "#F59E0B",
    textColor: "text-[#F59E0B]",
    bgColor: "bg-[rgba(245,158,11,0.08)]",
    pulse: false,
  },
  Archived: {
    label: "Archived",
    dotColor: "var(--color-muted)",
    textColor: "text-[var(--color-muted)]",
    bgColor: "bg-[rgba(126,152,163,0.08)]",
    pulse: false,
  },
};

/**
 * Coloured status pill for projects or case studies.
 * Operational → cyan with optional pulsing dot.
 * Development → amber.
 * Archived    → muted grey, no animation.
 */
export function ProjectStatus({ status, className }: ProjectStatusProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
        {config.pulse && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none"
            style={{ backgroundColor: config.dotColor }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: config.dotColor }}
        />
      </span>
      {config.label}
    </span>
  );
}
