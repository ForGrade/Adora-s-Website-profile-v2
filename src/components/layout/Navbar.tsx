"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS, SITE_METADATA } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        aria-label="Main navigation"
      >
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <Link href="/" className="max-w-44 text-sm font-bold leading-tight sm:max-w-none">
            {SITE_METADATA.ownerName}
          </Link>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <ul className="flex flex-wrap items-center justify-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2",
                    pathname === link.href &&
                      "bg-accent text-background shadow-sm hover:bg-accent hover:text-background",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex">
              <a
                href="/resume/RESUME-Adora-v3.docx"
                download
                className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Resume
              </a>
            </li>
          </ul>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
