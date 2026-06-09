import { SITE_METADATA, SOCIAL_LINKS } from "@/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Copyright {year} {SITE_METADATA.ownerName}. Built with Next.js and TypeScript.
        </p>
        {SOCIAL_LINKS.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-2 py-1 font-medium text-foreground transition hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
