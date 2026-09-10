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
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-between overflow-hidden pt-24 pb-12"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blob-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full blob-drift pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.25) 0%, transparent 60%)",
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
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.04,

          // La cuadrícula se desvanece hacia abajo
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)",
        }}
      />

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center my-auto w-full">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 fade-in-up">
            <span className="text-sm font-normal tracking-[0.2em] uppercase text-[#6F42C1] px-3 py-1.5">
              {t("kicker")}
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-[#F5F5F7] fade-in-up delay-200 font-black">
            <span className="text-[#6F42C1]">{t("titleLine1")}</span>{" "}
            {t("titleLine2")}
          </h1>

          <p className="text-[#F5F5F7]/55 text-lg leading-relaxed max-w-[520px] fade-in-up delay-400 font-light">
            {t("description")}
          </p>

          <div className="mt-2 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-5 py-3 text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#F5F5F7] sm:text-xs">
            <span>Desarrollo de software</span>
            <span className="text-[#6F42C1]">·</span>
            <span>Diseño</span>
            <span className="text-[#6F42C1]">·</span>
            <span>Marketing digital</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 fade-in-up delay-600">
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2.5 bg-[#6F42C1] hover:bg-[#5a369e] text-[#F5F5F7] px-7 py-4 rounded-xl text-base btn-primary glow-purple transition-colors font-normal cursor-pointer"
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
              className="flex items-center gap-2.5 text-[#F5F5F7]/70 hover:text-[#F5F5F7] px-7 py-4 rounded-xl text-base border border-white/10 hover:border-white/25 transition-all duration-300 font-light cursor-pointer"
            >
              {t("ctaSecondary")}
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex justify-center items-center float-up">
          {/* Spinning rings */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#6F42C1]/15 spin-slow pointer-events-none" />
          <div
            className="absolute w-[320px] h-[320px] rounded-full border border-[#6F42C1]/10 pointer-events-none"
            style={{ animation: "spin-slow 30s linear infinite reverse" }}
          />

          {/* 3D tilt image wrapper */}
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
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 opacity-40 pointer-events-none mt-6">
        <p className="text-[#F5F5F7] text-xs tracking-widest uppercase font-light">
          {t("scroll")}
        </p>
        <div className="w-px h-8 bg-gradient-to-b from-[#F5F5F7] to-transparent" />
      </div>

      {/* Stats gigantes distribuidas a todo el ancho */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-14 pb-8 border-t border-white/10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between w-full">
          {stats.map(({ n, l }) => (
            <div key={l} className="flex flex-col">
              <p className="text-6xl md:text-7xl lg:text-8xl text-[#F5F5F7] font-black tracking-tighter">
                {n}
              </p>
              <p className="text-base md:text-lg text-[#F5F5F7]/50 mt-3 font-light tracking-wide">
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Degradado para oscurecer la parte inferior hacia negro/tono oscuro */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent pointer-events-none z-0" />
    </section>
  );
}
