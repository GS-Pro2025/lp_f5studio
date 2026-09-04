"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Si tu logo está en public/logo-white.svg, usa esa ruta directa en el src del Image.

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Inicio", "Nosotros", "Servicios", "Proyectos", "Contacto"];

  const sectionIds: Record<string, string> = {
    Inicio: "hero",
    Nosotros: "about",
    Servicios: "services",
    Proyectos: "portfolio",
    Contacto: "contact",
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? "bg-[#1E1E1E]/90 border-b border-white/5 "
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center">
          <Image 
            src="/f5LogoHblanco.png" 
            alt="F5 Studio" 
            width={120} 
            height={50} 
            className="h-auto w-full object-contain" 
            priority
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(sectionIds[link])}
              className="text-[#F5F5F7]/70 hover:text-[#F5F5F7] text-sm font-normal tracking-wide transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA Desktop */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-2 bg-[#6F42C1] hover:bg-[#5a369e] text-[#F5F5F7] px-5 py-2.5 rounded-full text-sm font-normal tracking-wide transition-colors"
        >
          Comenzar Proyecto
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#F5F5F7]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu (Animado) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#1E1E1E]/98 border-t border-white/5 px-6 py-6 flex flex-col gap-4 transition-all duration-300 origin-top backdrop-blur-lg ${
          menuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(sectionIds[link])}
            className="text-[#F5F5F7]/80 hover:text-[#F5F5F7] text-base font-normal text-left transition-colors py-2"
          >
            {link}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="bg-[#6F42C1] hover:bg-[#5a369e] text-[#F5F5F7] px-5 py-3 rounded-full text-sm font-normal mt-2 transition-colors text-center"
        >
          Comenzar Proyecto
        </button>
      </div>
    </nav>
  );
}