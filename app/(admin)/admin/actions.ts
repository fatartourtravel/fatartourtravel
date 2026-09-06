"use server";

import { applyPriceDraft, PAX_OPTIONS, type PriceDraft } from "@/lib/catalog";
import { isCatalogStoreConfigured, loadAdminCatalog, refreshLandingPages, saveRemoteCatalog } from "@/lib/catalog-store";
import { adminPasswordConfigured, checkAdminPassword, clearAdminSession, createAdminSession, isAdmin } from "@/lib/admin-auth";
import { getAdminUrl } from "@/lib/admin-path";
import { assertLoginAllowed, clientIp, recordLoginFailure, recordLoginSuccess } from "@/lib/admin-rate-limit";
import { redirect } from "next/navigation";

export type AdminActionState = { ok?: string; error?: string } | null;

function adminRedirect(): never {
  redirect(getAdminUrl() ?? "/");
}

export async function login(_prev: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const ip = await clientIp();
  const allowed = await assertLoginAllowed(ip);
  if (!allowed.ok) return { error: allowed.error };

  if (!adminPasswordConfigured()) {
    return { error: "ADMIN_PASSWORD belum diisi. Tambahkan di environment hosting." };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkAdminPassword(password)) {
    return { error: await recordLoginFailure(ip) };
  }

  await recordLoginSuccess(ip);
  await createAdminSession();
  adminRedirect();
}

export async function logout() {
  await clearAdminSession();
  adminRedirect();
}

export async function savePrices(_prev: AdminActionState, draft: PriceDraft): Promise<AdminActionState> {
  if (!(await isAdmin())) {
    return { error: "Sesi admin sudah habis. Masuk lagi." };
  }

  if (!isCatalogStoreConfigured()) {
    return {
      error:
        "SUPABASE_SECRET_KEY belum diisi. Ambil secret key di Supabase → Project Settings → API Keys, lalu jalankan supabase/schema.sql.",
    };
  }

  const parsed = parseDraft(draft);
  if ("error" in parsed) return parsed;

  try {
    const current = await loadAdminCatalog();
    await saveRemoteCatalog(applyPriceDraft(current, parsed.draft));
    refreshLandingPages();
    return { ok: "Harga tersimpan. Landing page /en dan /id sudah di-refresh." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menyimpan harga." };
  }
}

function parseDraft(draft: PriceDraft): { draft: PriceDraft } | { error: string } {
  const currencyRates = {
    MYR: 1,
    IDR: readNumber(draft.currencyRates.IDR, "Kurs IDR"),
    SGD: readNumber(draft.currencyRates.SGD, "Kurs SGD"),
  };
  if (typeof currencyRates.IDR === "string") return { error: currencyRates.IDR };
  if (typeof currencyRates.SGD === "string") return { error: currencyRates.SGD };

  const packages = [];
  for (const item of draft.packages) {
    const standard: Record<string, number> = {};
    const full: Record<string, number> = {};
    for (const pax of PAX_OPTIONS) {
      const standardPrice = readNumber(item.prices.standard[pax], `${item.slug} standard ${pax} pax`);
      const fullPrice = readNumber(item.prices.full[pax], `${item.slug} full ${pax} pax`);
      if (typeof standardPrice === "string") return { error: standardPrice };
      if (typeof fullPrice === "string") return { error: fullPrice };
      standard[pax] = standardPrice;
      full[pax] = fullPrice;
    }
    packages.push({ slug: item.slug, prices: { standard, full } });
  }

  const carRentals = [];
  for (const car of draft.carRentals) {
    const IDR = readNumber(car.prices.IDR, `${car.name} IDR`);
    const MYR = readNumber(car.prices.MYR, `${car.name} MYR`);
    const SGD = readNumber(car.prices.SGD, `${car.name} SGD`);
    if (typeof IDR === "string") return { error: IDR };
    if (typeof MYR === "string") return { error: MYR };
    if (typeof SGD === "string") return { error: SGD };
    carRentals.push({ name: car.name, prices: { IDR, MYR, SGD } });
  }

  return {
    draft: {
      currencyRates: { MYR: 1, IDR: currencyRates.IDR, SGD: currencyRates.SGD },
      packages,
      carRentals,
    },
  };
}

function readNumber(value: unknown, label: string) {
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount) || amount < 0) return `${label} harus angka 0 atau lebih.`;
  return amount;
}
