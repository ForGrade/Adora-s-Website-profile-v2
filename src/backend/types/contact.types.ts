/**
 * Contact feature — backend domain types.
 *
 * These are the application-level shapes used by the service and repository
 * layers. They are deliberately separate from the raw DB row types in
 * src/backend/database/types.ts and the UI-facing types in src/types/index.ts.
 */

// ---------------------------------------------------------------------------
// Domain model
// ---------------------------------------------------------------------------

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Input (what the API route receives after Zod validation)
// ---------------------------------------------------------------------------

export interface CreateContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Repository contract
// ---------------------------------------------------------------------------

export interface IContactRepository {
  create(input: CreateContactInput): Promise<ContactSubmission>;
}
