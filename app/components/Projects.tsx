"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";

// Debe coincidir con "locales" en tu routing.ts
type LocaleImages = {
  en: string;
  es: string;
  pt: string;
  fr: string;
};

// El fondo del slider necesita una versión por idioma Y por tamaño de pantalla
// (el recorte/composición cambia entre mobile y desktop)
type ResponsiveBg = {
  mobile: LocaleImages;
  desktop: LocaleImages;
};

type Project = {
  key: string;
  name: string;
  category: string;
  // Imagen grande de fondo del slider (mobile/desktop, cada una por idioma)
  bg: ResponsiveBg;
  // Imagen de la miniatura/card de la tira inferior (una por idioma, independiente del fondo)
  card: LocaleImages;
};

// Si un idioma no tiene imagen todavía, se usa esta como respaldo
const FALLBACK_LOCALE: keyof LocaleImages = "es";

// Ajusta estas rutas a donde realmente pusiste tus imágenes en /public
const projects: Project[] = [
  {
    key: "globin",
    name: "Globin",
    category: "UI/UX · Desarrollo",
    bg: {
      mobile: {
        en: "/projects/globin/bg-mobile-en.jpg",
        es: "/projects/globin/bg-mobile-es.jpg",
        pt: "/projects/globin/bg-mobile-pt.jpg",
        fr: "/projects/globin/bg-mobile-fr.jpg",
      },
      desktop: {
        en: "/projects/globin/bg-desktop-en.jpg",
        es: "/projects/globin/bg-desktop-es.jpg",
        pt: "/projects/globin/bg-desktop-pt.jpg",
        fr: "/projects/globin/bg-desktop-fr.jpg",
      },
    },
    card: {
      en: "/projects/globin/card-en.jpg",
      es: "/projects/globin/card-es.jpg",
      pt: "/projects/globin/card-pt.jpg",
      fr: "/projects/globin/card-fr.jpg",
    },
  },
  {
    key: "movingwise",
    name: "Moving Wise",
    category: "UI/UX · SaaS",
    bg: {
      mobile: {
        en: "/projects/movingwise/bg-mobile-en.jpg",
        es: "/projects/movingwise/bg-mobile-es.jpg",
        pt: "/projects/movingwise/bg-mobile-pt.jpg",
        fr: "/projects/movingwise/bg-mobile-fr.jpg",
      },
      desktop: {
        en: "/projects/movingwise/bg-desktop-en.jpg",
        es: "/projects/movingwise/bg-desktop-es.jpg",
        pt: "/projects/movingwise/bg-desktop-pt.jpg",
        fr: "/projects/movingwise/bg-desktop-fr.jpg",
      },
    },
    card: {
      en: "/projects/movingwise/card-en.jpg",
      es: "/projects/movingwise/card-es.jpg",
      pt: "/projects/movingwise/card-pt.jpg",
      fr: "/projects/movingwise/card-fr.jpg",
    },
  },
  {
    key: "gspromaster",
    name: "GS Pro Master",
    category: "Branding · Web",
    bg: {
      mobile: {
        en: "/projects/gspromaster/bg-mobile-en.jpg",
        es: "/projects/gspromaster/bg-mobile-es.jpg",
        pt: "/projects/gspromaster/bg-mobile-pt.jpg",
        fr: "/projects/gspromaster/bg-mobile-fr.jpg",
      },
      desktop: {
        en: "/projects/gspromaster/bg-desktop-en.jpg",
        es: "/projects/gspromaster/bg-desktop-es.jpg",
        pt: "/projects/gspromaster/bg-desktop-pt.jpg",
        fr: "/projects/gspromaster/bg-desktop-fr.jpg",
      },
    },
    card: {
      en: "/projects/gspromaster/card-en.jpg",
      es: "/projects/gspromaster/card-es.jpg",
      pt: "/projects/gspromaster/card-pt.jpg",
      fr: "/projects/gspromaster/card-fr.jpg",
    },
  },
  {
    key: "27th",
    name: "27th",
    category: "Branding · Web",
    bg: {
      mobile: {
        en: "/projects/27th/bg-mobile-en.jpg",
        es: "/projects/27th/bg-mobile-es.jpg",
        pt: "/projects/27th/bg-mobile-pt.jpg",
        fr: "/projects/27th/bg-mobile-fr.jpg",
      },
      desktop: {
        en: "/projects/27th/bg-desktop-en.jpg",
        es: "/projects/27th/bg-desktop-es.jpg",
        pt: "/projects/27th/bg-desktop-pt.jpg",
        fr: "/projects/27th/bg-desktop-fr.jpg",
      },
    },
    card: {
      en: "/projects/27th/card-en.jpg",
      es: "/projects/27th/card-es.jpg",
      pt: "/projects/27th/card-pt.jpg",
      fr: "/projects/27th/card-fr.jpg",
    },
  },
];

