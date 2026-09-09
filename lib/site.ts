export const SITE_URL = "https://fatartourtravel.com";
export const WHATSAPP_NUMBER = "6285809104231";
export const WHATSAPP_DISPLAY = "+62 858-0910-4231";
export const GOOGLE_ADS_ID = "AW-18433739371";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}
