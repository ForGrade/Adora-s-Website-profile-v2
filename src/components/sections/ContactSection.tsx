"use client";

import type { FormEvent } from "react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { IntelPanel } from "@/components/ui/elite/IntelPanel";
import { SectionLabel } from "@/components/ui/elite/SectionLabel";
import { TerminalBlock } from "@/components/ui/elite/TerminalBlock";
import { fadeUp } from "@/components/ui/elite/utils/animationPresets";
import { CONTACT_INFO } from "@/constants";
import { useContactForm } from "@/features/portfolio/hooks/useContactForm";

const inputClasses =
  "min-h-[44px] w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-dark-surface)] px-3 font-mono text-sm text-[var(--color-text)] transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:shadow-[0_0_12px_rgba(0,229,255,0.25)]";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const { formData, isSubmitting, statusMessage, updateField, submit } = useContactForm();

  const animationState = shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden";

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await submit();
  }

  return (
    <section id="contact" ref={ref} className="px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={animationState}
          className="grid gap-10 lg:grid-cols-2"
        >
          <div>
            <SectionLabel>OPEN CHANNEL</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Command Centre
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              Open to opportunities, collaborations, and conversations. Reach out through any channel
              below or transmit a message directly.
            </p>
            <div className="mt-8 grid gap-4">
              {CONTACT_INFO.map((item) => (
                <IntelPanel key={item.label} title={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-mono text-sm font-semibold text-[var(--color-text)] transition hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm font-semibold text-[var(--color-text)]">
                      {item.value}
                    </p>
                  )}
                </IntelPanel>
              ))}
            </div>
          </div>

          <TerminalBlock prompt="contact@adora.systems ~">
            <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
              <FormField
                id="name"
                label="Name"
                value={formData.name}
                onChange={(value) => updateField("name", value)}
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => updateField("email", value)}
              />
              <FormField
                id="subject"
                label="Subject"
                value={formData.subject}
                onChange={(value) => updateField("subject", value)}
              />
              <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]" htmlFor="message">
                Message
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  rows={5}
                  className={`${inputClasses} min-h-36 resize-y py-2`}
                />
              </label>
              <Button type="submit" disabled={isSubmitting} className="min-h-[44px]">
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Transmitting...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
              {statusMessage ? (
                <p className="font-mono text-sm text-[var(--color-muted)]" role="status">
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </TerminalBlock>
        </motion.div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly type?: string;
  readonly onChange: (value: string) => void;
}

function FormField({ id, label, value, type = "text", onChange }: FormFieldProps) {
  return (
    <label className="grid gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
      />
    </label>
  );
}
