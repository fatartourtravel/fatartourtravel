import type { MetadataRoute } from "next";
import { pageSlugs } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...pageSlugs.map((slug) => `/${slug}`)];

  return paths.flatMap((path) => {
    const languages = Object.fromEntries([
      ...locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
      ["x-default", `${SITE_URL}/en${path}`],
    ]);

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.6,
      alternates: { languages },
    }));
  });
}
