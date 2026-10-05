import { Check } from "lucide-react";
import { TRIAL, TRUST_POINTS } from "@/content/site";
import { BENEFITS } from "@/content/product";
import { Button, Container } from "../ui/primitives";
import { DashboardScreen } from "../mockups/desktop-screens";
import { PhoneSignature, TabletDamage } from "../mockups/device-screens";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* ruhiger, warmer Hintergrund aus dem Logo; keine Farbverläufe über die ganze Fläche */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[78%] bg-surface" />
      <Container className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Software für Fahrzeugvermieter</p>
          <h1 id="hero-title" className="display mt-5 text-[2.9rem] sm:text-[4rem] lg:text-[4.9rem]">
            Deine Vermietung.
            <br />
            Ein System.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2 sm:text-lg">
            RentBase verbindet Buchungen, Fahrzeuge, Kunden, Übergaben, Rückgaben und Abrechnung in einer zentralen Plattform. Vom ersten Kundenkontakt bis zur fertigen Rechnung.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={TRIAL.href} size="lg" arrow className="w-full sm:w-auto">{TRIAL.label}</Button>
            <Button href="#produkt" variant="secondary" size="lg" className="w-full sm:w-auto">RentBase entdecken</Button>
          </div>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-3">
            {TRUST_POINTS.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check aria-hidden className="size-4 text-gold-500" strokeWidth={2.25} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Produktdarstellung: Verwaltung am Desktop, Übergabe auf Tablet und Smartphone als ein System */}
        <div className="relative mx-auto mt-14 max-w-[1080px] sm:mt-16 lg:mt-20" data-reveal>
          <div className="lg:mx-[6%]">
            <DashboardScreen />
          </div>
          <div className="relative mx-auto -mt-[14%] w-[82%] sm:absolute sm:bottom-[-7%] sm:left-0 sm:mt-0 sm:w-[44%] lg:w-[40%]">
            <TabletDamage />
          </div>
          <div className="absolute right-[1%] bottom-[-9%] hidden w-[17%] sm:block lg:right-[2%] lg:w-[15%]">
            <PhoneSignature />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BenefitBar() {
  return (
    <section aria-labelledby="benefits-title" className="border-y border-line bg-white">
      <Container className="py-12 lg:py-14">
        <h2 id="benefits-title" className="text-center text-[15px] font-medium text-ink-2">
          Alles, was deine Vermietung braucht. <span className="text-ink">An einem Ort.</span>
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-line">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 px-4 text-center">
              <Icon aria-hidden className="size-5 text-gold-500" strokeWidth={1.6} />
              <span className="text-sm leading-snug text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
