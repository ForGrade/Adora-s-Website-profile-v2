import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  readonly children: React.ReactNode;
  readonly prompt?: string;
  readonly className?: string;
}

/**
 * Terminal-inspired dark container with a top bar showing three coloured dots
 * and an optional prompt string. Content area uses monospace font.
 */
export function TerminalBlock({ children, prompt, className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-dark-surface)]",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[#0A1520] px-4 py-2">
        <span className="text-[10px] leading-none" style={{ color: "#FF5F56" }}>●</span>
        <span className="text-[10px] leading-none" style={{ color: "#FFBD2E" }}>●</span>
        <span className="text-[10px] leading-none" style={{ color: "#27C93F" }}>●</span>
        {prompt && (
          <span className="ml-2 font-mono text-[11px] text-[var(--color-muted)]">
            {prompt}
          </span>
        )}
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}
