import type { ContactFormData, ContactSubmissionResult } from "@/types";

export class ContactService {
  async submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
    const validationError = this.validate(data);

    if (validationError) {
      return {
        ok: false,
        message: validationError,
      };
    }

    return {
      ok: true,
      message: "Message prepared locally. Backend integration can be connected here later.",
    };
  }

  private validate(data: ContactFormData): string | null {
    if (!data.name.trim() || !data.email.trim() || !data.subject.trim() || !data.message.trim()) {
      return "Please complete all fields before submitting.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Please enter a valid email address.";
    }

    return null;
  }
}

export const contactService = new ContactService();
