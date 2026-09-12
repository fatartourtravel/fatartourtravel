import PackageDetail from "@/components/PackageDetail";
import { getPackageGroup, getPackageGroupSlugs } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { getDictionary } from "@/lib/copy";
import { isLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.flatMap((lang) => getPackageGroupSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const data = await getCatalog(lang);
  const group = getPackageGroup(data.packages, slug);
  if (!group) return {};
  const t = getDictionary(lang);
  const path = `/${lang}/packages/${slug}`;

  return {
    title: group.title,
    description: t.packages.detailLead,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/packages/${slug}`,
        id: `/id/packages/${slug}`,
        "x-default": `/en/packages/${slug}`,
      },
    },
    openGraph: {
      title: group.title,
      description: t.packages.detailLead,
      url: `${SITE_URL}${path}`,
      type: "article",
    },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const data = await getCatalog(lang);
  const group = getPackageGroup(data.packages, slug);
  if (!group) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: group.title,
    description: t.packages.detailLead,
    url: `${SITE_URL}/${lang}/packages/${slug}`,
    touristType: "Family",
    itinerary: group.destinations.map((name) => ({ "@type": "City", name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackageDetail locale={lang} t={t} group={group} rates={data.currencyRates} />
    </>
  );
}
