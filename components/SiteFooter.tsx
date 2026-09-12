import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { waLink } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const otherLocale = locale === "en" ? "id" : "en";

  return (
    <>
      <footer>
        <div className="container footer-grid">
          <div className="brand footer-brand">
            <Image src="/android-chrome-192x192.png" alt="" width={58} height={58} />
            <span>
              <b>{t.brand.short}</b>
              <small>{t.brand.legalName}</small>
            </span>
          </div>
          <p>{t.footer.blurb}</p>
          <div className="socials">
            <Link href={`/${otherLocale}`} hrefLang={otherLocale}>
              {otherLocale === "id" ? t.lang.id : t.lang.en}
            </Link>
            <a href="https://www.instagram.com/hanstransporttourisservicebatm" target="_blank" rel="noreferrer">
              {t.footer.instagram}
            </a>
            <a href="https://www.tiktok.com/@hanstransportouristbatam" target="_blank" rel="noreferrer">
              {t.footer.tiktok}
            </a>
          </div>
        </div>
        <div className="container legal-links">
          <Link href={`/${locale}/about`}>{t.footer.about}</Link>
          <Link href={`/${locale}/contact`}>{t.footer.contact}</Link>
          <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`}>{t.footer.terms}</Link>
          <Link href={`/${locale}#legalitas`}>{t.footer.legal}</Link>
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} {t.brand.legalName}. {t.footer.copyright}
        </div>
      </footer>
      <a
        className="wa-float"
        href={waLink(t.wa.float)}
        target="_blank"
        rel="noreferrer"
        aria-label={t.waFloat.label}
      >
        <span>WA</span>
        <b>{t.waFloat.ask}</b>
      </a>
    </>
  );
}
