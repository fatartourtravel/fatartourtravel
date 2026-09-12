"use client";

import type { Currency, LocalizedCatalog } from "@/lib/catalog";
import { groupPackages } from "@/lib/catalog";
import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { formatMoney } from "@/lib/money";
import { fill, LEGAL_PDF, LEGAL_QR, waLink } from "@/lib/site";
import AutoSlider from "@/components/AutoSlider";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

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
  const packageGroups = useMemo(() => groupPackages(data.packages), [data.packages]);
  const moveHero = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    event.currentTarget.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  const convert = (myr: number) => myr * data.currencyRates[currency];

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
      <SiteHeader locale={locale} t={t} />

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
            </div>
          </div>

          <div className="tour-grid">
            {packageGroups.map((group) => (
              <article className="tour-card" key={group.slug}>
                <div className="tour-thumb">
                  <Image
                    src={group.image}
                    alt={fill(t.packages.imageAlt, { title: group.title, duration: group.durations.join(" / ") })}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <div className="image-badge">{group.durations.join(" · ")}</div>
                </div>
                <div className="tour-body">
                <h3>{group.title}</h3>
                <div className="tour-from">
                  <span>{t.packages.tourFrom}</span>
                  <strong>{formatMoney(convert(group.fromPrice), currency)}</strong>
                </div>
                <ul className="tour-meta">
                  <li>
                    <span className="tour-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <small>{t.packages.availableDuration}</small>
                      <b>{group.durations.join("  ·  ")}</b>
                    </div>
                  </li>
                  <li>
                    <span className="tour-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <small>{t.packages.packageOptions}</small>
                      <b>{t.packages.standardAndFull}</b>
                    </div>
                  </li>
                  <li>
                    <span className="tour-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 10l8-6 8 6v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M9 21v-7h6v7" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <div>
                      <small>{t.packages.packageAvailability}</small>
                      <b>{fill(t.packages.optionsAvailable, { n: group.optionCount })}</b>
                    </div>
                  </li>
                </ul>
                <div className="tour-actions">
                  <Link className="btn tour-explore" href={`/${locale}/packages/${group.slug}`}>
                    {t.packages.explore}
                  </Link>
                  <a
                    className="btn"
                    href={waLink(fill(t.wa.group, { title: group.title, duration: group.durations.join(" / ") }))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.packages.askPackage}
                  </a>
                </div>
                </div>
              </article>
            ))}
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

      <section className="section legal-section" id="legalitas" data-reveal>
        <div className="container legal-grid">
          <div>
            <span className="eyebrow dark">{t.legal.eyebrow}</span>
            <h2>{t.legal.h2}</h2>
            <p>{t.legal.lead}</p>
            <ul className="legal-points">
              {t.legal.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="btn btn-dark" href={LEGAL_PDF} target="_blank" rel="noreferrer">
              {t.legal.pdfLabel}
            </a>
            <p className="legal-pdf-note">{t.legal.pdfNote}</p>
          </div>
          <aside className="legal-card">
            <div className="legal-qr">
              <Image src={LEGAL_QR} alt={t.legal.qrAlt} width={280} height={280} />
            </div>
            <div className="legal-card-copy">
              <b>{t.legal.qrTitle}</b>
              <span>{t.legal.qrHint}</span>
            </div>
          </aside>
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
                    {formatMoney(car.prices.IDR, "IDR")} <b>•</b> {formatMoney(car.prices.MYR, "MYR")} <b>•</b>{" "}
                    {formatMoney(car.prices.SGD, "SGD")}
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

      <SiteFooter locale={locale} t={t} />
    </main>
  );
}
