"use client";

import { useEffect, useMemo, useState } from "react";
import type { ResolvedTheme, ThemePreference } from "@/types";

const STORAGE_KEY = "adora-theme-preference";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

function applyTheme(theme: ResolvedTheme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const initialPreference = readStoredPreference();
    const initialSystemTheme = getSystemTheme();
    setPreferenceState(initialPreference);
    setSystemTheme(initialSystemTheme);
    applyTheme(initialPreference === "system" ? initialSystemTheme : initialPreference);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const nextSystemTheme = getSystemTheme();
      setSystemTheme(nextSystemTheme);
      if (readStoredPreference() === "system") {
        applyTheme(nextSystemTheme);
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    return preference === "system" ? systemTheme : resolveTheme(preference);
  }, [preference, systemTheme]);

  function setPreference(nextPreference: ThemePreference): void {
    window.localStorage.setItem(STORAGE_KEY, nextPreference);
    setPreferenceState(nextPreference);
    applyTheme(nextPreference === "system" ? getSystemTheme() : nextPreference);
  }

  return {
    preference,
    resolvedTheme,
    setPreference,
  };
}
