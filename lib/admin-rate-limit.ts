import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminSupabase } from "./supabase";

const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;
const FAIL_DELAY_MS = 400;

type Gate = {
  failures: number;
  lockedUntil: number;
};

const memory = new Map<string, Gate>();

function keyFor(ip: string) {
  return createHash("sha256").update(`admin-ip:${ip}`).digest("hex").slice(0, 40);
}

export async function clientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "local";
}

async function readGate(id: string): Promise<Gate> {
  const local = memory.get(id) ?? { failures: 0, lockedUntil: 0 };
  const supabase = createAdminSupabase();
  if (!supabase) return local;

  const { data } = await supabase
    .from("admin_login_guard")
    .select("failures, locked_until")
    .eq("id", id)
    .maybeSingle();

  if (!data) return local;
  return {
    failures: Number(data.failures) || 0,
    lockedUntil: data.locked_until ? new Date(data.locked_until).getTime() : 0,
  };
}

async function writeGate(id: string, gate: Gate) {
  memory.set(id, gate);
  const supabase = createAdminSupabase();
  if (!supabase) return;

  await supabase.from("admin_login_guard").upsert({
    id,
    failures: gate.failures,
    locked_until: gate.lockedUntil ? new Date(gate.lockedUntil).toISOString() : null,
    updated_at: new Date().toISOString(),
  });
}

function remainingMinutes(lockedUntil: number) {
  return Math.max(1, Math.ceil((lockedUntil - Date.now()) / 60000));
}

export async function assertLoginAllowed(ip: string) {
  const gate = await readGate(keyFor(ip));
  if (gate.lockedUntil > Date.now()) {
    return {
      ok: false as const,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${remainingMinutes(gate.lockedUntil)} menit.`,
    };
  }
  return { ok: true as const };
}

export async function recordLoginFailure(ip: string) {
  await new Promise((resolve) => setTimeout(resolve, FAIL_DELAY_MS));
  const id = keyFor(ip);
  const gate = await readGate(id);
  const failures = gate.failures + 1;
  const next: Gate = {
    failures,
    lockedUntil: failures >= MAX_FAILURES ? Date.now() + LOCK_MS : 0,
  };
  await writeGate(id, next);
  if (next.lockedUntil) {
    return `Terlalu banyak percobaan. Coba lagi dalam ${remainingMinutes(next.lockedUntil)} menit.`;
  }
  return "Password salah.";
}

export async function recordLoginSuccess(ip: string) {
  const id = keyFor(ip);
  memory.delete(id);
  const supabase = createAdminSupabase();
  if (!supabase) return;
  await supabase.from("admin_login_guard").delete().eq("id", id);
}
