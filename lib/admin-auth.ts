import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fatar_admin";

function sessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`fatar-admin:${password}`).digest("hex");
}

export async function isAdmin() {
  const expected = sessionToken();
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!expected || !value) return false;
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function createAdminSession() {
  const token = sessionToken();
  if (!token) {
    throw new Error("ADMIN_PASSWORD belum diisi di environment.");
  }

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export function adminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const left = Buffer.from(password);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
