"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { PhoneNumberUtil } from "google-libphonenumber";

export type Country = {
  code: string;
  flag: string;
  name: string;
  dial: string;
};

function flagFromCode(code: string) {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

const PRIORITY = ["CO", "MX", "US", "ES", "AR", "CL", "PE", "EC", "PA", "CR"];
const FALLBACK: Country[] = [{ code: "CO", flag: "🇨🇴", name: "Colombia", dial: "+57" }];

function buildCountries(locale: string): Country[] {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const regions = phoneUtil.getSupportedRegions();
  const displayNames = new Intl.DisplayNames([locale], { type: "region" });

  const list: Country[] = Array.from(regions)
    .map((region): Country | null => {
      const dialCode = phoneUtil.getCountryCodeForRegion(region);
      if (!dialCode) return null;
      const code = String(region);
      return {
        code,
        flag: flagFromCode(code),
        name: displayNames.of(code) ?? code,
        dial: `+${dialCode}`,
      };
    })
    .filter((c): c is Country => c !== null)
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  const priority: Country[] = [];
  for (const code of PRIORITY) {
    const match = list.find((c) => c.code === code);
    if (match) priority.push(match);
  }
  const rest = list.filter((c) => !PRIORITY.includes(c.code));

  return [...priority, ...rest];
}

export function useCountries() {
  const locale = useLocale();
  const [countries, setCountries] = useState<Country[]>(FALLBACK);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCountries(buildCountries(locale));
    setMounted(true);
  }, [locale]);

  return { countries, mounted };
}