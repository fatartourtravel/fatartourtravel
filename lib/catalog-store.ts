import packageData from "@/data/travel-packages.json";
import { revalidatePath, updateTag } from "next/cache";
import { localizeCatalog, type LocalizedCatalog, type RawCatalog } from "./catalog";
import type { Locale } from "./i18n";
import {
  CATALOG_ROW_ID,
  CATALOG_TAG,
  createAdminSupabase,
  createPublicSupabase,
  isCatalogReadConfigured,
  isCatalogWriteConfigured,
  type SiteCatalogRow,
} from "./supabase";

export { CATALOG_TAG, isCatalogReadConfigured, isCatalogWriteConfigured };

export function isCatalogStoreConfigured() {
  return isCatalogWriteConfigured();
}

export async function fetchRemoteCatalog(options?: { fresh?: boolean }): Promise<RawCatalog | null> {
  const supabase = createPublicSupabase(options?.fresh);
  if (!supabase) return null;

  const { data, error } = await supabase.from("site_catalog").select("data").eq("id", CATALOG_ROW_ID).maybeSingle();

  if (error || !data) return null;
  return (data as SiteCatalogRow).data ?? null;
}

export async function saveRemoteCatalog(data: RawCatalog) {
  const supabase = createAdminSupabase();
  if (!supabase) {
    throw new Error(
      "SUPABASE_SECRET_KEY belum diisi. Ambil secret key di Supabase → Project Settings → API Keys."
    );
  }

  const { error } = await supabase.from("site_catalog").upsert({
    id: CATALOG_ROW_ID,
    data,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCatalog(locale: Locale): Promise<LocalizedCatalog> {
  const raw = (await fetchRemoteCatalog()) ?? (packageData as RawCatalog);
  return localizeCatalog(raw, locale);
}

export async function loadAdminCatalog(): Promise<RawCatalog> {
  return (await fetchRemoteCatalog({ fresh: true })) ?? (packageData as RawCatalog);
}

export function refreshLandingPages() {
  updateTag(CATALOG_TAG);
  revalidatePath("/[lang]", "page");
  revalidatePath("/[lang]/packages/[slug]", "page");
  revalidatePath("/en");
  revalidatePath("/id");
}
