"use client";

import { useState } from "react";
import { contactService } from "@/features/portfolio/services/contact.service";
import type { ContactFormData } from "@/types";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Manages contact form state and client-side submission.
 *
 * Validates input locally and opens the visitor's email client via mailto
 * so messages can be sent without a backend or database.
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
      const result = await contactService.submitContactForm(formData);

      setStatusMessage(result.message);

      if (result.ok) {
        setFormData(initialFormData);
      }
    } catch {
      setStatusMessage("Something went wrong. Please try again or email directly.");
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
