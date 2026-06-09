/**
 * Centralized error handler for Route Handlers.
 *
 * Converts any thrown error into a consistent ApiError response.
 * Never leaks internal error details to the client in production.
 */

import { NextResponse } from "next/server";
import type { ApiError } from "@/backend/types/common.types";

const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Wraps a route handler function and catches any unhandled errors.
 *
 * Usage:
 *   export const POST = withErrorHandler(async (req) => { ... });
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
): (...args: T) => Promise<NextResponse> {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (err) {
      return handleError(err);
    }
  };
}

/**
 * Converts an unknown error into a 500 ApiError response.
 */
export function handleError(err: unknown): NextResponse<ApiError> {
  const message = err instanceof Error ? err.message : "An unexpected error occurred";

  console.error("[RouteHandler Error]", message);

  return NextResponse.json<ApiError>(
    {
      success: false,
      error: IS_DEV ? message : "An unexpected error occurred. Please try again later.",
    },
    { status: 500 },
  );
}

/**
 * Returns a 400 Bad Request response.
 */
export function badRequest(error: string): NextResponse<ApiError> {
  return NextResponse.json<ApiError>({ success: false, error }, { status: 400 });
}

/**
 * Returns a 404 Not Found response.
 */
export function notFound(error = "Resource not found"): NextResponse<ApiError> {
  return NextResponse.json<ApiError>({ success: false, error }, { status: 404 });
}

/**
 * Returns a 405 Method Not Allowed response.
 */
export function methodNotAllowed(): NextResponse<ApiError> {
  return NextResponse.json<ApiError>(
    { success: false, error: "Method not allowed" },
    { status: 405 },
  );
}
