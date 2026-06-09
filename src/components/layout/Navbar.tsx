"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(8,16,24,0.85)] backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-widest text-[var(--color-primary)] glow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]"
        >
          ADORA.SYSTEMS
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative min-h-[44px] px-3 py-2 font-mono text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]",
                    isActive && "text-[var(--color-primary)]",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <span
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--color-primary)] shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
          <li className="flex">
            <a
              href="/resume/RESUME-Adora-v3.pdf"
              download
              className="inline-flex min-h-[44px] items-center rounded-sm border border-[var(--color-primary)] px-3 py-2 font-mono text-sm font-medium text-[var(--color-primary)] transition hover:bg-[rgba(0,229,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
