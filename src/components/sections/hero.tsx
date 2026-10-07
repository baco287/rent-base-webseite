import { Check } from "lucide-react";
import { TRIAL, TRUST_POINTS } from "@/content/site";
import { WhatsAppLink } from "../ui/whatsapp";
import { Button, Container } from "../ui/primitives";
import { DashboardScreen } from "../mockups/desktop-screens";
import { PhoneSignature, TabletDamage } from "../mockups/device-screens";

/**
 * Erster Bildschirm auf dunklem Grund: Schwarz und Gold aus dem Logo, der goldene Lichtstreif als ruhiges Hintergrundmotiv.
 * Das Logo selbst steht unverändert in der hellen Navigation darüber.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-white">
      {/* Hintergrund: warmes Goldlicht oben rechts und ein feiner Lichtstreif, angelehnt an den Schwung im Logo */}
      <div aria-hidden className="absolute -top-[30%] right-[-10%] -z-10 h-[90%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(201_169_121/0.22),transparent)]" />
      <div aria-hidden className="absolute bottom-[-20%] left-[-15%] -z-10 h-[60%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgb(144_108_60/0.16),transparent)]" />
      <div aria-hidden className="hero-streak absolute top-[58%] left-[-10%] -z-10 h-px w-[120%]" />

      <Container className="grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div className="text-center lg:text-left">
          <p className="eyebrow text-gold-300">Software für Fahrzeugvermieter</p>
          <h1 id="hero-title" className="display mt-5 text-[2.9rem] text-white sm:text-[4rem] lg:text-[3.9rem] xl:text-[4.4rem]">
            Deine Vermietung.
            <br />
            <span className="text-gold-300">Ein System.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-lg lg:mx-0">
            Buchungen, Fahrzeuge, Kunden, Übergaben, Rückgaben und Abrechnung in einer Plattform. Vom ersten Kundenkontakt bis zur fertigen Rechnung.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href={TRIAL.href} variant="light" size="lg" arrow className="w-full sm:w-auto">{TRIAL.label}</Button>
            <WhatsAppLink variant="button" className="w-full justify-center border-white/25 text-white hover:border-white/60 hover:bg-white/5 sm:w-auto" />
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60 lg:justify-start">
            {TRUST_POINTS.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check aria-hidden className="size-4 text-gold-300" strokeWidth={2.25} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Produkt sofort sichtbar: Verwaltung am Desktop, Übergabe auf Tablet und Smartphone */}
        <div className="relative lg:-mr-[14%]" data-reveal>
          <div className="hidden sm:block sm:pr-[6%] lg:pr-0">
            <DashboardScreen />
          </div>
          <div className="relative w-[88%] sm:absolute sm:bottom-[-10%] sm:left-[-4%] sm:w-[48%] lg:left-[-2%]">
            <TabletDamage />
          </div>
          <div className="absolute right-0 bottom-[-6%] w-[34%] sm:right-[2%] sm:bottom-[-14%] sm:w-[17%] lg:right-[8%]">
            <PhoneSignature />
          </div>
        </div>
      </Container>
    </section>
  );
}
