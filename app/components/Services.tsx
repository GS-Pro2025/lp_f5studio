"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Code2, Palette, Layers, LineChart, Camera, Share2, Megaphone, Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "../lib/utils";

const serviceIcons = [Code2, Palette, Layers, LineChart, Camera, Share2, Megaphone];
const serviceKeys = [
  "development",
  "branding",
  "uiux",
  "marketing",
  "production",
  "social",
  "ads",
] as const;

export function Services() {
  const t = useTranslations("Services");
  const [active, setActive] = useState(0);

  const services = serviceKeys.map((key, i) => ({
    icon: serviceIcons[i],
    title: t(`items.${key}.title`),
    text: t(`items.${key}.text`),
    tagsLabel: t(`items.${key}.tagsLabel`),
    tags: t.raw(`items.${key}.tags`) as string[],
  }));

  return (
    <section id="servicios" className="relative bg-[#1E1E1E] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8]">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.35em] text-[#6F42C1] uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] text-[#F5F5F7] uppercase sm:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#F5F5F7]/55">
            {t("description")}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-3">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <Reveal key={s.title} delay={i * 60}>
                                <button
                  type="button"
                  onClick={() => setActive(isActive ? -1 : i)}
                  aria-expanded={isActive}
                  className={cn(
                    "group w-full rounded-2xl border p-6 text-left transition-all duration-500 sm:p-8",
                    isActive
                      ? "border-[#6F42C1] bg-[#6F42C1]/[0.08] shadow-[0_0_0_1px_rgba(111,66,193,0.4),0_20px_50px_-15px_rgba(111,66,193,0.55)]"
                      : "border-white/10 bg-white/[0.03] hover:border-[#6F42C1]/40",
                  )}
                >
                  <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                        isActive
                          ? "bg-[#6F42C1] text-[#F5F5F7]"
                          : "bg-white/[0.06] text-[#6F42C1]",
                      )}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="min-w-0 font-display text-base font-extrabold tracking-tight text-[#F5F5F7] uppercase sm:text-xl">
                      {s.title}
                    </h3>
                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 text-[#F5F5F7]/40 transition-transform duration-500",
                        isActive && "rotate-45 text-[#6F42C1]",
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "grid transition-all duration-500",
                      isActive
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 sm:group-hover:mt-5 sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl text-sm leading-relaxed text-[#F5F5F7]/55 sm:text-base">
                        {s.text}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-[0.6rem] font-bold tracking-[0.25em] text-[#6F42C1] uppercase">
                          {s.tagsLabel}:
                        </span>
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#F5F5F7]/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}