import { Check } from "lucide-react";
import { PLACEHOLDER_NOTE, PLANS, PRICE_NOTE, PRICING_IS_PLACEHOLDER, formatPrice, visibleFeatures } from "@/content/pricing";
import { TRIAL } from "@/content/site";
import { Button, Container, SectionHeader } from "../ui/primitives";

export function Pricing() {
  return (
    <section id="preise" aria-labelledby="pricing-title" className="scroll-mt-20 border-y border-line bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeader id="pricing-title" align="center" eyebrow="Preise" title="Klare Tarife nach Flottengröße." text="Der Tarif richtet sich nach der Größe deiner Flotte. Digitale Verträge, Übergabe, Rückgabe und Rechnungen sind in jedem Tarif enthalten." />
        <ul className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-0">
          {PLANS.map((p) => (
            <li
              key={p.id}
              data-reveal
              className={`relative flex flex-col bg-white p-8 ${p.recommended ? "z-10 rounded-lg border border-gold-500 shadow-lift lg:-my-4 lg:py-12" : "rounded-lg border border-line lg:rounded-none lg:first:rounded-l-lg lg:last:rounded-r-lg lg:[&:not(:first-child)]:border-l-0"}`}
            >
              {p.recommended && <span className="eyebrow absolute -top-3 left-8 bg-white px-2 text-[11px]">Empfohlen</span>}
              <h3 className="font-serif text-[1.75rem] font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-3">{p.tagline}</p>
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[2.6rem] leading-none font-semibold tracking-tight text-ink">{formatPrice(p.pricePerMonth)}</span>
                <span className="text-sm text-ink-3">/ Monat</span>
              </p>
              <p className="mt-2 text-sm font-medium text-ink">bis {p.vehicleLimit} Fahrzeuge</p>
              <div className="gold-rule my-6" />
              {p.includes && <p className="mb-3 text-sm font-medium text-ink">Alle {p.includes}-Funktionen, plus:</p>}
              <ul className="space-y-3">
                {visibleFeatures(p).map((f) => (
                  <li key={f.label} className="flex gap-3 text-sm text-ink-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={2.25} />
                    <span>
                      {f.label}
                      {f.status === "planned" && <span className="ml-2 text-xs text-ink-3">in Vorbereitung</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={TRIAL.href} variant={p.recommended ? "primary" : "secondary"} className="w-full" aria-label={`${TRIAL.label}: Tarif ${p.name}`}>
                  {TRIAL.label}
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center text-sm text-ink-3">
          <p>{PRICE_NOTE}</p>
          {PRICING_IS_PLACEHOLDER && <p className="mt-1">{PLACEHOLDER_NOTE}</p>}
        </div>
      </Container>
    </section>
  );
}
