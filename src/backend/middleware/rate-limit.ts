/**
 * In-process rate limiter for Next.js Route Handlers.
 *
 * Uses a module-level Map as an in-memory store. This is intentionally simple
 * and suitable for a single-server deployment or a low-traffic portfolio site.
 *
 * For multi-instance deployments, replace the Map with a Redis/Upstash store
 * using the same RateLimiter interface.
 *
 * Usage:
 *   const result = contactLimiter.check(request);
 *   if (!result.allowed) return rateLimitResponse(result);
 */

import { NextRequest, NextResponse } from "next/server";
import type { RateLimitEntry } from "@/backend/types/common.types";

interface RateLimitConfig {
  /** Maximum requests allowed within the window. */
  limit: number;
  /** Window duration in milliseconds. */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export class RateLimiter {
  private readonly store = new Map<string, RateLimitEntry>();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(config: RateLimitConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
  }

  check(request: NextRequest): RateLimitResult {
    const ip = this.getIp(request);
    const now = Date.now();

    const entry = this.store.get(ip);

    if (!entry || now > entry.resetAt) {
      // First request or window expired — start fresh
      this.store.set(ip, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.limit - 1, resetAt: now + this.windowMs };
    }

    if (entry.count >= this.limit) {
      return { allowed: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count += 1;
    return {
      allowed: true,
      remaining: this.limit - entry.count,
      resetAt: entry.resetAt,
    };
  }

  private getIp(request: NextRequest): string {
    return (
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown"
    );
  }
}

/**
 * Returns a 429 JSON response with Retry-After header.
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  const retryAfterSeconds = Math.ceil((result.resetAt - Date.now()) / 1000);
  return NextResponse.json(
    { success: false, error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": "rate limited",
        "X-RateLimit-Remaining": "0",
      },
    },
  );
}

// ---------------------------------------------------------------------------
// Pre-configured limiter instances
// ---------------------------------------------------------------------------

/** Contact form: 5 submissions per 15 minutes per IP. */
export const contactLimiter = new RateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

/** General GET endpoints: 60 requests per minute per IP. */
export const readLimiter = new RateLimiter({ limit: 60, windowMs: 60 * 1000 });
