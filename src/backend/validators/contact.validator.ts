/**
 * Contact form validation schema.
 *
 * Rules (matching requirements spec):
 *  - name:     required
 *  - email:    valid email address
 *  - subject:  required
 *  - message:  required, minimum 20 characters
 *
 * The schema also sanitizes inputs (strips HTML tags) before the data
 * reaches the repository.
 */

import { z } from "zod";
import { emailSchema, nonEmptyString, safeValidate, sanitizeText } from "./common.validator";
import type { CreateContactInput } from "@/backend/types/contact.types";

export const contactSchema = z.object({
  name: nonEmptyString.transform(sanitizeText).pipe(
    z.string().max(100, "Name must be 100 characters or fewer"),
  ),
  email: emailSchema,
  subject: nonEmptyString.transform(sanitizeText).pipe(
    z.string().max(200, "Subject must be 200 characters or fewer"),
  ),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be 5000 characters or fewer")
    .transform(sanitizeText),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function validateContactInput(
  input: unknown,
): ReturnType<typeof safeValidate<CreateContactInput>> {
  return safeValidate(contactSchema, input);
}
