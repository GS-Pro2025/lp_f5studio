import type { MetadataRoute } from "next";

const BASE_URL = "https://f5studiolab.com";
const LOCALES = ["en", "es", "pt"] as const;
const DEFAULT_LOCALE = "en";

// Añade aquí más rutas si la landing crece
const ROUTES = ["/"] as const;

function buildPath(locale: (typeof LOCALES)[number], route: (typeof ROUTES)[number]) {
  // El locale por defecto (en) no lleva prefijo en la URL
  return locale === DEFAULT_LOCALE ? route : `/${locale}${route === "/" ? "" : route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      entries.push({
        url: `${BASE_URL}${buildPath(locale, route)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}${buildPath(l, route)}`]),
          ),
        },
      });
    }
  }

  return entries;
}