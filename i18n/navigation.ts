import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Hooks y componentes conscientes del idioma actual, generados a partir
// de tu routing.ts (mismos locales, mismo defaultLocale).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);