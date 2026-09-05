"use client";

import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { waLink } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader({
  locale,
  t,
  path = "",
}: {
  locale: Locale;
  t: Dictionary;
  path?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const home = `/${locale}`;
  const section = (hash: string) => (path ? `${home}${hash}` : hash);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "nav-wrap is-scrolled" : "nav-wrap"}>
      <nav className="nav container" aria-label={t.nav.aria}>
        <Link className="brand" href={home} aria-label={t.brand.homeAria}>
          <Image src="/android-chrome-512x512.png" alt={t.brand.logoAlt} width={62} height={62} priority />
          <span>
            <b>{t.brand.short}</b>
            <small>{t.brand.name}</small>
          </span>
        </Link>
        <div className="nav-links">
          <Link href={section("#packages")}>{t.nav.packages}</Link>
          <Link href={section("#services")}>{t.nav.services}</Link>
          <Link href={section("#car-rental")}>{t.nav.cars}</Link>
          <Link href={section("#hotel")}>{t.nav.stays}</Link>
          <Link href={section("#faq")}>{t.nav.faq}</Link>
        </div>
        <div className="nav-tools">
          <div className="lang-switch" aria-label={t.lang.switcherAria}>
            <Link href={`/en${path}`} hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>
              {t.lang.en}
            </Link>
            <Link href={`/id${path}`} hrefLang="id" aria-current={locale === "id" ? "page" : undefined}>
              {t.lang.id}
            </Link>
          </div>
          <a className="btn btn-small" href={waLink(t.wa.nav)} target="_blank" rel="noreferrer">
            {t.nav.whatsapp}
          </a>
        </div>
      </nav>
    </header>
  );
}
