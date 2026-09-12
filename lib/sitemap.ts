import { getPackageGroupSlugs } from "@/lib/catalog";
import { getPage, pageSlugs } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: string;
  languages: Record<string, string>;
};

export function getSitemapEntries(): SitemapEntry[] {
  const paths = [
    "",
    ...pageSlugs.map((slug) => `/${slug}`),
    ...getPackageGroupSlugs().map((slug) => `/packages/${slug}`),
  ];

  return paths.flatMap((path) => {
    const languages = Object.fromEntries([
      ...locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
      ["x-default", `${SITE_URL}/en${path}`],
    ]);

    return locales.map((locale) => {
      const lastmod =
        path === ""
          ? "2026-09-06"
          : path.startsWith("/packages/")
            ? "2026-09-12"
            : getPage(locale, path.slice(1) as (typeof pageSlugs)[number]).updated ?? "2026-09-05";

      return {
        loc: `${SITE_URL}/${locale}${path}`,
        lastmod,
        changefreq: path === "" ? "weekly" : "monthly",
        priority: path === "" ? "1.0" : "0.6",
        languages,
      };
    });
  });
}
