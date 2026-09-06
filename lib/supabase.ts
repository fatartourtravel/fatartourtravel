import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RawCatalog } from "./catalog";

export const CATALOG_TAG = "catalog";
export const CATALOG_ROW_ID = "default";

export type SiteCatalogRow = {
  id: string;
  data: RawCatalog;
  updated_at: string;
};

function supabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
}

function publishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
}

function secretKey() {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function isCatalogReadConfigured() {
  return Boolean(supabaseUrl() && publishableKey());
}

export function isCatalogWriteConfigured() {
  return Boolean(supabaseUrl() && secretKey());
}

function taggedFetch(fresh: boolean): typeof fetch {
  return (input, init) =>
    fetch(input, {
      ...init,
      ...(fresh ? { cache: "no-store" as const } : { next: { tags: [CATALOG_TAG] } }),
    });
}

export function createPublicSupabase(fresh = false): SupabaseClient | null {
  const url = supabaseUrl();
  const key = publishableKey();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: taggedFetch(fresh) },
  });
}

export function createAdminSupabase(): SupabaseClient | null {
  const url = supabaseUrl();
  const key = secretKey();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
