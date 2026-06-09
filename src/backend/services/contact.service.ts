/**
 * Contact backend service.
 *
 * Owns the business logic for contact form submissions:
 *  1. Validates the incoming payload
 *  2. Delegates persistence to the repository
 *  3. Returns a typed ServiceResult (never throws to callers)
 *
 * This is intentionally separate from the existing frontend
 * src/features/portfolio/services/contact.service.ts, which handles
 * optimistic local-only validation. Once you wire the API route, the
 * frontend service can call POST /api/contact instead.
 */

import { contactRepository } from "@/backend/repositories/contact.repository";
import type { ContactSubmission } from "@/backend/types/contact.types";
import type { ServiceResult } from "@/backend/types/common.types";
import { validateContactInput } from "@/backend/validators/contact.validator";

export class BackendContactService {
  async submit(input: unknown): Promise<ServiceResult<ContactSubmission>> {
    // 1. Validate and sanitize
    const validation = validateContactInput(input);
    if (!validation.success) {
      return { ok: false, error: validation.error };
    }

    // 2. Persist
    try {
      const submission = await contactRepository.create(validation.data);
      return { ok: true, data: submission };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save submission";

      // Always log the real error server-side so it appears in server logs /
      // Vercel function logs regardless of environment.
      console.error("[BackendContactService] Database error:", message);

      // In development, surface the real error so misconfiguration is obvious.
      // In production, return a safe generic message.
      const clientError =
        process.env.NODE_ENV === "development"
          ? `Database error: ${message}`
          : "Unable to process your message. Please try again later.";

      return { ok: false, error: clientError };
    }
  }
}

export const backendContactService = new BackendContactService();
