// app/[locale]/page.tsx
import { Hero } from "../components/Hero";
import AboutSection from "../components/About";
import ServicesSection from "../components/Services";
import PortfolioSection from "../components/Projects";
import { ContactSection } from "../components/ContactUs";


export default function Page() {
  return (
    <>
      <Hero />
      <AboutSection/>
      <ServicesSection/>
      <PortfolioSection/>
      <ContactSection/>
    </>
  );
}