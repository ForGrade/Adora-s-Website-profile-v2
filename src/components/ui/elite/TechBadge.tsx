"use client";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  readonly name: string;
  readonly proficiency?: number; // 0–100
  readonly className?: string;
}

/**
 * Returns the CSS color value for the proficiency dot based on the 0–100 range.
 * < 50   → muted (grey)
 * 50–79  → secondary (#00A3FF, blue)
 * ≥ 80 or omitted → primary (#00E5FF, cyan)
 */
function getProficiencyColor(proficiency: number | undefined): string {
  if (proficiency === undefined) return "var(--color-primary)";
  if (proficiency < 50) return "var(--color-muted)";
  if (proficiency < 80) return "var(--color-secondary)";
  return "var(--color-primary)";
}

/**
 * Technology badge with a coloured proficiency indicator dot.
 * Minimum 44×44 px touch target. WCAG focus ring.
 */
export function TechBadge({ name, proficiency, className }: TechBadgeProps) {
  const dotColor = getProficiencyColor(proficiency);

  return (
    <span
      className={cn(
        "inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 font-mono text-xs text-[var(--color-text)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]",
        className
      )}
    >
      <span
        data-testid="proficiency-dot"
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}