function getLocalizedImage(images: LocaleImages, locale: string) {
  return images[locale as keyof LocaleImages] ?? images[FALLBACK_LOCALE];
}

const SWIPE_THRESHOLD = 40;

export function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const total = projects.length;
  const touchStartX = useRef<number | null>(null);

  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe táctil sobre el visual de fondo, para navegar en mobile
  // sin depender solo de los botones o la tira de miniaturas.
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      go(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  const current = projects[active];

  return (
    <section
      id="proyectos"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#1E1E1E]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fondo del proyecto activo: una capa mobile y una desktop por proyecto,
          alternadas con Tailwind (sm:hidden / hidden sm:block), cada una
          resuelta según el idioma activo con getLocalizedImage(). */}
      <div className="absolute inset-0">
        {projects.map((p, i) => (
          <div
            key={`${p.key}-bg-wrap-${locale}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={getLocalizedImage(p.bg.mobile, locale)}
              alt={`Proyecto ${p.name}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover sm:hidden"
            />
            <Image
              src={getLocalizedImage(p.bg.desktop, locale)}
              alt={`Proyecto ${p.name}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hidden object-cover sm:block"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/20 to-[#1E1E1E]/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-14 lg:pt-32">
        {/* Texto superior */}
        <Reveal>
          <div className="max-w-xl">
            <p className="text-[0.65rem] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[#6F42C1] uppercase">
              {t("eyebrow")}
            </p>

            {/* Se remonta con key={active}: cada cambio de proyecto
                vuelve a correr la animación de entrada del texto. */}
            <div key={active} className="projects-slide-in">
              <p className="mt-4 text-xs sm:text-sm tracking-[0.15em] text-[#F5F5F7]/50 uppercase">
                {current.category}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,9vw,3.75rem)] leading-[0.95] font-extrabold tracking-[-0.02em] sm:tracking-[-0.03em] text-[#F5F5F7] uppercase">
                {current.name}
              </h2>
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-base leading-relaxed text-[#F5F5F7]/60">
                {t("description")}
              </p>
            </div>

            <a
              href="#contacto"
              className="mt-6 sm:mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 sm:px-6 sm:py-3.5 text-[0.6rem] sm:text-[0.62rem] font-bold tracking-[0.2em] text-[#F5F5F7] uppercase transition-colors hover:border-primary hover:text-primary active:scale-[0.97]"
            >
              {t("cta")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>

        {/* Tira de tarjetas: usa la imagen "card", independiente del fondo */}
        <Reveal delay={150} from="right">
          <div className="projects-strip mt-10 sm:mt-14 flex items-end gap-3 sm:gap-5 overflow-x-auto pb-2">
            {projects.map((p, i) => (
              <button
                key={`${p.key}-card-${locale}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver ${p.name}`}
                aria-current={i === active}
                className={cn(
                  "group relative shrink-0 overflow-hidden rounded-2xl border transition-all duration-500 ease-out",
                  i === active
                    ? "h-48 w-auto border-primary sm:h-64"
                    : "h-40 w-auto border-white/10 opacity-70 hover:opacity-100 active:opacity-100 sm:h-52",
                )}
                style={{ scrollSnapAlign: "start" }}
              >
                <Image
                  src={getLocalizedImage(p.card, locale)}
                  alt={`Proyecto ${p.name}`}
                  width={400}
                  height={520}
                  sizes="(max-width: 640px) 140px, 176px"
                  className="h-full w-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 text-left">
                  <p className="text-[0.5rem] sm:text-[0.55rem] font-bold tracking-[0.2em] text-[#F5F5F7]/60 uppercase">
                    {p.category.split(" · ")[0]}
                  </p>
                  <p className="mt-0.5 text-[13px] sm:text-sm leading-tight font-extrabold tracking-tight text-[#F5F5F7] uppercase">
                    {p.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Controles */}
        <Reveal delay={220}>
          <div className="mt-8 sm:mt-10 flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                aria-label={t("prev")}
                onClick={() => go(-1)}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/15 text-[#F5F5F7] transition-colors hover:border-primary hover:text-primary active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={t("next")}
                onClick={() => go(1)}
                className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/15 text-[#F5F5F7] transition-colors hover:border-primary hover:text-primary active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-px flex-1 bg-white/15">
              <div
                className="absolute top-1/2 h-px -translate-y-1/2 bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((active + 1) / total) * 100}%` }}
              />
            </div>

            <p className="font-display text-base sm:text-lg font-extrabold tracking-tight text-[#F5F5F7]">
              {String(active + 1).padStart(2, "0")}
              <span className="text-[#F5F5F7]/40">
                /{String(total).padStart(2, "0")}
              </span>
            </p>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @keyframes projects-slide-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .projects-slide-in {
          animation: projects-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* Tira de miniaturas: scroll suave con snap, sin scrollbar visible */
        .projects-strip {
          scroll-snap-type: x proximity;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .projects-strip::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-slide-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
