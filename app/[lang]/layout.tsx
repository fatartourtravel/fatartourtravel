import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/lib/copy";
import { isLocale, localeAlternateOpenGraph, localeHtmlLang, localeOpenGraph, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const t = getDictionary(lang);
  const path = `/${lang}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.title,
      template: `%s | FATAR Tour & Travel`,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      url: `${SITE_URL}${path}`,
      siteName: "FATAR Tour & Travel",
      locale: localeOpenGraph(lang),
      alternateLocale: localeAlternateOpenGraph(lang),
      type: "website",
      images: [{ url: "/fatar-logo.png", width: 1200, height: 1200, alt: t.brand.logoAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: ["/fatar-logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={localeHtmlLang(lang)}>
      <body>{children}</body>
    </html>
  );
}
