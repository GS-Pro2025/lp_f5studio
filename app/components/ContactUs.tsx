"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Loader2, Mail, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { contactSchema } from "../lib/contact-schema";
import { useCountries } from "../hooks/use-countries";
import { Reveal } from "./Reveal";
import { cn } from "../lib/utils";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#1E1E1E]/60 px-4 py-3.5 text-base text-[#F5F5F7] placeholder:text-[#F5F5F7]/40 outline-none transition-colors focus:border-[#6F42C1] focus:ring-2 focus:ring-[#6F42C1]/40";

export function Contact() {
  const t = useTranslations("Contact");
  const { countries, mounted } = useCountries();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [countryCode, setCountryCode] = useState("CO");
  const [formError, setFormError] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (status !== "success") return;
    const t1 = window.setTimeout(() => setFading(true), 4200);
    const t2 = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStatus("idle");
      setFading(false);
    }, 5000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [status]);

  const country = countries.find((c) => c.code === countryCode) ?? countries[0];

  const errorMessages: Record<string, string> = {
    name_required: t("errors.name"),
    email_invalid: t("errors.email"),
    details_required: t("errors.details"),
    phone_required: t("errors.phone"),
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      details: String(fd.get("details") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      dialCode: country?.dial ?? "",
      country: country?.name ?? "",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] =
          errorMessages[issue.message] ?? issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      // Parámetros que se enviarán a la plantilla de EmailJS
      const templateParams = {
        name: parsed.data.name,
        email: parsed.data.email,
        details: parsed.data.details,
        phone: `${parsed.data.dialCode} ${parsed.data.phone}`,
        country: parsed.data.country,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
    } catch (error: any) {
  // Imprime la propiedad .text o .message de EmailJS
  console.error("EmailJS Error detallado:", error?.text || error?.message || error);
  setStatus("error");
  setFormError(t("errors.unexpected"));
}
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#1E1E1E] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-[#6F42C1]/12 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <h2 className="font-display text-3xl leading-[0.98] font-extrabold tracking-[-0.03em] text-[#F5F5F7] uppercase sm:text-5xl">
            {t("titlePre")}{" "}
            <span className="text-[#6F42C1]">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#F5F5F7]/55">
            {t("description")}
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { label: t("channels.general"), value: "contact@f5studiolab.com" },
              {
                label: t("channels.projects"),
                value: "projects@f5studiolab.com",
              },
            ].map((c) => (
              <div
                key={c.value}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <dt className="text-[0.6rem] font-bold tracking-[0.3em] text-[#6F42C1] uppercase">
                  {c.label}
                </dt>
                <dd className="mt-2 flex min-w-0 items-center gap-2 text-sm font-semibold text-[#F5F5F7]">
                  <Mail className="h-4 w-4 shrink-0 text-[#6F42C1]" />
                  <a
                    href={`mailto:${c.value}`}
                    className="truncate hover:text-[#6F42C1]"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="font-display text-xl font-extrabold tracking-tight text-[#F5F5F7] uppercase">
              {t("formTitle")}
            </h3>

            {status === "success" ? (
              <div
                className={cn(
                  "mt-8 flex flex-col items-center gap-4 py-10 text-center transition-all duration-700",
                  fading
                    ? "translate-y-2 opacity-0"
                    : "animate-fade-in opacity-100",
                )}
              >
                <div className="relative grid h-24 w-24 place-items-center">
                  <span
                    className="absolute inset-0 rounded-full border border-[#6F42C1]/50 success-ring"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-0 rounded-full bg-[#6F42C1]/20 blur-2xl"
                    aria-hidden
                  />
                  <Image
                    src="/f5LogosinfB.png"
                    alt=""
                    width={72}
                    height={72}
                    className="logo-intro relative w-16 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <CheckCircle2 className="h-8 w-8 animate-scale-in text-[#6F42C1]" />
                <p className="font-display text-2xl font-extrabold text-[#F5F5F7] uppercase">
                  {t("successTitle")}
                </p>
                <p className="max-w-sm text-sm text-[#F5F5F7]/55">
                  {t("successText")}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-[0.62rem] font-bold tracking-[0.25em] text-[#F5F5F7]/50 uppercase"
                  >
                    {t("fields.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={cn(
                      fieldClass,
                      "mt-2",
                      errors["name"] && "border-red-500",
                    )}
                    placeholder={t("placeholders.name")}
                  />
                  {errors["name"] && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors["name"]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[0.62rem] font-bold tracking-[0.25em] text-[#F5F5F7]/50 uppercase"
                  >
                    {t("fields.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={cn(
                      fieldClass,
                      "mt-2",
                      errors["email"] && "border-red-500",
                    )}
                    placeholder={t("placeholders.email")}
                  />
                  {errors["email"] && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors["email"]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="text-[0.62rem] font-bold tracking-[0.25em] text-[#F5F5F7]/50 uppercase"
                  >
                    {t("fields.details")}
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className={cn(
                      fieldClass,
                      "mt-2 resize-y",
                      errors["details"] && "border-red-500",
                    )}
                    placeholder={t("placeholders.details")}
                  />
                  {errors["details"] && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors["details"]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-[0.62rem] font-bold tracking-[0.25em] text-[#F5F5F7]/50 uppercase"
                  >
                    {t("fields.phone")}
                  </label>
                  <div className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                    <select
                      aria-label={t("countrySelectLabel")}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={!mounted}
                      suppressHydrationWarning
                      className={cn(fieldClass, "w-auto px-3")}
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      className={cn(
                        fieldClass,
                        errors["phone"] && "border-red-500",
                      )}
                      placeholder={t("placeholders.phone")}
                    />
                  </div>
                  {errors["phone"] && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors["phone"]}
                    </p>
                  )}
                </div>

                {formError && (
                  <p role="alert" className="text-sm text-red-500">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-[#6F42C1] px-8 py-4 text-sm font-bold tracking-widest text-[#F5F5F7] uppercase transition-all duration-300 hover:scale-[1.02] hover:glow-purple disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {t("submit")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}