"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const projects = [
  {
    name: "Globin",
    category: "UI/UX · Desarrollo",
    image: "/slider1.png",
  },
  {
    name: "Moving Wise",
    category: "UI/UX · SaaS",
    image: "/slider1.png",
  },
  {
    name: "GS Pro Master",
    category: "Branding · Web",
    image: "/slider1.png",
  },
];

export function Projects() {
  const t = useTranslations("Projects");
  const [active, setActive] = useState(0);
  const total = projects.length;

  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = projects[active];

  return (
    <section
      id="proyectos"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#1E1E1E]"
    >
      {/* Fondo del proyecto activo */}
      <div className="absolute inset-0">
        {projects.map((p, i) => (
          <Image
            key={p.name}
            src={p.image}
            alt={`Proyecto ${p.name}`}
            fill
            priority={i === 0}
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/20 to-[#1E1E1E]/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-14 sm:px-8">
        {/* Texto superior */}
        <div className="max-w-xl">
          <p className="text-xl font-bold tracking-[0.35em] text-[#6F42C1] uppercase">
            {t("eyebrow")}
          </p>
          <p className="mt-4 text-sm tracking-[0.15em] text-[#F5F5F7]/50 uppercase">
            {current.category}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] text-[#F5F5F7] uppercase sm:text-5xl lg:text-6xl">
            {current.name}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#F5F5F7]/60">
            {t("description")}
          </p>

          <a
            href="#contacto"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-[0.62rem] font-bold tracking-[0.2em] text-[#F5F5F7] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            {t("cta")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Tira de tarjetas */}
        <div className="mt-14 flex items-end gap-4 overflow-x-auto pb-2 sm:gap-5">
          {projects.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver ${p.name}`}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-2xl border transition-all duration-500 ease-out",
                i === active
                  ? "h-56 w-40 border-primary sm:h-64 sm:w-44"
                  : "h-44 w-32 border-white/10 opacity-70 hover:opacity-100 sm:h-52 sm:w-36",
              )}
            >
              <Image
                src={p.image}
                alt={`Proyecto ${p.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <p className="text-[0.55rem] font-bold tracking-[0.2em] text-[#F5F5F7]/60 uppercase">
                  {p.category.split(" · ")[0]}
                </p>
                <p className="mt-0.5 text-sm leading-tight font-extrabold tracking-tight text-[#F5F5F7] uppercase">
                  {p.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Controles */}
        <div className="mt-10 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={t("prev")}
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#F5F5F7] transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#F5F5F7] transition-colors hover:border-primary hover:text-primary"
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

          <p className="font-display text-lg font-extrabold tracking-tight text-[#F5F5F7]">
            {String(active + 1).padStart(2, "0")}
            <span className="text-[#F5F5F7]/40">/{String(total).padStart(2, "0")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}