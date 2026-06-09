/**
 * GET /api/projects
 *
 * Returns all projects from the database.
 * Supports optional ?featured=true query parameter to return only featured projects.
 *
 * Rate limited: 60 requests per minute per IP.
 */

import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/backend/services/project.service";
import { readLimiter, rateLimitResponse } from "@/backend/middleware/rate-limit";
import { withErrorHandler } from "@/backend/middleware/error-handler";
import type { ApiResponse } from "@/backend/types/common.types";
import type { ProjectRecord } from "@/backend/types/project.types";

export const GET = withErrorHandler(async (request: NextRequest) => {
  // 1. Rate limit
  const limitResult = readLimiter.check(request);
  if (!limitResult.allowed) {
    return rateLimitResponse(limitResult);
  }

  // 2. Check for ?featured=true
  const { searchParams } = new URL(request.url);
  const featuredOnly = searchParams.get("featured") === "true";

  // 3. Fetch
  const result = featuredOnly
    ? await projectService.getFeatured()
    : await projectService.getAll();

  if (!result.ok) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse<ProjectRecord[]>>({
    success: true,
    data: result.data,
  });
});
