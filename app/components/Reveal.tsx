"use client";

import type { ReactNode } from "react";
import { useReveal } from "../hooks/use-reveal";
import { cn } from "../lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "right";
  as?: "div" | "section" | "li" | "span";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <As
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        from === "right" ? "reveal-right" : "reveal",
        visible && (from === "right" ? "reveal-right-in" : "reveal-in"),
        className,
      )}
    >
      {children}
    </As>
  );
}