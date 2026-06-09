import { cn } from "@/lib/utils";

interface IntelPanelProps {
  readonly children: React.ReactNode;
  readonly title?: string;
  readonly className?: string;
}

/**
 * Intelligence Panel — a bordered card container with optional monospace title row.
 * Mimics a terminal/dashboard panel aesthetic.
 */
export function IntelPanel({ children, title, className }: IntelPanelProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-[var(--color-border)] bg-[var(--color-card)]",
        className
      )}
    >
      {title && (
        <div className="border-b border-[var(--color-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
