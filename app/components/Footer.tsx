"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function Footer() {
  const t = useTranslations("Footer");

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
  };

  return (
    <footer className="border-t border-white/5 bg-[#1E1E1E] py-14 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
        
        {/* Columna 1: Logo y eslogan */}
        <Reveal>
          <div>
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center text-left"
            >
              <Image
                src="/f5LogoHblancoN.png"
                alt="F5 Studio"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
                loading="lazy"
              />
            </button>
            <p className="mt-4 max-w-xs text-sm font-normal text-[#F5F5F7]/70">
              {t("tagline")}
            </p>
          </div>
        </Reveal>

        {/* Columna 2: Navegación */}
        <Reveal>
          <nav aria-label={t("navAriaLabel")}>
            <p className="text-[0.6rem] font-bold tracking-[0.3em] text-[#6F42C1] uppercase">
              {t("navTitle")}
            </p>
            <ul className="mt-4 space-y-2">
              {links.map(({ key, id }) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm font-normal text-[#F5F5F7]/70 transition-colors hover:text-[#F5F5F7]"
                  >
                    {t(`links.${key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        {/* Columna 3: Contacto */}
        <Reveal>
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.3em] text-[#6F42C1] uppercase">
              {t("contactTitle")}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#F5F5F7]/70">
              <li>
                <a href="mailto:hola@f5studio.com" className="transition-colors hover:text-[#F5F5F7]">
                  hola@f5studio.com
                </a>
              </li>
              <li>
                <a href="mailto:proyectos@f5studio.com" className="transition-colors hover:text-[#F5F5F7]">
                  proyectos@f5studio.com
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Columna 4: Botón de acción */}
        <Reveal>
          <div className="flex items-start">
            <button
              onClick={() => scrollTo("contacto")}
              className="group inline-flex items-center gap-3 rounded-full border border-[#6F42C1]/50 px-6 py-3 text-xs font-normal tracking-widest text-[#F5F5F7] uppercase transition-all hover:bg-[#6F42C1] hover:border-[#6F42C1] active:scale-[0.97]"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>

      </div>

      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 px-5 pt-6 text-xs font-normal text-[#F5F5F7]/50 sm:px-6">
        © {new Date().getFullYear()} F5 Studio Lab LLC. {t("rights")}
      </div>
    </footer>
  );
}