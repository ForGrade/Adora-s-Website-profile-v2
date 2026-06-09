"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const profileImages = [
  "/images/profile/profile-1.jpg",
  "/images/profile/profile-2.jpg",
  "/images/profile/profile-3.jpg",
] as const;

const ROTATE_MS = 4000;

export function ProfileImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % profileImages.length);
        setVisible(true);
      }, 350);
    }, ROTATE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldReduceMotion]);

  return (
    /*
     * Outer wrapper — transparent background so the page cyber-grid shows
     * through. Border + glow preserved for the HUD frame aesthetic.
     * overflow-hidden clips the image to the rounded frame.
     */
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "border border-[var(--color-border)]",
        "bg-transparent",
        "shadow-[0_0_40px_rgba(0,229,255,0.10),0_0_80px_rgba(0,229,255,0.04)]",
      ].join(" ")}
      role="region"
      aria-label="Profile image carousel"
      aria-live="polite"
    >
      {/* ── Neon corner brackets (HUD frame) ──────────────────── */}
      <span className="pointer-events-none absolute left-0 top-0 z-10 h-7 w-7 border-l-2 border-t-2 border-[var(--color-primary)] opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute right-0 top-0 z-10 h-7 w-7 border-r-2 border-t-2 border-[var(--color-primary)] opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-7 w-7 border-b-2 border-l-2 border-[var(--color-primary)] opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-7 w-7 border-b-2 border-r-2 border-[var(--color-primary)] opacity-80" aria-hidden="true" />

      {/* ── Status header bar ──────────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-2 border-b border-[var(--color-border)] bg-[rgba(0,229,255,0.03)] px-4 py-2 backdrop-blur-sm">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary)]" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
          PROFILE &nbsp;·&nbsp; {currentIndex + 1}&nbsp;/&nbsp;{profileImages.length}
        </span>
      </div>

      {/*
       * ── Image container ─────────────────────────────────────
       * aspect-[4/5] gives a natural portrait frame without being
       * excessively tall. The source images are ~1:2 (very tall),
       * so object-cover crops them into this 4:5 window.
       * object-[center_20%] nudges the focal point upward so the
       * face (eyes, forehead, chin) stays in frame rather than
       * the mid-torso area that a pure object-center would show.
       * Padding of ~5% on each side (via inner wrapper) gives the
       * subject breathing room so the image doesn't feel edge-to-edge.
       */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={profileImages[currentIndex]}
          alt="John Mark Adora Profile Image"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 45vw"
          className={[
            "object-cover object-[center_20%]",
            "transition-opacity duration-700 ease-in-out",
            visible ? "opacity-100" : "opacity-0",
          ].join(" ")}
          priority={currentIndex === 0}
          draggable={false}
        />

        {/* Thin bottom fade — feathers the image edge into the indicator row */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[rgba(0,229,255,0.04)] to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ── Dot indicators ─────────────────────────────────────── */}
      <div
        className="relative z-10 flex items-center justify-center gap-2 bg-[rgba(0,229,255,0.03)] py-3 backdrop-blur-sm"
        role="tablist"
        aria-label="Image indicators"
      >
        {profileImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to image ${idx + 1}`}
            onClick={() => {
              if (idx === currentIndex) return;
              setVisible(false);
              setTimeout(() => {
                setCurrentIndex(idx);
                setVisible(true);
              }, 350);
            }}
            className={[
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1",
              idx === currentIndex
                ? "w-6 bg-[var(--color-primary)] shadow-[0_0_6px_rgba(0,229,255,0.7)]"
                : "w-1.5 bg-[var(--color-muted)] opacity-50 hover:opacity-80",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
