"use client";

import type { Currency, PackageGroup, PackageType } from "@/lib/catalog";
import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { formatMoney } from "@/lib/money";
import { fill, waLink } from "@/lib/site";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function PackageDetail({
  locale,
  t,
  group,
  rates,
}: {
  locale: Locale;
  t: Dictionary;
  group: PackageGroup;
  rates: Record<Currency, number>;
}) {
  const [currency, setCurrency] = useState<Currency>(locale === "id" ? "IDR" : "MYR");
  const [duration, setDuration] = useState(group.durations[0]);
  const [packageType, setPackageType] = useState<PackageType>("standard");
  const [pax, setPax] = useState("4");

  const variant = useMemo(
    () => group.variants.find((item) => item.duration === duration) ?? group.variants[0],
    [duration, group.variants]
  );
  const sourcePrice = variant.prices[packageType][pax];
  const displayPrice = (sourcePrice ?? Math.min(...Object.values(variant.prices[packageType]))) * rates[currency];
  const typeLabel = packageType === "full" ? t.packages.full : t.packages.standard;

  return (
    <main>
      <SiteHeader locale={locale} t={t} path={`/packages/${group.slug}`} />
      <article className="container package-detail">
        <Link className="text-link" href={`/${locale}#packages`}>
          ← {t.packages.backToPackages}
        </Link>
        <div className="package-detail-grid">
          <div className="package-detail-media">
            <Image
              src={group.image}
              alt={fill(t.packages.imageAlt, { title: group.title, duration })}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <span className="eyebrow dark">{t.packages.detailEyebrow}</span>
            <h1>{group.title}</h1>
            <p className="md-lead">{t.packages.detailLead}</p>
            <p className="package-meta">{group.destinations.join(" • ")}</p>
            <p className="price">
              <span>{t.packages.tourFrom}</span>
              {formatMoney(group.fromPrice * rates[currency], currency)}
              <small>{t.packages.perPerson}</small>
            </p>

            <div className="price-controls detail-controls">
              <label>
                {t.packages.chooseDuration}
                <select value={duration} onChange={(event) => setDuration(event.target.value)}>
                  {group.durations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t.packages.packageType}
                <select value={packageType} onChange={(event) => setPackageType(event.target.value as PackageType)}>
                  <option value="standard">{t.packages.standard}</option>
                  <option value="full">{t.packages.full}</option>
                </select>
              </label>
              <label>
                {t.packages.groupSize}
                <select value={pax} onChange={(event) => setPax(event.target.value)}>
                  {["4", "6", "8", "10", "12"].map((n) => (
                    <option key={n} value={n}>
                      {fill(t.packages.paxOption, { n })}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t.packages.currency}
                <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>
                  <option value="MYR">MYR</option>
                  <option value="SGD">SGD</option>
                  <option value="IDR">IDR</option>
                </select>
              </label>
            </div>

            <p className="price detail-price">
              <span>{sourcePrice ? t.packages.from : t.packages.closestFrom}</span>
              {formatMoney(displayPrice, currency)}
              <small>{t.packages.perPerson}</small>
            </p>
            {!sourcePrice && <p className="availability-note">{fill(t.packages.missingPrice, { n: pax })}</p>}

            <a
              className="btn btn-dark"
              href={waLink(
                fill(t.wa.package, {
                  title: group.title,
                  duration,
                  type: typeLabel,
                  pax,
                })
              )}
              target="_blank"
              rel="noreferrer"
            >
              {t.packages.askPackage}
            </a>
            <p className="rate-note">{t.packages.rateNote}</p>
          </div>
        </div>
      </article>
      <SiteFooter locale={locale} t={t} />
    </main>
  );
}
