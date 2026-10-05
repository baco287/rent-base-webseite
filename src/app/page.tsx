import { SITE } from "@/content/site";
import { FAQ } from "@/content/faq";
import { BenefitBar, Hero } from "@/components/sections/hero";
import { CentralRecord, Process } from "@/components/sections/process";
import { Features, MobileHandover } from "@/components/sections/features";
import { Audience, Comparison } from "@/components/sections/audience";
import { Protocol } from "@/components/sections/protocol";
import { Deposit } from "@/components/sections/deposit";
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
      <BenefitBar />
      <Process />
      <CentralRecord />
      <Features />
      <MobileHandover />
      <Protocol />
      <Deposit />
      <Audience />
      <Comparison />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
