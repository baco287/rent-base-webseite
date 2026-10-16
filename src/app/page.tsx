import { SITE } from "@/content/site";
import { FAQ } from "@/content/faq";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Handover } from "@/components/sections/handover";
import { Protocol } from "@/components/sections/protocol";
import { Control } from "@/components/sections/control";
import { OneSystem } from "@/components/sections/one-system";
import { Capabilities } from "@/components/sections/capabilities";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

// Strukturierte Daten: nur belegbare Angaben, keine Bewertungen oder Nutzerzahlen.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RentBase",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE.url,
    description: SITE.description,
    inLanguage: "de",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Collage-Raster nach dem Referenzbild: abgerundete Flächen, ab 1280 px zwei Flächen nebeneinander (8 + 4 Spalten) */}
      {/* Einstieg randlos über den ganzen Bildschirm */}
      <Hero />
      <div className="grid 2xl:grid-cols-12">
        {/* Jede Reihe ist ab 1536 px eine eigene, bildschirmfüllende „Seite“ */}
        <Story />
        <Protocol />
        <Handover />
        <Control />
        <OneSystem />
        <div className="2xl:col-span-12">
          <Capabilities />
        </div>
        <div className="2xl:col-span-12">
          <Pricing />
        </div>
        <div className="2xl:col-span-12">
          <Faq />
        </div>
        <div className="2xl:col-span-12">
          <FinalCta />
        </div>
      </div>
    </>
  );
}
