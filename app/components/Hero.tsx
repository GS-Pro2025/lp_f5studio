"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

/**
 * Hook para animar un elemento cada vez que entra o sale del viewport.
 * A diferencia de un "reveal" de una sola vez, aquí NO desconectamos el
 * observer: el estado alterna true/false, así que si el usuario sube el
 * scroll y el elemento vuelve a aparecer, la animación se repite.
 */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Alterna en ambos sentidos: entra -> true, sale -> false.
        // Así vuelve a animarse tanto al bajar como al subir el scroll.
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, reducedMotion };
}

/**
 * Cuenta desde 0 hasta "target" con una desaceleración tipo tacómetro
 * (arranca rápido y se asienta al final). Se reinicia cada vez que
 * "active" pasa a false, así que vuelve a correr cada vez que el bloque
 * de estadísticas reaparece en pantalla.
 */
function useCountUp(
  target: number,
  active: boolean,
  {
    duration = 1800,
    delay = 0,
    reducedMotion = false,
  }: { duration?: number; delay?: number; reducedMotion?: boolean } = {}
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return;
    }

    if (!active) {
      setValue(0);
      return;
    }

    let rafId: number;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cúbico: arranca rápido, como una aguja de tacómetro
      // que sube de golpe y se asienta suave en el valor final.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    const timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [active, target, duration, delay, reducedMotion]);

  return value;
}

/**
 * Separa un texto como "+50" o "100%" en prefijo / número / sufijo,
 * para animar solo la parte numérica y conservar los símbolos.
 */
