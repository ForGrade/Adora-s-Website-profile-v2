import Image from "next/image";
import { Button } from "@/components/common/Button";
import { SITE_METADATA } from "@/constants";

export function HeroSection() {
  return (
    <section id="home" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-slide-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {SITE_METADATA.tagline}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {SITE_METADATA.ownerName}
          </h1>
          <p className="mt-4 text-xl font-semibold text-muted">{SITE_METADATA.role}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I build modern web experiences while growing strong foundations in software
            engineering, databases, problem solving, and clean application architecture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projects">View Portfolio</Button>
            <Button href="/contact" variant="secondary">
              Contact Me
            </Button>
          </div>
        </div>
        <div className="animate-fade-in rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface-soft">
            <Image
              src="/profile-pic.jpg"
              alt="John Mark R. Adora profile photo"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
