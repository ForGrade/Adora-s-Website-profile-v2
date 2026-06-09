"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CONTACT_INFO } from "@/constants";
import { useContactForm } from "@/features/portfolio/hooks/useContactForm";

export function ContactSection() {
  const { formData, isSubmitting, statusMessage, updateField, submit } = useContactForm();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await submit();
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Let's Connect" />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {CONTACT_INFO.map((item) => (
              <Card key={item.label}>
                <p className="text-sm font-semibold text-accent">{item.label}</p>
                {item.href ? (
                  <a className="mt-2 block font-bold text-foreground" href={item.href}>
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 font-bold text-foreground">{item.value}</p>
                )}
              </Card>
            ))}
          </div>
          <Card>
            <form className="grid gap-4" onSubmit={handleSubmit}>
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
              <label className="grid gap-2 text-sm font-semibold text-foreground" htmlFor="message">
                Message
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  rows={5}
                  className="min-h-36 rounded-md border border-border bg-background px-3 py-2 text-base font-normal text-foreground transition focus:border-accent focus:outline-2"
                />
              </label>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Preparing..." : "Send Message"}
              </Button>
              {statusMessage ? (
                <p className="text-sm font-medium text-muted" role="status">
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </Card>
        </div>
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
    <label className="grid gap-2 text-sm font-semibold text-foreground" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-border bg-background px-3 text-base font-normal text-foreground transition focus:border-accent focus:outline-2"
      />
    </label>
  );
}
