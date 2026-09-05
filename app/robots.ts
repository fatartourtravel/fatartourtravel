import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://fatartourtravel.com/sitemap.xml",
    host: "https://fatartourtravel.com",
  };
}
