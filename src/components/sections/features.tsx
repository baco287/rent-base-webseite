import { Check } from "lucide-react";
import { HANDOVER_POINTS, MORE_FEATURES } from "@/content/product";
import { Container, SectionHeader } from "../ui/primitives";
import { ProductTour } from "./tour";
import { PhoneSignature, TabletReadings } from "../mockups/device-screens";

export function Features() {
  return (
    <section id="funktionen" aria-labelledby="features-title" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader id="features-title" eyebrow="Funktionen" title="Alles für den Vermietalltag." text="Von der Disposition bis zur Buchhaltung: RentBase deckt die Arbeit ab, die in einer Vermietung täglich anfällt, ohne dass du zwischen Programmen wechseln musst." />

        <ProductTour />

        <div className="mt-24 lg:mt-28">
          <h3 className="display text-[1.9rem] sm:text-[2.2rem]" data-reveal>Und vieles, was im Alltag den Unterschied macht.</h3>
          <ul className="mt-10 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {MORE_FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-r border-b border-line p-6 transition-colors duration-200 hover:bg-surface lg:p-7">
                <Icon aria-hidden className="size-5 text-gold-500" strokeWidth={1.6} />
                <h4 className="mt-4 text-[15px] font-semibold text-ink">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function MobileHandover() {
  return (
    <section aria-labelledby="mobile-title" className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader tone="dark" id="mobile-title" eyebrow="Digitale Übergabe & Rückgabe" title="Direkt am Fahrzeug arbeiten." text="Übergabe und Rückgabe erledigst du dort, wo sie stattfinden: direkt am Fahrzeug, auf Tablet oder Smartphone. Alles, was du erfasst, steht sofort im Vorgang am Desktop bereit." />
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2" data-reveal>
            {HANDOVER_POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-white/85">
                <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-300" strokeWidth={2.25} />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-l-2 border-gold-300 pl-4 text-sm leading-relaxed text-white/65" data-reveal>
            Bei der Rückgabe vergleicht RentBase mit dem Übergabeprotokoll und schlägt Mehrkilometer und Betankung vor. Das unterschriebene Protokoll wird als PDF abgelegt und kann per E-Mail versendet werden.
          </p>
        </div>
        <div className="relative pb-[6%]" data-reveal>
          <div aria-hidden className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(201_169_121/0.18),transparent)]" />
          <div className="w-[86%]">
            <TabletReadings />
          </div>
          <div className="absolute right-0 bottom-0 w-[30%]">
            <PhoneSignature />
          </div>
        </div>
      </Container>
    </section>
  );
}
