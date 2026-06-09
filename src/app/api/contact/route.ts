/**
 * POST /api/contact
 *
 * Accepts a contact form submission, validates it, and persists it to Supabase.
 *
 * Rate limited: 5 requests per 15 minutes per IP.
 * All validation and business logic lives in the backend layer — this handler
 * is intentionally thin.
 */

import { NextRequest, NextResponse } from "next/server";
import { backendContactService } from "@/backend/services/contact.service";
import { contactLimiter, rateLimitResponse } from "@/backend/middleware/rate-limit";
import { withErrorHandler, badRequest } from "@/backend/middleware/error-handler";
import type { ApiResponse } from "@/backend/types/common.types";
import type { ContactSubmission } from "@/backend/types/contact.types";

export const POST = withErrorHandler(async (request: NextRequest) => {
  // 1. Rate limit check
  const limitResult = contactLimiter.check(request);
  if (!limitResult.allowed) {
    return rateLimitResponse(limitResult);
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON");
  }

  // 3. Validate, sanitize, and persist (all in service)
  const result = await backendContactService.submit(body);

  if (!result.ok) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: result.error },
      { status: 422 },
    );
  }

  return NextResponse.json<ApiResponse<ContactSubmission>>(
    { success: true, data: result.data },
    { status: 201 },
  );
});
