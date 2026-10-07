import { SITE } from "@/content/site";
import { FAQ } from "@/content/faq";
import { Hero } from "@/components/sections/hero";
import { Record } from "@/components/sections/record";
import { Workflow } from "@/components/sections/workflow";
import { Handover } from "@/components/sections/handover";
import { Protocol } from "@/components/sections/protocol";
import { Connected } from "@/components/sections/connected";
import { Control } from "@/components/sections/control";
import { Capabilities } from "@/components/sections/capabilities";
import { OneSystem } from "@/components/sections/one-system";
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
      <Hero />
      <Record />
      <Workflow />
      <Handover />
      <Protocol />
      <Connected />
      <Control />
      <Capabilities />
      <OneSystem />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
