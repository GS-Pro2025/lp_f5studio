"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  /** Retraso antes de iniciar la animación, en ms. */
  delay?: number;
  /** Duración de la animación, en ms. Por defecto es lenta y suave. */
  duration?: number;
  /** Desde qué lado entra el contenido. */
  from?: Direction;
  /** Qué tan visible debe estar el elemento para disparar la animación (0–1). */
  threshold?: number;
  className?: string;
};

const OFFSETS: Record<Direction, string> = {
  up: "translateY(40px)",
  down: "translateY(-40px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
};

/**
 * Envuelve cualquier contenido y lo anima al entrar en el viewport.
 * Se repite cada vez que el elemento entra o sale de pantalla (subiendo
 * o bajando el scroll), porque el observer nunca se desconecta.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 1000,
  from = "up",
  threshold = 0.2,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
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
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0, 0)" : OFFSETS[from],
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}