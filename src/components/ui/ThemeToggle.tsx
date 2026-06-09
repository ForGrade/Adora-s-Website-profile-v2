"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { preference, resolvedTheme, setPreference } = useTheme();
  const nextPreference = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setPreference(nextPreference)}
      className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-sm font-bold transition hover:border-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label={`Switch to ${nextPreference} mode`}
      title={`Theme: ${preference}`}
    >
      {resolvedTheme === "dark" ? "D" : "L"}
    </button>
  );
}
