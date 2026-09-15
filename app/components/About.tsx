"use client";

import { BarChart3, Users, Code2, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

export function About() {
  const t = useTranslations("About");

  const features = [
    { icon: BarChart3, title: t("features.strategy") },
    { icon: Users, title: t("features.design") },
    { icon: Code2, title: t("features.code") },
    { icon: Target, title: t("features.results") },
  ];

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[#121212]"
    >
      {/* Glow ambiental — más chico en mobile para no dominar la pantalla */}
      <div
        className="pointer-events-none absolute top-1/3 -left-24 sm:-left-40 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#6F42C1]/15 blur-[90px] sm:blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[#6F42C1] uppercase">
            {t("kicker")}
          </p>
          <h2 className="mt-4 sm:mt-5 max-w-4xl text-balance font-display text-[clamp(2rem,8vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.02em] sm:tracking-[-0.03em] uppercase text-[#F5F5F7]">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-[#6F42C1]">{chunks}</span>
              ),
            })}
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal delay={80}>
            <span className="inline-flex rounded-full border border-[#6F42C1]/40 px-4 py-1.5 text-[0.6rem] sm:text-[0.62rem] font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#6F42C1] uppercase">
              {t("since")}
            </span>
            <h3 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight uppercase text-[#F5F5F7]">
              {t("subtitle")}
            </h3>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-base leading-relaxed text-[#F5F5F7]/70 font-light">
              {t("description1")}
            </p>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#F5F5F7]/70 font-light">
              {t("description2")}
            </p>
          </Reveal>

          {/* Feature Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={120 + i * 140}
                from={i % 2 === 1 ? "right" : "left"}
                className={i % 2 === 1 ? "sm:mt-6" : undefined}
              >
                <article className="group h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 active:scale-[0.98] hover:-translate-y-2 hover:bg-white/[0.08] hover:border-[#6F42C1]/50 hover:shadow-[0_20px_40px_-15px_rgba(111,66,193,0.3)]">
                  <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-[#6F42C1]/15 text-[#6F42C1] transition-colors group-hover:bg-[#6F42C1] group-hover:text-[#F5F5F7] group-active:bg-[#6F42C1] group-active:text-[#F5F5F7]">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 sm:mt-5 font-display text-[13px] sm:text-sm font-extrabold tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[#F5F5F7]">
                    {f.title}
                  </h4>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <Reveal delay={100}>
          <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 border-t border-white/10 pt-10 sm:pt-12 text-center">
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.01em] sm:tracking-[-0.02em] uppercase text-[#F5F5F7]">
              F5 Studio Lab LLC
            </p>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[#6F42C1] uppercase">
              {t("motto")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}