// app/[locale]/page.tsx
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services} from "../components/Services";
import { Projects } from "../components/Projects";
import { Contact} from "../components/ContactUs";
import { WhoWeAre } from "../components/WhoWeAre";
import { Footer } from "../components/Footer";


export default function Page() {
  return (
    <>
      <Hero />
      <About/>
      <Projects/>
      <Services/>
      <WhoWeAre/>
      <Contact/>
      <Footer/>
    </>
  );
}