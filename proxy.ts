import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "pt","fr"],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
