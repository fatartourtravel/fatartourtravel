import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Dictionary } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { PageSlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default function MarkdownPage({
  locale,
  t,
  slug,
  title,
  description,
  updated,
  body,
}: {
  locale: Locale;
  t: Dictionary;
  slug: PageSlug;
  title: string;
  description: string;
  updated?: string;
  body: string;
}) {
  return (
    <main className="md-shell">
      <SiteHeader locale={locale} t={t} path={`/${slug}`} />
      <article className="container md-page">
        <p className="eyebrow dark">{t.footer[slug === "terms" ? "terms" : slug]}</p>
        <h1>{title}</h1>
        <p className="md-lead">{description}</p>
        {updated && (
          <p className="md-updated">
            {locale === "id" ? "Diperbarui" : "Updated"} {updated}
          </p>
        )}
        <div className="md-body">
          <ReactMarkdown
            components={{
              a: ({ href, children }) =>
                href?.startsWith("http") ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ) : (
                  <a href={href}>{children}</a>
                ),
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </article>
      <SiteFooter locale={locale} t={t} />
    </main>
  );
}
