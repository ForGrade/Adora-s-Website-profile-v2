/**
 * Common Zod schemas and helper utilities shared across feature validators.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitive reusable schemas
// ---------------------------------------------------------------------------

export const nonEmptyString = z
  .string()
  .min(1, "This field is required")
  .transform((v) => v.trim());

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .transform((v) => v.trim().toLowerCase());

export const uuidSchema = z.string().uuid("Invalid ID format");

// ---------------------------------------------------------------------------
// Safe parse helper — returns a typed result object
// ---------------------------------------------------------------------------

export type ValidationSuccess<T> = { success: true; data: T };
export type ValidationFailure = { success: false; error: string };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  input: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(input);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.length > 0 ? String(firstIssue.path[0]) + ": " : ""}${firstIssue.message}`
      : "Validation failed";
    return { success: false, error: message };
  }

  return { success: true, data: result.data };
}

// ---------------------------------------------------------------------------
// Sanitization utilities
// ---------------------------------------------------------------------------

/**
 * Strips HTML tags from a string to prevent stored XSS.
 * Applied to all free-text fields before they are persisted.
 */
export function sanitizeText(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}
