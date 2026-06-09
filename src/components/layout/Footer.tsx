import { SOCIAL_LINKS } from "@/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-dark-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs tracking-widest text-[var(--color-primary)]">ADORA.SYSTEMS</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {SOCIAL_LINKS.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="min-h-[44px] rounded-sm px-2 py-1 font-medium text-[var(--color-text)] transition hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-surface)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
          <p className="font-mono text-xs text-[var(--color-muted)]">
            {year} · Built with Next.js and TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
