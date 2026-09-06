import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/en/admin", "/id/admin"] },
    sitemap: "https://fatartourtravel.com/sitemap.xml",
    host: "https://fatartourtravel.com",
  };
}
