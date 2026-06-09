"use client";

import { useState } from "react";
import type { ContactFormData } from "@/types";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Manages contact form state and submission.
 *
 * Submissions are sent to POST /api/contact, which validates the payload
 * with Zod, sanitizes inputs, and persists to Supabase via the backend
 * service layer. No Supabase credentials or backend code are imported here.
 */
export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof ContactFormData, value: string): void {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function submit(): Promise<void> {
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json: unknown = await response.json();

      // The API always returns { success: boolean; data?: ...; error?: string }
      if (
        typeof json === "object" &&
        json !== null &&
        "success" in json
      ) {
        const envelope = json as { success: boolean; error?: string };

        if (envelope.success) {
          setStatusMessage("Your message has been sent. I'll get back to you soon.");
          setFormData(initialFormData);
        } else {
          setStatusMessage(envelope.error ?? "Something went wrong. Please try again.");
        }
      } else {
        setStatusMessage("Unexpected response from server. Please try again.");
      }
    } catch {
      setStatusMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    isSubmitting,
    statusMessage,
    updateField,
    submit,
  };
}
