"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

function IconCheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function AboutSection() {
  const t = useTranslations("About");
  const features = t.raw("features") as string[];

  return (
    <section
      id="about"
      className="bg-[#F5F5F7] py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* =========================
              IMAGES GRID
          ========================== */}
          <div className="relative grid grid-cols-2 gap-4">

            {/* Columna izquierda */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-56 bg-[#e0e0e2]">
                <Image
                  src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=480&h=360&fit=crop&auto=format"
                  alt={t("titlePre")}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="rounded-2xl overflow-hidden h-36 bg-[#e0e0e2]">
                <Image
                  src="https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=480&h=280&fit=crop&auto=format"
                  alt={t("eyebrow")}
                  width={480}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4 mt-10">
              <div className="rounded-2xl overflow-hidden h-36 bg-[#e0e0e2]">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=280&fit=crop&auto=format"
                  alt={t("titleHighlight")}
                  width={480}
                  height={280}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="rounded-2xl overflow-hidden h-56 bg-[#e0e0e2]">
                <Image
                  src="https://images.unsplash.com/photo-1603201667230-bd139210db18?w=480&h=360&fit=crop&auto=format"
                  alt={t("titlePre")}
                  width={480}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* =========================
                ACCENT TAG
            ========================== */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#6F42C1] text-[#F5F5F7] rounded-2xl px-5 py-3 shadow-lg z-10">
              <p
                className="text-xs text-center font-normal"
                style={{ fontFamily: "Aileron, sans-serif" }}
              >
                {t("tag.label")}
              </p>

              <p
                className="text-sm text-center font-bold"
                style={{ fontFamily: "Aileron, sans-serif" }}
              >
                {t("tag.title")}
              </p>
            </div>
          </div>

          {/* =========================
              TEXT CONTENT
          ========================== */}
          <div className="flex flex-col gap-7">

            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#6F42C1]" />

              <span
                className="text-xs text-[#6F42C1] tracking-[0.2em] uppercase font-semibold"
                style={{ fontFamily: "Aileron, sans-serif" }}
              >
                {t("eyebrow")}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-[clamp(2rem,4vw,3.2rem)] text-[#1E1E1E] leading-[1.08] tracking-[-0.02em] font-black"
              style={{ fontFamily: "Aileron, sans-serif" }}
            >
              {t("titlePre")}{" "}
              <span className="text-[#6F42C1] font-semibold">
                {t("titleHighlight")}
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-[#1E1E1E]/60 text-lg leading-relaxed font-semibold"
              style={{ fontFamily: "Aileron, sans-serif" }}
            >
              {t("description")}
            </p>

            {/* Secondary description */}
            <p
              className="text-[#1E1E1E]/55 leading-relaxed font-semibold"
              style={{ fontFamily: "Aileron, sans-serif" }}
            >
              {t("descriptionSecondary")}
            </p>

            {/* =========================
                FEATURES
            ========================== */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-[#6F42C1]/10 flex items-center justify-center text-[#6F42C1] flex-shrink-0">
                    <IconCheck />
                  </div>

                  <span
                    className="text-sm text-[#1E1E1E]/70 font-semibold"
                    style={{ fontFamily: "Aileron, sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* =========================
                BRAND FOOTER
            ========================== */}
            <div className="flex items-center gap-4 pt-2">
              <Image
                src="/f5LogoHnegro.png"
                alt="F5 Studio"
                width={100}
                height={28}
                className="h-full w-auto object-contain opacity-80"
              />

              <div className="w-px h-6 bg-[#1E1E1E]/15" />

              <p
                className="text-[#1E1E1E]/45 text-sm font-semibold"
                style={{ fontFamily: "Aileron, sans-serif" }}
              >
                {t("footerTagline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}