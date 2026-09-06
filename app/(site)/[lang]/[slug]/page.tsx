import MarkdownPage from "@/components/MarkdownPage";
import { allPageParams, getPage, isPageSlug } from "@/lib/content";
import { getDictionary } from "@/lib/copy";
import { isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allPageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isPageSlug(slug)) return {};

  const page = getPage(lang, slug);
  const path = `/${lang}/${slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/${slug}`,
        id: `/id/${slug}`,
        "x-default": `/en/${slug}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${path}`,
      type: "article",
    },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isPageSlug(slug)) notFound();

  const t = getDictionary(lang);
  const page = getPage(lang, slug);
  const path = `${SITE_URL}/${lang}/${slug}`;
  const schemaType =
    slug === "about" ? "AboutPage" : slug === "contact" ? "ContactPage" : "WebPage";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: page.title,
    description: page.description,
    url: path,
    inLanguage: lang === "id" ? "id-ID" : "en",
    isPartOf: { "@type": "WebSite", name: "FATAR Tour & Travel", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarkdownPage
        locale={lang}
        t={t}
        slug={slug}
        title={page.title}
        description={page.description}
        updated={page.updated}
        body={page.body}
      />
    </>
  );
}
