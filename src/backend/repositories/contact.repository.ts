/**
 * Contact repository.
 *
 * The repository is the only layer that knows about the database table schema.
 * It maps DB row shapes (snake_case) to domain model shapes (camelCase) and
 * isolates all Supabase-specific code from the service layer.
 */

import { getAdminClient } from "@/backend/database/supabase";
import type { ContactSubmissionRow } from "@/backend/database/types";
import type {
  ContactSubmission,
  CreateContactInput,
  IContactRepository,
} from "@/backend/types/contact.types";

function mapRow(row: ContactSubmissionRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
  };
}

export class ContactRepository implements IContactRepository {
  private get db() {
    return getAdminClient();
  }

  async create(input: CreateContactInput): Promise<ContactSubmission> {
    const { data, error } = await this.db
      .from("contact_submissions")
      .insert({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
      })
      .select()
      .single();

    if (error) {
      // Include the Postgres error code so it's diagnosable in logs.
      // e.g. "42501" = insufficient_privilege, "42P01" = undefined_table
      throw new Error(
        `ContactRepository.create failed [${error.code ?? "unknown"}]: ${error.message}`,
      );
    }

    return mapRow(data);
  }
}

export const contactRepository = new ContactRepository();
