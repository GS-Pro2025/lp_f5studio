
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Mantén tu import de IconArrow según dónde lo tengas
// import { IconArrow } from "@/components/icons";

type Project = {
  name: string;
  category: string;
  desc: string;
  img: string;
  tag: string;
  large?: boolean;
};

function PortfolioSection() {
  const t = useTranslations("Portfolio");
  const projects = t.raw("projects") as Project[];

  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section
      id="portfolio"
      className="bg-[#F5F5F7] py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">

          <div className="flex flex-col gap-4">

            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#6F42C1]" />

              <span
                className="text-xs text-[#6F42C1] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "Aileron, sans-serif",
                  fontWeight: 400,
                }}
              >
                {t("eyebrow")}
              </span>
            </div>

            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#1E1E1E] leading-[1.08] tracking-[-0.02em]"
              style={{
                fontFamily: "Aileron, sans-serif",
                fontWeight: 900,
              }}
            >
              {t("titlePre")}{" "}
              <span className="text-gradient">
                {t("titleHighlight")}
              </span>
            </h2>
          </div>

          {/* Project selectors */}
          <div className="flex flex-wrap gap-2">
            {projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  active === i
                    ? "bg-[#6F42C1] text-[#F5F5F7]"
                    : "border border-[#1E1E1E]/15 text-[#1E1E1E]/60 hover:border-[#6F42C1]/40 hover:text-[#6F42C1]"
                }`}
                style={{
                  fontFamily: "Aileron, sans-serif",
                  fontWeight: active === i ? 700 : 300,
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-5 gap-5">

          {/* Main project */}
          <div
            className="lg:col-span-3 portfolio-card rounded-3xl overflow-hidden relative bg-[#1E1E1E] group cursor-pointer"
            style={{ minHeight: 420 }}
          >
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">

              <span
                className="text-xs text-[#6F42C1] bg-[#6F42C1]/15 border border-[#6F42C1]/30 px-3 py-1 rounded-full"
                style={{
                  fontFamily: "Aileron, sans-serif",
                  fontWeight: 400,
                }}
              >
                {project.tag}
              </span>

              <h3
                className="text-[#F5F5F7] text-3xl mt-3"
                style={{
                  fontFamily: "Aileron, sans-serif",
                  fontWeight: 900,
                }}
              >
                {project.name}
              </h3>

              <p
                className="text-[#F5F5F7]/60 mt-1.5 text-sm"
                style={{
                  fontFamily: "Aileron, sans-serif",
                  fontWeight: 300,
                }}
              >
                {project.desc}
              </p>

              <div className="flex items-center gap-2 mt-4 text-[#6F42C1] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  style={{
                    fontFamily: "Aileron, sans-serif",
                  }}
                >
                  {t("viewProject")}
                </span>
              </div>
            </div>
          </div>

          {/* Side projects */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                className={`portfolio-card rounded-2xl overflow-hidden relative group flex-1 cursor-pointer text-left border-2 transition-all duration-300 ${
                  active === i
                    ? "border-[#6F42C1]"
                    : "border-transparent"
                }`}
                style={{ minHeight: 120 }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover absolute inset-0"
                />

                <div className="absolute inset-0 bg-[#1E1E1E]/70 group-hover:bg-[#1E1E1E]/60 transition-colors" />

                <div className="relative p-5 h-full flex flex-col justify-end">

                  <span
                    className="text-[#6F42C1] text-xs"
                    style={{
                      fontFamily: "Aileron, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {p.category}
                  </span>

                  <h4
                    className="text-[#F5F5F7] text-lg mt-0.5"
                    style={{
                      fontFamily: "Aileron, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {p.name}
                  </h4>

                </div>
              </button>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;

