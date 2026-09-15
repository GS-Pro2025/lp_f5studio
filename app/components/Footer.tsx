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
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        
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

        {/* Columna 4: Redes Sociales */}
        <Reveal>
          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.3em] text-[#6F42C1] uppercase">
              {t("socialTitle")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/f5-studio-lab-llc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F5F5F7]/80 transition-all hover:border-[#6F42C1] hover:bg-[#6F42C1] hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/f5studio.io?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F5F5F7]/80 transition-all hover:border-[#6F42C1] hover:bg-[#6F42C1] hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Columna 5: Botón de acción */}
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
        © {new Date().getFullYear()} F5 Studio. {t("rights")}
      </div>
    </footer>
  );
}