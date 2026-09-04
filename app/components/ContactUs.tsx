"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const t = useTranslations("Contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const socialLinks = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 .774 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Dribbble",
      href: "#",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zM2.673 12.012A9.32 9.32 0 0012 21.327a9.262 9.262 0 004.992-1.458c-.378-.93-1.178-2.611-3.14-3.32-.472.23-1.233.564-2.126.564-2.28 0-4.08-1.528-4.144-1.577a.64.64 0 01-.013-.918.639.639 0 01.916-.011c.018.016 1.493 1.23 3.367 1.23.832 0 1.542-.313 1.954-.509-2.05-.694-2.482-2.186-2.585-2.613-3.666 1.168-6.938 1.127-7.235 1.123h-.007a.637.637 0 01-.62-.647c.005-.353.29-.636.643-.635.297.004 3.328.03 6.699-.99-.54-1.286-1.179-2.435-1.593-3.146a16.892 16.892 0 00-4.707 1.408c-.754 3.033-.162 6.002.274 7.14zm13.123-5.381c.961.565 2.124 1.56 2.822 2.766a9.356 9.356 0 00-1.636-6.425c-1.397.683-3.218 1.431-4.836 1.83.921 1.096 2.457 1.536 3.65 1.829z" />
        </svg>
      ),
    },
  ];

  const footerLinks = [
    { key: "home", href: "#hero" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "portfolio", href: "#portfolio" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <section
      id="contact"
      className="bg-[#6F42C1] py-28 relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F5F7 1px, transparent 1px), linear-gradient(90deg, #F5F5F7 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-7">

            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#F5F5F7]/40" />

              <span className="text-xs text-[#F5F5F7]/60 tracking-[0.2em] uppercase font-normal">
                {t("eyebrow")}
              </span>
            </div>

            <h2 className="text-[clamp(2rem,4vw,3.4rem)] text-[#F5F5F7] leading-[1.06] tracking-[-0.02em] font-black">
              {t("title")}
            </h2>

            <p className="text-[#F5F5F7]/60 text-lg leading-relaxed font-light">
              {t("description")}
            </p>

            {/* Emails */}
            <div className="flex flex-col gap-4 pt-2">
              <div>
                <p className="text-[#F5F5F7]/40 text-xs uppercase tracking-widest mb-1 font-light">
                  {t("emails.generalLabel")}
                </p>

                <a
                  href="mailto:hola@f5studio.com"
                  className="text-[#F5F5F7] hover:text-[#F5F5F7]/80 transition-colors font-normal"
                >
                  hola@f5studio.com
                </a>
              </div>

              <div>
                <p className="text-[#F5F5F7]/40 text-xs uppercase tracking-widest mb-1 font-light">
                  {t("emails.projectsLabel")}
                </p>

                <a
                  href="mailto:proyectos@f5studio.com"
                  className="text-[#F5F5F7] hover:text-[#F5F5F7]/80 transition-colors font-normal"
                >
                  proyectos@f5studio.com
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#F5F5F7]/20 flex items-center justify-center text-[#F5F5F7]/60 hover:text-[#F5F5F7] hover:border-[#F5F5F7]/50 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#F5F5F7]/10 border border-[#F5F5F7]/10 rounded-3xl p-8 backdrop-blur-sm">

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">

                <div className="w-14 h-14 bg-[#F5F5F7]/15 rounded-full flex items-center justify-center text-[#F5F5F7] text-2xl">
                  ✓
                </div>

                <h3 className="text-[#F5F5F7] text-2xl font-bold">
                  {t("success.title")}
                </h3>

                <p className="text-[#F5F5F7]/60 font-light">
                  {t("success.description")}
                </p>

                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      project: "",
                    });
                  }}
                  className="text-[#F5F5F7]/60 text-sm hover:text-[#F5F5F7] transition-colors"
                >
                  {t("success.button")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <h3 className="text-[#F5F5F7] text-xl mb-2 font-bold">
                  {t("form.title")}
                </h3>

                {/* Name */}
                <div>
                  <label className="text-[#F5F5F7]/60 text-xs tracking-wide uppercase block mb-2 font-light">
                    {t("form.nameLabel")}
                  </label>

                  <input
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-[#F5F5F7]/10 border border-[#F5F5F7]/15 rounded-xl px-4 py-3.5 text-[#F5F5F7] text-sm outline-none focus:border-[#F5F5F7]/40 transition-colors font-light"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[#F5F5F7]/60 text-xs tracking-wide uppercase block mb-2 font-light">
                    {t("form.emailLabel")}
                  </label>

                  <input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-[#F5F5F7]/10 border border-[#F5F5F7]/15 rounded-xl px-4 py-3.5 text-[#F5F5F7] text-sm outline-none focus:border-[#F5F5F7]/40 transition-colors font-light"
                  />
                </div>

                {/* Project */}
                <div>
                  <label className="text-[#F5F5F7]/60 text-xs tracking-wide uppercase block mb-2 font-light">
                    {t("form.projectLabel")}
                  </label>

                  <textarea
                    placeholder={t("form.projectPlaceholder")}
                    required
                    rows={4}
                    value={form.project}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        project: e.target.value,
                      })
                    }
                    className="w-full bg-[#F5F5F7]/10 border border-[#F5F5F7]/15 rounded-xl px-4 py-3.5 text-[#F5F5F7] text-sm outline-none focus:border-[#F5F5F7]/40 transition-colors resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E1E1E] text-[#F5F5F7] py-4 rounded-xl text-sm flex items-center justify-center gap-2.5 hover:bg-[#2a2a2a] transition-all duration-300 btn-primary mt-1 font-normal"
                >
                  {t("form.submit")}

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
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-[#F5F5F7]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <Image
              src="/logo-white.svg"
              alt="F5 Studio"
              width={100}
              height={32}
              className="h-8 w-auto object-contain opacity-80"
            />

            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-[#F5F5F7]/50 hover:text-[#F5F5F7]/90 text-sm transition-colors font-light"
                >
                  {t(`footer.links.${link.key}`)}
                </a>
              ))}
            </div>
          </div>

          <p className="text-center text-[#F5F5F7]/30 text-xs mt-8 font-light">
            © {new Date().getFullYear()} F5 Studio.{" "}
            {t("footer.rights")} · {t("footer.tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}

