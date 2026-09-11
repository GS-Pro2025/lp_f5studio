"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
// Ajusta esta ruta si tu archivo de navegación de next-intl está en otro lugar
// (el que exporta { Link, usePathname, useRouter } a partir de createNavigation(routing)).
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
  fr: "FR",
};

// Debe coincidir con "locales" en tu routing.ts
const LOCALES = ["en", "es", "pt", "fr"];

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Las keys deben existir en Navbar.links dentro de tus archivos de mensajes.
  // Los ids deben coincidir EXACTAMENTE con el id de cada <section> del sitio.
  const links = [
    { key: "home", id: "hero" },
    { key: "about", id: "nosotros" },
    { key: "services", id: "servicios" },
    { key: "projects", id: "proyectos" },
    { key: "contact", id: "contacto" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? "bg-[#1E1E1E]/90 border-b border-white/5 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 w-full flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center shrink-0"
        >
          <Image
            src="/f5LogoHblancoN.png"
            alt="F5 Studio"
            width={120}
            height={40}
            className="h-10 sm:h-10 w-auto object-contain"
            priority
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-[#F5F5F7]/70 hover:text-[#F5F5F7] text-sm font-normal tracking-wide transition-colors duration-200"
            >
              {t(`links.${key}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Selector de idioma — discreto, misma altura en desktop y mobile */}
          <div className="relative flex items-center">
            <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#F5F5F7]/50" />
            <select
              value={locale}
              onChange={handleLocaleChange}
              aria-label={t("languageLabel")}
              className="appearance-none cursor-pointer rounded-full border border-white/10 bg-white/5 py-1.5 pl-8 pr-6 text-xs font-normal tracking-wide text-[#F5F5F7]/80 transition-colors hover:border-white/25 hover:text-[#F5F5F7] focus:outline-none focus:border-[#6F42C1]/60"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} className="bg-[#1E1E1E] text-[#F5F5F7]">
                  {LOCALE_LABELS[l] ?? l.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 h-3 w-3 text-[#F5F5F7]/50" />
          </div>

          {/* CTA Desktop */}
          <button
            onClick={() => scrollTo("contacto")}
            className="hidden md:flex items-center gap-2 bg-[#6F42C1] hover:bg-[#5a369e] active:scale-[0.97] text-[#F5F5F7] px-5 py-2.5 rounded-full text-sm font-normal tracking-wide transition-all"
          >
            {t("cta")}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#F5F5F7]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu (Animado) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#1E1E1E]/98 border-t border-white/5 px-6 py-6 flex flex-col gap-4 transition-all duration-300 origin-top backdrop-blur-lg ${
          menuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        {links.map(({ key, id }) => (
          <button
            key={key}
            onClick={() => scrollTo(id)}
            className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] text-base font-normal text-left transition-colors py-2"
          >
            {t(`links.${key}`)}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contacto")}
          className="bg-[#6F42C1] hover:bg-[#5a369e] active:scale-[0.97] text-[#F5F5F7] px-5 py-3 rounded-full text-sm font-normal mt-2 transition-all text-center"
        >
          {t("cta")}
        </button>
      </div>
    </nav>
  );
}