function AnimatedStatNumber({
  raw,
  active,
  delay,
  reducedMotion,
}: {
  raw: string;
  active: boolean;
  delay: number;
  reducedMotion: boolean;
}) {
  const match = raw.match(/^([^\d]*)(\d+)([^\d]*)$/);
  const target = match ? parseInt(match[2], 10) : 0;
  const value = useCountUp(target, active, { delay, reducedMotion });

  if (!match) {
    // Si el texto no trae un número (caso raro), lo mostramos tal cual.
    return <>{raw}</>;
  }

  return (
    <>
      {match[1]}
      {value}
      {match[3]}
    </>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [canTilt, setCanTilt] = useState(false);

  const statsInView = useInView<HTMLDivElement>(0.3);
  const heroContentInView = useInView<HTMLDivElement>(0.15);

  // El efecto de tilt 3D solo tiene sentido con mouse fino (desktop).
  // En touch/mobile lo desactivamos para no interferir con el scroll.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setCanTilt(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanTilt(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
    if (!canTilt) return;
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
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-between overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12"
    >
      {/* Blobs ambientales — tamaño reducido en móvil para no saturar */}
      <div
        className="absolute top-[-10%] right-[-15%] sm:right-[-5%] w-[380px] h-[380px] sm:w-[700px] sm:h-[700px] rounded-full hero-blob pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[-10%] left-[-15%] sm:left-[-8%] w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full hero-blob pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.25) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none hero-blob-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(111,66,193,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Textura de grilla */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)",
        }}
      />

      {/* Contenido principal */}
      <div
        ref={heroContentInView.ref}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center my-auto w-full"
      >
        {/* Texto */}
        <div className="flex flex-col gap-6 sm:gap-8 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
          <span
            className={`hero-reveal ${heroContentInView.inView ? "hero-reveal-in" : ""} text-sm font-normal tracking-[0.2em] uppercase text-[#6F42C1]`}
            style={{ animationDelay: "0ms" }}
          >
            {t("kicker")}
          </span>

          <h1
            className={`hero-reveal ${heroContentInView.inView ? "hero-reveal-in" : ""} text-[clamp(2.2rem,8vw,5.2rem)] leading-[1.05] tracking-[-0.02em] text-[#F5F5F7] font-black`}
            style={{ animationDelay: "150ms" }}
          >
            <span className="text-[#6F42C1]">{t("titleLine1")}</span>{" "}
            {t("titleLine2")}
          </h1>

          <p
            className={`hero-reveal ${heroContentInView.inView ? "hero-reveal-in" : ""} text-[#F5F5F7]/55 text-base sm:text-lg leading-relaxed max-w-[520px] font-light`}
            style={{ animationDelay: "320ms" }}
          >
            {t("description")}
          </p>

          <div
            className={`hero-reveal ${heroContentInView.inView ? "hero-reveal-in" : ""} mt-1 sm:mt-2 inline-flex max-w-full flex-wrap justify-center lg:justify-start items-center gap-x-3 gap-y-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 text-[0.6rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#F5F5F7]`}
            style={{ animationDelay: "480ms" }}
          >
            <span>Desarrollo de software</span>
            <span className="text-[#6F42C1]">·</span>
            <span>Diseño</span>
            <span className="text-[#6F42C1]">·</span>
            <span>Marketing digital</span>
          </div>

          <div
            className={`hero-reveal ${heroContentInView.inView ? "hero-reveal-in" : ""} flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 w-full`}
            style={{ animationDelay: "640ms" }}
          >
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2.5 bg-[#6F42C1] hover:bg-[#5a369e] active:scale-[0.97] text-[#F5F5F7] px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 font-normal cursor-pointer"
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
              className="flex items-center gap-2.5 text-[#F5F5F7]/70 hover:text-[#F5F5F7] active:scale-[0.97] px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-sm sm:text-base border border-white/10 hover:border-white/25 transition-all duration-300 font-light cursor-pointer"
            >
              {t("ctaSecondary")}
            </button>
          </div>
        </div>

        {/* Visual */}
        <div
          className={`relative flex justify-center items-center order-1 lg:order-2 hero-reveal-scale ${heroContentInView.inView ? "hero-reveal-scale-in" : ""}`}
          style={{ animationDelay: "200ms" }}
        >
          {/* Anillos giratorios — escalan con el tamaño de la imagen */}
          <div className="absolute w-[95%] h-[95%] max-w-[560px] max-h-[560px] aspect-square rounded-full border border-[#6F42C1]/8 hero-spin-slowest pointer-events-none" />
          <div className="absolute w-[70%] h-[70%] max-w-[420px] max-h-[420px] aspect-square rounded-full border border-[#6F42C1]/15 hero-spin pointer-events-none" />
          <div className="absolute w-[52%] h-[52%] max-w-[320px] max-h-[320px] aspect-square rounded-full border border-[#6F42C1]/10 hero-spin-reverse pointer-events-none" />

          {/* Wrapper con tilt 3D (solo desktop con mouse) */}
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px] xl:w-[520px] xl:h-[520px]"
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
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 520px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="relative z-10 flex flex-col items-center gap-2 opacity-40 pointer-events-none mt-4 sm:mt-6">
        <p className="text-[#F5F5F7] text-xs tracking-widest uppercase font-light">
          {t("scroll")}
        </p>
        <div className="w-px h-8 bg-gradient-to-b from-[#F5F5F7] to-transparent hero-scroll-bounce" />
      </div>

      {/* Estadísticas — se revelan al entrar en viewport */}
      <div
        ref={statsInView.ref}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full pt-10 sm:pt-14 pb-6 sm:pb-8 border-t border-white/10 mt-8 sm:mt-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 justify-between w-full text-center sm:text-left">
          {stats.map(({ n, l }, i) => (
            <div
              key={l}
              className={`flex flex-col items-center sm:items-start hero-stat ${
                statsInView.inView ? "hero-stat-in" : ""
              }`}
              style={{ animationDelay: statsInView.inView ? `${i * 120}ms` : "0ms" }}
            >
              <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F5F7] font-black tracking-tighter tabular-nums">
                <AnimatedStatNumber
                  raw={n}
                  active={statsInView.inView}
                  delay={i * 150}
                  reducedMotion={statsInView.reducedMotion}
                />
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#F5F5F7]/50 mt-2 sm:mt-3 font-light tracking-wide">
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent pointer-events-none z-0" />

      <style jsx global>{`
        /* --- Entrada de contenido: se dispara cada vez que el bloque
           entra en el viewport (bajando o subiendo el scroll), no solo
           al cargar la página. El estado "in" lo controla el hook
           useInView, que NO se desconecta tras la primera vez. --- */
        @keyframes hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(48px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes hero-fade-scale {
          from {
            opacity: 0;
            transform: translateY(48px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Estado de reposo: oculto hasta que se agregue la clase "-in" */
        .hero-reveal {
          opacity: 0;
          transform: translateY(48px);
        }
        .hero-reveal-in {
          animation: hero-fade-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-reveal-scale {
          opacity: 0;
          transform: translateY(48px) scale(0.9);
        }
        .hero-reveal-scale-in {
          animation: hero-fade-scale 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* --- Reveal de estadísticas al hacer scroll (también repetible) --- */
        .hero-stat {
          opacity: 0;
          transform: translateY(40px);
        }
        .hero-stat-in {
          animation: hero-fade-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* --- Movimiento ambiental continuo (blobs, anillos) --- */
        @keyframes hero-blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, 4%) scale(1.06); }
        }
        .hero-blob {
          animation: hero-blob-drift 22s ease-in-out infinite;
        }
        .hero-blob-reverse {
          animation: hero-blob-drift 26s ease-in-out infinite reverse;
        }

        @keyframes hero-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-spin {
          animation: hero-spin-slow 42s linear infinite;
        }
        .hero-spin-reverse {
          animation: hero-spin-slow 50s linear infinite reverse;
        }
        .hero-spin-slowest {
          animation: hero-spin-slow 65s linear infinite;
        }

        @keyframes hero-scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .hero-scroll-bounce {
          animation: hero-scroll-bounce 2.6s ease-in-out infinite;
        }

        /* Breakpoint extra chico para móviles muy angostos */
        @media (min-width: 380px) {
          .xs\\:w-\\[260px\\] { width: 260px; }
          .xs\\:h-\\[260px\\] { height: 260px; }
        }

        /* Respeta la preferencia del usuario de reducir animaciones */
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .hero-reveal-in,
          .hero-reveal-scale,
          .hero-reveal-scale-in,
          .hero-stat,
          .hero-stat-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .hero-blob,
          .hero-blob-reverse,
          .hero-spin,
          .hero-spin-reverse,
          .hero-spin-slowest,
          .hero-scroll-bounce {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}