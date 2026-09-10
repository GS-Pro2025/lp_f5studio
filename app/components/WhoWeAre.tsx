"use client";

import { useTranslations } from "next-intl";
import { Compass, Eye, Sparkles, Target, Users, Code2, Lightbulb, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const blockIcons = [Sparkles, Compass, Eye];
const blockKeys = ["about", "mission", "vision"] as const;

const reasonIcons = [Target, Users, Code2, Lightbulb, MessageCircle, Sparkles];
const reasonKeys = [
  "strategy",
  "peopleFirst",
  "technology",
  "creativity",
  "communication",
  "custom",
] as const;

export function WhoWeAre() {
  const t = useTranslations("WhoWeAre");

  const blocks = blockKeys.map((key, i) => ({
    icon: blockIcons[i],
    title: t(`blocks.${key}.title`),
    text: t(`blocks.${key}.text`),
  }));

  const reasons = reasonKeys.map((key, i) => ({
    icon: reasonIcons[i],
    title: t(`reasons.${key}`),
  }));

  return (
    <section id="quienes-somos" className="relative overflow-hidden bg-[#1E1E1E] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#6F42C1]/12 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden
          />

          <div className="relative">
            <Reveal>
              <p className="text-[0.68rem] font-bold tracking-[0.35em] text-[#6F42C1] uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[0.95] font-extrabold tracking-[-0.03em] text-[#F5F5F7] uppercase sm:text-6xl">
                {t("titlePre")} <span className="text-[#6F42C1]">{t("titleHighlight")}</span>
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {blocks.map((b, i) => (
                <Reveal key={b.title} delay={80 + i * 110}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-transform duration-500 hover:-translate-y-1.5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#6F42C1]/15 text-[#6F42C1] transition-colors group-hover:bg-[#6F42C1] group-hover:text-[#F5F5F7]">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-sm font-extrabold tracking-[0.2em] text-[#F5F5F7] uppercase">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#F5F5F7]/55">{b.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <h3 className="mt-16 font-display text-xl font-extrabold tracking-[-0.02em] text-[#F5F5F7] uppercase sm:text-2xl">
                {t("reasonsTitlePre")} <span className="text-[#6F42C1]">{t("reasonsTitleHighlight")}</span>?
              </h3>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={60 + i * 80} from="right">
                  <article className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-5 transition-transform duration-500 hover:-translate-y-1">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#6F42C1]/15 text-[#6F42C1] transition-colors group-hover:bg-[#6F42C1] group-hover:text-[#F5F5F7]">
                      <r.icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="text-sm leading-snug font-semibold text-[#F5F5F7]">{r.title}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}