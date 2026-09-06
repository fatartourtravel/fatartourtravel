import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
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
