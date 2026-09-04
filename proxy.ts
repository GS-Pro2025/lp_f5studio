import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "pt"],
  defaultLocale: "es",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
