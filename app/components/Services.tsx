"use client";

import { useTranslations } from "next-intl";

type ServiceItem = {
  title: string;
  desc: string;
  tags: string[];
};

function ServicesSection() {
  const t = useTranslations("Services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="bg-[#1E1E1E] py-28 relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(111,66,193,0.06) 0%, transparent 65%)" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[#6F42C1]" />
            <span
              className="text-xs text-[#6F42C1] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Aileron, sans-serif", fontWeight: 400 }}
            >
              {t("eyebrow")}
            </span>
            <div className="w-8 h-px bg-[#6F42C1]" />
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] text-[#F5F5F7] leading-[1.08] tracking-[-0.02em] max-w-2xl"
            style={{ fontFamily: "Aileron, sans-serif", fontWeight: 900 }}
          >
            {t("title")}
          </h2>
          <p
            className="text-[#F5F5F7]/45 text-lg max-w-xl"
            style={{ fontFamily: "Aileron, sans-serif", fontWeight: 300 }}
          >
            {t("description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map(({ title, desc, tags }) => (
            <div
              key={title}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-[#6F42C1]/40 hover:bg-white/[0.06] transition-colors rounded-2xl p-7 flex flex-col gap-5 cursor-default"
            >
              <h3
                className="text-[#F5F5F7] text-lg leading-snug"
                style={{ fontFamily: "Aileron, sans-serif", fontWeight: 700 }}
              >
                {title}
              </h3>
              <p
                className="text-[#F5F5F7]/45 text-sm leading-relaxed flex-1"
                style={{ fontFamily: "Aileron, sans-serif", fontWeight: 300 }}
              >
                {desc}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#6F42C1]/80 border border-[#6F42C1]/20 rounded-full px-2.5 py-1"
                    style={{ fontFamily: "Aileron, sans-serif", fontWeight: 300 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;