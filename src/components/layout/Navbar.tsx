"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(8,16,24,0.85)] backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-widest text-[var(--color-primary)] glow-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]"
        >
          ADORA.SYSTEMS
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 sm:flex">
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

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* Three bars that animate into an X */}
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-[var(--color-primary)] transition-all duration-300 origin-center",
              menuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-[var(--color-primary)] transition-all duration-300",
              menuOpen && "opacity-0 scale-x-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-[var(--color-primary)] transition-all duration-300 origin-center",
              menuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out sm:hidden",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col border-t border-[var(--color-border)] bg-[rgba(8,16,24,0.97)] px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center border-b border-[var(--color-border)] font-mono text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)]",
                    isActive && "text-[var(--color-primary)]",
                  )}
                >
                  {/* Active accent bar */}
                  {isActive ? (
                    <span
                      className="mr-3 inline-block h-4 w-0.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_6px_rgba(0,229,255,0.8)]"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="mr-3 inline-block h-4 w-0.5" aria-hidden="true" />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-4">
            <a
              href="/resume/RESUME-Adora-v3.pdf"
              download
              className="inline-flex w-full min-h-[48px] items-center justify-center rounded-sm border border-[var(--color-primary)] px-4 font-mono text-sm font-medium text-[var(--color-primary)] transition hover:bg-[rgba(0,229,255,0.08)]"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
