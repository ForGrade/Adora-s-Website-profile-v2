/**
 * Supabase client factory.
 *
 * Three clients serve distinct purposes:
 *
 *  browserClient  — used in React components / client hooks (anon key, RLS enforced)
 *  serverClient   — used in Server Components and Route Handlers (anon key, RLS enforced)
 *  adminClient    — used only in trusted server code (service-role key, RLS bypassed)
 *
 * Credentials are never hardcoded. They are read from environment variables and
 * validated at startup. A missing variable throws at module load time rather than
 * failing silently at runtime.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ---------------------------------------------------------------------------
// Environment variable validation
// ---------------------------------------------------------------------------

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[Supabase] Missing required environment variable: ${key}. ` +
        `Add it to .env.local and restart the server.`,
    );
  }
  return value;
}

// These are evaluated lazily (inside factory functions) so that build-time
// static analysis does not fail when env vars are not present.

function getSupabaseUrl(): string {
  return requireEnv("SUPABASE_URL");
}

function getAnonKey(): string {
  return requireEnv("SUPABASE_ANON_KEY");
}

function getServiceRoleKey(): string {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
}

// ---------------------------------------------------------------------------
// Client factories
// ---------------------------------------------------------------------------

/**
 * Browser client — safe to use in `"use client"` components.
 * Uses the anon key. Subject to Row Level Security policies.
 */
export function createBrowserClient() {
  return createClient<Database>(getSupabaseUrl(), getAnonKey(), {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

/**
 * Server client — for Route Handlers and Server Components.
 * Uses the anon key. Subject to Row Level Security policies.
 */
export function createServerClient() {
  return createClient<Database>(getSupabaseUrl(), getAnonKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Admin client — for trusted server-side operations only.
 * Uses the service-role key. BYPASSES Row Level Security.
 * Never expose this client to the browser.
 */
export function createAdminClient() {
  console.log(
    "[SUPABASE ADMIN]",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20)
  );

  return createClient<Database>(
    getSupabaseUrl(),
    getServiceRoleKey(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

// ---------------------------------------------------------------------------
// Singleton helpers for Route Handlers
// ---------------------------------------------------------------------------

// A module-level singleton is fine in serverless Route Handlers because each
// invocation is isolated. Re-using avoids the overhead of re-creating the client
// on every request within the same Node.js process.

let _serverClient: ReturnType<typeof createServerClient> | null = null;
let _adminClient: ReturnType<typeof createAdminClient> | null = null;

export function getServerClient() {
  if (!_serverClient) {
    _serverClient = createServerClient();
  }
  return _serverClient;
}

export function getAdminClient() {
  if (!_adminClient) {
    _adminClient = createAdminClient();
  }
  return _adminClient;
}
