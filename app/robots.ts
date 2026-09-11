import type { MetadataRoute } from "next";

const BASE_URL = "https://f5studiolab.com"; // ajusta al dominio real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
