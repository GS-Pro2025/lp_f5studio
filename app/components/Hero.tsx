"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

export function Hero() {
  const t = useTranslations("Hero");
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { n: t("stats.projects.number"), l: t("stats.projects.label") },
    { n: t("stats.experience.number"), l: t("stats.experience.label") },
    { n: t("stats.satisfaction.number"), l: t("stats.satisfaction.label") },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rango máximo de inclinación en grados
    const maxTilt = 18;

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    setTilt({ rotateX, rotateY, scale: 1.05 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#1E1E1E] flex items-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blob-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.12) 0%, transparent 70%)",
          animation: "blob-drift 16s ease-in-out infinite reverse",
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center mt-5">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 fade-in-up">
            <span className="text-xs font-normal tracking-[0.2em] uppercase text-[#6F42C1] border border-[#6F42C1]/30 px-3 py-1.5 rounded-xl">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-[#F5F5F7] fade-in-up delay-200 font-black font-semibold">
            {t("titlePre")}{" "}
            <span className="text-[#6F42C1] font-semibold">
              {t("titleHighlight")}
            </span>{" "}
            {t("titlePost")}
          </h1>

          <p className="text-[#F5F5F7]/55 text-lg leading-relaxed max-w-[520px] fade-in-up delay-400 font-light ">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-4 fade-in-up delay-600">
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2.5 bg-[#6F42C1] hover:bg-[#5a369e] text-[#F5F5F7] px-7 py-4 rounded-xl text-base btn-primary glow-purple transition-colors font-normal"
            >
              {t("ctaPrimary")}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              onClick={scrollToPortfolio}
              className="flex items-center gap-2.5 text-[#F5F5F7]/70 hover:text-[#F5F5F7] px-7 py-4 rounded-xl text-base border border-white/10 hover:border-white/25 transition-all duration-300 font-light"
            >
              {t("ctaSecondary")}
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4 fade-in-up delay-800">
            {stats.map(({ n, l }) => (
              <div key={l}>
                <p className="text-2xl text-[#F5F5F7] font-Semibold">{n}</p>
                <p className="text-xs text-[#F5F5F7]/40 mt-0.5 font-light">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex justify-center items-center float-up">
          {/* Spinning ring */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#6F42C1]/15 spin-slow" />
          <div
            className="absolute w-[320px] h-[320px] rounded-full border border-[#6F42C1]/10"
            style={{ animation: "spin-slow 30s linear infinite reverse" }}
          />

          {/* Imagen principal con efecto 3D tilt */}
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-[520px] h-[520px]"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src="/f5Logo3d.png"
                alt="F5 Studio"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Badge flotante (marca) */}
          <div className="absolute bottom-8 -right-6 glass-dark rounded-2xl p-3 flex items-center gap-2.5 z-20">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image
                src="/logo-white.svg"
                alt="F5"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[#F5F5F7] text-xs font-Semibold">
                {t("badges.brand.title")}
              </p>
              <p className="text-[#6F42C1] text-xs font-light">
                {t("badges.brand.status")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <p className="text-[#F5F5F7] text-xs tracking-widest uppercase font-light">
          {t("scroll")}
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-[#F5F5F7] to-transparent" />
      </div>
    </section>
  );
}
