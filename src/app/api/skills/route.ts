/**
 * GET /api/skills
 *
 * Returns all skills from the database.
 * Supports optional ?grouped=true query parameter to return skills
 * grouped by category (matches the shape used by SkillsSection).
 *
 * Rate limited: 60 requests per minute per IP.
 */

import { NextRequest, NextResponse } from "next/server";
import { skillService } from "@/backend/services/skill.service";
import { readLimiter, rateLimitResponse } from "@/backend/middleware/rate-limit";
import { withErrorHandler } from "@/backend/middleware/error-handler";
import type { ApiResponse } from "@/backend/types/common.types";

export const GET = withErrorHandler(async (request: NextRequest) => {
  // 1. Rate limit
  const limitResult = readLimiter.check(request);
  if (!limitResult.allowed) {
    return rateLimitResponse(limitResult);
  }

  // 2. Check for ?grouped=true
  const { searchParams } = new URL(request.url);
  const grouped = searchParams.get("grouped") === "true";

  // 3. Fetch
  const result = grouped
    ? await skillService.getGrouped()
    : await skillService.getAll();

  if (!result.ok) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse<typeof result.data>>({
    success: true,
    data: result.data,
  });
});
