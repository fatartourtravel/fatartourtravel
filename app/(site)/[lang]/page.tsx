import HomePage from "@/components/HomePage";
import { getCatalog } from "@/lib/catalog-store";
import { getDictionary } from "@/lib/copy";
import { isLocale } from "@/lib/i18n";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const data = await getCatalog(lang);
  const inLanguage = lang === "id" ? "id-ID" : "en";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "PT. Fatar Mitra Sarana",
      alternateName: "FATAR Tour & Travel",
      url: `${SITE_URL}/${lang}`,
      logo: `${SITE_URL}/fatar-logo.png`,
      telephone: WHATSAPP_DISPLAY,
      inLanguage,
      areaServed: ["Batam", "Bintan", "Singapore", "Malaysia", "Indonesia"],
      slogan: "Perjalanan Lebih Bermakna",
      sameAs: [
        "https://www.instagram.com/hanstransporttourisservicebatm",
        "https://www.tiktok.com/@hanstransportouristbatam",
      ],
      knowsAbout: t.meta.keywords,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage,
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      inLanguage,
      name: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${lang}`,
      isPartOf: { "@type": "WebSite", name: "FATAR Tour & Travel", url: SITE_URL },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage locale={lang} t={t} data={data} />
    </>
  );
}
