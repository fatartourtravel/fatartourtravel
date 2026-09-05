import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, type Locale } from "./i18n";

export const pageSlugs = ["about", "contact", "privacy", "terms"] as const;
export type PageSlug = (typeof pageSlugs)[number];

export type PageFrontmatter = {
  title: string;
  description: string;
  updated?: string;
};

export function isPageSlug(value: string): value is PageSlug {
  return pageSlugs.includes(value as PageSlug);
}

export function getPage(locale: Locale, slug: PageSlug) {
  const file = path.join(process.cwd(), "content", locale, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as PageFrontmatter;
  const rawUpdated = parsed.data.updated;

  const updated =
    rawUpdated instanceof Date
      ? rawUpdated.toISOString().slice(0, 10)
      : typeof rawUpdated === "string"
        ? rawUpdated
        : undefined;

  return {
    slug,
    locale,
    title: data.title,
    description: data.description,
    updated,
    body: parsed.content.trim(),
  };
}

export function allPageParams() {
  return locales.flatMap((lang) => pageSlugs.map((slug) => ({ lang, slug })));
}
