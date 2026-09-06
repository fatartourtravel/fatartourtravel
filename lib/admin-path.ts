const RESERVED = new Set([
  "admin",
  "api",
  "about",
  "contact",
  "en",
  "id",
  "privacy",
  "robots.txt",
  "sitemap.xml",
  "terms",
]);

export function getAdminPath() {
  const value = process.env.ADMIN_PATH?.trim().replace(/^\/+/, "") ?? "";
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{2,60}$/.test(value)) return null;
  if (RESERVED.has(value.toLowerCase())) return null;
  return value;
}

export function getAdminUrl() {
  const path = getAdminPath();
  if (path) return `/${path}`;
  return process.env.NODE_ENV === "production" ? null : "/admin";
}

export function isPublicAdminPath(pathname: string) {
  const path = getAdminPath();
  return Boolean(path && (pathname === `/${path}` || pathname.startsWith(`/${path}/`)));
}
