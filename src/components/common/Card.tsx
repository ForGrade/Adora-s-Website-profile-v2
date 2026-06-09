import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        "hover-lift rounded-lg border border-border bg-surface p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </article>
  );
}
