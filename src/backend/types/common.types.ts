/**
 * Shared backend types used across repositories, services, and API routes.
 */

// ---------------------------------------------------------------------------
// Unified API response envelope
// ---------------------------------------------------------------------------

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ---------------------------------------------------------------------------
// Service-layer result (internal — not sent to client directly)
// ---------------------------------------------------------------------------

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

export interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix ms timestamp
}
