"use client";

import type { Currency, LocalizedCatalog, PackageType } from "@/lib/catalog";
import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { fill, waLink } from "@/lib/site";
import AutoSlider from "@/components/AutoSlider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

function money(value: number, currency: Currency) {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat(currency === "MYR" ? "ms-MY" : "en-SG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage({
  locale,
  t,
  data,
}: {
  locale: Locale;
  t: Dictionary;
  data: LocalizedCatalog;
}) {
  const [currency, setCurrency] = useState<Currency>(locale === "id" ? "IDR" : "MYR");
  const [pax, setPax] = useState("4");
  const [packageType, setPackageType] = useState<PackageType>("standard");
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === "en" ? "id" : "en";

  const moveHero = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    event.currentTarget.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  const minPrices = useMemo(
    () =>
      data.packages.map((item) => {
        const values = Object.values(item.prices[packageType]);
        return Math.min(...values);
      }),
    [data.packages, packageType]
  );

  const convert = (myr: number) => myr * data.currencyRates[currency];
  const typeLabel = packageType === "full" ? t.packages.full : t.packages.standard;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("aos-on");
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("aos-on");
    };
  }, []);

  return (
    <main>
      <header className={scrolled ? "nav-wrap is-scrolled" : "nav-wrap"}>
        <nav className="nav container" aria-label={t.nav.aria}>
          <Link className="brand" href={`/${locale}`} aria-label={t.brand.homeAria}>
            <Image src="/android-chrome-512x512.png" alt={t.brand.logoAlt} width={62} height={62} priority />
            <span>
              <b>{t.brand.short}</b>
              <small>{t.brand.name}</small>
            </span>
          </Link>
          <div className="nav-links">
            <a href="#packages">{t.nav.packages}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#car-rental">{t.nav.cars}</a>
            <a href="#hotel">{t.nav.stays}</a>
            <a href="#faq">{t.nav.faq}</a>
          </div>
          <div className="nav-tools">
            <div className="lang-switch" aria-label={t.lang.switcherAria}>
              <Link href="/en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>
                {t.lang.en}
              </Link>
              <Link href="/id" hrefLang="id" aria-current={locale === "id" ? "page" : undefined}>
                {t.lang.id}
              </Link>
            </div>
            <a className="btn btn-small" href={waLink(t.wa.nav)} target="_blank" rel="noreferrer">
              {t.nav.whatsapp}
            </a>
          </div>
        </nav>
      </header>

      <section className="hero" id="top" onMouseMove={moveHero}>
        <div className="hero-bg-wrap" aria-hidden="true">
          <div className="hero-bg" />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-in" style={{ animationDelay: "80ms" }}>
              {t.hero.eyebrow}
            </span>
            <h1>
              {t.hero.h1.split(/(\s+)/).map((part, index) =>
                /^\s+$/.test(part) ? (
                  part
                ) : (
                  <span key={`${part}-${index}`} className="hero-word" style={{ animationDelay: `${180 + index * 36}ms` }}>
                    {part}
                  </span>
                )
              )}
            </h1>
            <p className="hero-in" style={{ animationDelay: "720ms" }}>
              {t.hero.lead}
            </p>
            <div className="hero-actions hero-in" style={{ animationDelay: "880ms" }}>
              <a className="btn" href="#packages">
                {t.hero.ctaPackages}
              </a>
              <a className="btn btn-ghost" href={waLink(t.wa.custom)} target="_blank" rel="noreferrer">
                {t.hero.ctaWhatsapp}
              </a>
            </div>
            <div className="trust-row" aria-label={t.hero.trustAria}>
              {t.hero.trust.map((item, index) => (
                <span key={item} className="hero-in" style={{ animationDelay: `${1040 + index * 90}ms` }}>
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-card-wrap">
            <aside className="hero-card">
              <span className="mini">{t.hero.cardEyebrow}</span>
              <h2>{t.hero.cardTitle}</h2>
              <p>{t.hero.cardText}</p>
              <a href={waLink(t.wa.quote)} target="_blank" rel="noreferrer">
                {t.hero.cardCta}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="quick-services" id="services" data-reveal>
        <div className="container service-grid">
          {t.services.map((item) => (
            <article className="service-card" key={item.title}>
              <div className="service-dot" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="packages" data-reveal>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">{t.packages.eyebrow}</span>
              <h2>{t.packages.h2}</h2>
              <p>{t.packages.lead}</p>
            </div>
            <div className="price-controls">
              <label>
                {t.packages.currency}
                <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                  <option value="MYR">MYR</option>
                  <option value="SGD">SGD</option>
                  <option value="IDR">IDR</option>
                </select>
              </label>
              <label>
                {t.packages.packageType}
                <select value={packageType} onChange={(e) => setPackageType(e.target.value as PackageType)}>
                  <option value="standard">{t.packages.standard}</option>
                  <option value="full">{t.packages.full}</option>
                </select>
              </label>
              <label>
                {t.packages.groupSize}
                <select value={pax} onChange={(e) => setPax(e.target.value)}>
                  {["4", "6", "8", "10", "12"].map((n) => (
                    <option key={n} value={n}>
                      {fill(t.packages.paxOption, { n })}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="package-grid">
            {data.packages.map((item, index) => {
              const sourcePrice = item.prices[packageType][pax];
              const fallback = minPrices[index];
              const displayPrice = convert(sourcePrice ?? fallback);
              return (
                <article className="package-card" key={item.slug}>
                  <div className="package-image">
                    <Image
                      src={item.image}
                      alt={fill(t.packages.imageAlt, { title: item.title, duration: item.duration })}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                    <div className="image-badge">{item.duration}</div>
                  </div>
                  <div className="package-body">
                    <div className="package-meta">{item.destinations.join(" • ")}</div>
                    <h3>{item.title}</h3>
                    <p className="price">
                      <span>{sourcePrice ? t.packages.from : t.packages.closestFrom}</span>
                      {money(displayPrice, currency)}
                      <small>{t.packages.perPerson}</small>
                    </p>
                    {!sourcePrice && (
                      <p className="availability-note">{fill(t.packages.missingPrice, { n: pax })}</p>
                    )}
                    <div className="package-actions">
                      <a
                        className="btn btn-dark"
                        href={waLink(
                          fill(t.wa.package, {
                            title: item.title,
                            duration: item.duration,
                            type: typeLabel,
                            pax,
                          })
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.packages.askWa}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="rate-note">{t.packages.rateNote}</p>
        </div>
      </section>

      <section className="section split-section" id="why-fatar" data-reveal>
        <div className="container split">
          <div>
            <span className="eyebrow dark">{t.why.eyebrow}</span>
            <h2>{t.why.h2}</h2>
            <p>{t.why.lead}</p>
            <div className="check-grid">
              {t.why.points.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </div>
          <div className="brand-story">
            <Image src="/fatar-logo.png" alt={t.brand.legalName} width={240} height={240} />
            <blockquote>{t.why.quote}</blockquote>
            <p>{t.why.quoteLead}</p>
          </div>
        </div>
      </section>

      <section className="section destination-section" data-reveal>
        <div className="container">
          <div className="section-head compact">
            <div>
              <span className="eyebrow">{t.destinations.eyebrow}</span>
              <h2>{t.destinations.h2}</h2>
            </div>
          </div>
          <AutoSlider className="destination-grid">
            <article className="destination batam">
              <div>
                <span>01</span>
                <h3>{t.destinations.batamTitle}</h3>
                <p>{t.destinations.batamText}</p>
              </div>
            </article>
            <article className="destination bintan">
              <div>
                <span>02</span>
                <h3>{t.destinations.bintanTitle}</h3>
                <p>{t.destinations.bintanText}</p>
              </div>
            </article>
          </AutoSlider>
        </div>
      </section>

      <section className="section fleet-section" id="car-rental" data-reveal>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">{t.cars.eyebrow}</span>
              <h2>{t.cars.h2}</h2>
              <p>{t.cars.lead}</p>
            </div>
          </div>
          <AutoSlider className="fleet-grid">
            {data.carRentals.map((car) => (
              <article className="fleet-card" key={car.name}>
                <div className="fleet-image">
                  <Image
                    src={car.image}
                    alt={fill(t.cars.imageAlt, { name: car.name })}
                    fill
                    sizes="(max-width: 700px) 100vw, 25vw"
                  />
                </div>
                <div className="fleet-body">
                  <h3>{car.name}</h3>
                  <span className="capacity">{car.capacity}</span>
                  <p className="triple-price">
                    {money(car.prices.IDR, "IDR")} <b>•</b> {money(car.prices.MYR, "MYR")} <b>•</b>{" "}
                    {money(car.prices.SGD, "SGD")}
                  </p>
                  <a
                    className="text-link"
                    href={waLink(fill(t.wa.car, { name: car.name, capacity: car.capacity }))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.cars.bookWa}
                  </a>
                </div>
              </article>
            ))}
          </AutoSlider>
        </div>
      </section>

      <section className="section partners-section" id="hotel" data-reveal>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">{t.hotels.eyebrow}</span>
              <h2>{t.hotels.h2}</h2>
              <p>{t.hotels.lead}</p>
            </div>
          </div>
          <AutoSlider className="partner-grid">
            {data.hotelPartners.map((item) => (
              <article className="partner-card" key={item.name}>
                <div className="partner-image">
                  <Image
                    src={item.image}
                    alt={fill(t.hotels.imageAlt, { name: item.name })}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </div>
                <div className="partner-copy">
                  <span>{t.hotels.badge}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <a href={waLink(fill(t.wa.hotel, { name: item.name }))} target="_blank" rel="noreferrer">
                    {t.hotels.askWa}
                  </a>
                </div>
              </article>
            ))}
          </AutoSlider>
        </div>
      </section>

      <section className="section restaurant-section" id="restaurant" data-reveal>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t.restaurants.eyebrow}</span>
              <h2>{t.restaurants.h2}</h2>
              <p>{t.restaurants.lead}</p>
            </div>
          </div>
          <AutoSlider className="partner-grid">
            {data.restaurantPartners.map((item) => (
              <article className="partner-card dark-card" key={item.name}>
                <div className="partner-image">
                  <Image
                    src={item.image}
                    alt={fill(t.restaurants.imageAlt, { name: item.name })}
                    fill
                    sizes="(max-width: 800px) 100vw, 33vw"
                  />
                </div>
                <div className="partner-copy">
                  <span>{t.restaurants.badge}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <a href={waLink(fill(t.wa.restaurant, { name: item.name }))} target="_blank" rel="noreferrer">
                    {t.restaurants.askWa}
                  </a>
                </div>
              </article>
            ))}
          </AutoSlider>
        </div>
      </section>

      <section className="section testimonial-section" id="testimonials" data-reveal>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow dark">{t.testimonials.eyebrow}</span>
              <h2>{t.testimonials.h2}</h2>
              <p>{t.testimonials.lead}</p>
            </div>
          </div>
          <AutoSlider className="testimonial-grid">
            {data.testimonials.map((item, i) => (
              <figure className="testimonial-card" key={`${item.name}-${i}`}>
                <div className="stars">{"★".repeat(item.rating)}</div>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <b>{item.name}</b>
                  <span>
                    {item.location}
                    {item.date ? ` • ${item.date}` : ""}
                  </span>
                </figcaption>
              </figure>
            ))}
          </AutoSlider>
        </div>
      </section>

      <section className="section faq-section" id="faq" data-reveal>
        <div className="container faq-grid">
          <div>
            <span className="eyebrow dark">{t.faq.eyebrow}</span>
            <h2>{t.faq.h2}</h2>
            <p>{t.faq.lead}</p>
          </div>
          <div className="faq-list">
            {t.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" data-reveal>
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">{t.cta.eyebrow}</span>
            <h2>{t.cta.h2}</h2>
            <p>{t.cta.lead}</p>
          </div>
          <a className="btn btn-light" href={waLink(t.wa.cta)} target="_blank" rel="noreferrer">
            {t.cta.button}
          </a>
        </div>
      </section>

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
    </main>
  );
}
