import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "../components/Navbar";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";

const aileron = localFont({
  src: [
    { path: "../../public/fonts/Aileron-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Aileron-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Aileron-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Aileron-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-aileron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F5 Studio Lab LLC",
  description:
    "F5 Studio Lab es un estudio creativo enfocado en el desarrollo de software, identidades visuales, experiencias digitales y marketing estratégico.",
  keywords: [
    "desarrollo de software",
    "marketing digital",
    "branding",
    "diseño web",
    "UI/UX",
    "F5 Studio",
    "agencia tecnológica",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${aileron.variable} scroll-smooth`}>
      <body className="relative min-h-screen antialiased bg-[#F5F5F7] text-[#1E1E1E]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            <video
              src="/preview.mp4"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="md:hidden relative w-full h-full">
              <video
                src="/previewM.mp4"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            </div>
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}