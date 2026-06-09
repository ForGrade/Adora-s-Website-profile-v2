import { CONTACT_INFO } from "@/constants";
import type { ContactFormData, ContactSubmissionResult } from "@/types";

const RECIPIENT_EMAIL =
  CONTACT_INFO.find((item) => item.label === "Email")?.href?.replace(/^mailto:/i, "") ?? "";

export class ContactService {
  async submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
    const validationError = this.validate(data);

    if (validationError) {
      return {
        ok: false,
        message: validationError,
      };
    }

    if (!RECIPIENT_EMAIL) {
      return {
        ok: false,
        message: "Contact email is not configured. Please use the email link above instead.",
      };
    }

    const body = [`Name: ${data.name.trim()}`, `Reply-To: ${data.email.trim()}`, "", data.message.trim()].join(
      "\n",
    );

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(data.subject.trim())}&body=${encodeURIComponent(body)}`;

    window.location.assign(mailtoUrl);

    return {
      ok: true,
      message: "Your email app is opening with your message ready to send.",
    };
  }

  private validate(data: ContactFormData): string | null {
    if (!data.name.trim() || !data.email.trim() || !data.subject.trim() || !data.message.trim()) {
      return "Please complete all fields before submitting.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      return "Please enter a valid email address.";
    }

    return null;
  }
}

export const contactService = new ContactService();
