/**
 * GET /api/career-insights
 *
 * Returns published career insights only.
 * Supports optional ?category=<value> query parameter for filtering.
 *
 * Rate limited: 60 requests per minute per IP.
 */

import { NextRequest, NextResponse } from "next/server";
import { careerInsightsService } from "@/backend/services/career-insights.service";
import { readLimiter, rateLimitResponse } from "@/backend/middleware/rate-limit";
import { withErrorHandler, badRequest } from "@/backend/middleware/error-handler";
import type { ApiResponse } from "@/backend/types/common.types";
import type {
  CareerInsightRecord,
  InsightCategory,
} from "@/backend/repositories/career-insights.repository";

const VALID_CATEGORIES: InsightCategory[] = ["career", "technology", "learning", "industry"];

export const GET = withErrorHandler(async (request: NextRequest) => {
  // 1. Rate limit
  const limitResult = readLimiter.check(request);
  if (!limitResult.allowed) {
    return rateLimitResponse(limitResult);
  }

  // 2. Optional category filter
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");

  if (categoryParam !== null) {
    if (!VALID_CATEGORIES.includes(categoryParam as InsightCategory)) {
      return badRequest(
        `Invalid category. Valid values: ${VALID_CATEGORIES.join(", ")}`,
      );
    }

    const result = await careerInsightsService.getByCategory(
      categoryParam as InsightCategory,
    );

    if (!result.ok) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json<ApiResponse<CareerInsightRecord[]>>({
      success: true,
      data: result.data,
    });
  }

  // 3. No filter — return all published
  const result = await careerInsightsService.getPublished();

  if (!result.ok) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse<CareerInsightRecord[]>>({
    success: true,
    data: result.data,
  });
});
