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
    <section id="nosotros" className="relative overflow-hidden py-24 sm:py-32 bg-[#121212]">
      {/* Glow ambiental */}
      <div
        className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-[#6F42C1]/15 blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[0.68rem] font-bold tracking-[0.35em] text-[#6F42C1] uppercase">
            {t("kicker")}
          </p>
          <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] uppercase text-[#F5F5F7] sm:text-6xl lg:text-7xl">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-[#6F42C1]">{chunks}</span>
              ),
            })}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal delay={80}>
            <span className="inline-flex rounded-full border border-[#6F42C1]/40 px-4 py-1.5 text-[0.62rem] font-bold tracking-[0.3em] text-[#6F42C1] uppercase">
              {t("since")}
            </span>
            <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight uppercase text-[#F5F5F7] sm:text-3xl">
              {t("subtitle")}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-[#F5F5F7]/70 font-light">
              {t("description1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#F5F5F7]/70 font-light">
              {t("description2")}
            </p>
          </Reveal>

          {/* Feature Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={120 + i * 140} from="right">
                <article
                  className="group h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-[#6F42C1]/50 hover:shadow-[0_20px_40px_-15px_rgba(111,66,193,0.3)]"
                  style={{ marginTop: i % 2 === 1 ? "1.5rem" : undefined }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#6F42C1]/15 text-[#6F42C1] transition-colors group-hover:bg-[#6F42C1] group-hover:text-[#F5F5F7]">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-5 font-display text-sm font-extrabold tracking-[0.15em] uppercase text-[#F5F5F7]">
                    {f.title}
                  </h4>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <Reveal delay={100}>
          <div className="mt-20 flex flex-col items-center gap-2 border-t border-white/10 pt-12 text-center">
            <p className="font-display text-3xl font-extrabold tracking-[-0.02em] uppercase text-[#F5F5F7] sm:text-4xl">
              F5 Studio
            </p>
            <p className="text-xs font-bold tracking-[0.35em] text-[#6F42C1] uppercase">
              {t("motto")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}