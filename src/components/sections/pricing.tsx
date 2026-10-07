import { ALL_FEATURES_NOTE, LARGER_FLEET_NOTE, PLACEHOLDER_NOTE, PLANS, PRICE_NOTE, PRICING_IS_PLACEHOLDER, formatPrice } from "@/content/pricing";
import { SITE, TRIAL } from "@/content/site";
import { Button, Container, SectionHead } from "../ui/primitives";

/** Preise als ruhige Tabelle mit Haarlinien statt dreier Werbekarten. Business mit goldener Kante hervorgehoben. */
export function Pricing() {
  return (
    <section id="preise" aria-labelledby="pricing-title" className="scroll-mt-16 bg-warm py-24 lg:py-36">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead id="pricing-title" no="09" label="Preise" title={<>Ein Preis nach<br />Flottengröße.</>} />
          <p className="lead max-w-md lg:justify-self-end lg:pb-3" data-reveal>
            {ALL_FEATURES_NOTE} Du zahlst nur für die Größe deiner Flotte.
          </p>
        </div>

        <ul className="mt-16 grid border-t border-ink lg:mt-20 lg:grid-cols-3" data-reveal>
          {PLANS.map((p, i) => (
            <li key={p.id} className={`relative flex flex-col px-0 py-10 lg:px-10 ${i > 0 ? "border-t border-line lg:border-t-0 lg:border-l" : ""} ${p.recommended ? "lg:bg-warm-2" : ""}`}>
              {p.recommended && <span aria-hidden className="absolute -top-px right-0 left-0 h-[3px] bg-gold-400" />}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{p.name}</h3>
                {p.recommended && <span className="label">Empfohlen</span>}
              </div>
              <p className="mt-1 text-sm text-ink-3">{p.tagline}</p>
              <p className="mt-10 font-mono text-[0.75rem] tracking-[0.12em] text-ink-3 uppercase">bis {p.vehicleLimit} Fahrzeuge</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-[3.6rem] leading-none font-semibold tracking-[-0.05em] text-ink tabular-nums">{formatPrice(p.pricePerMonth)}</span>
                <span className="text-sm text-ink-3">/ Monat</span>
              </p>
              <p className="mt-6 border-t border-line pt-4 text-sm text-ink-2">Alle Funktionen inklusive</p>
              <div className="mt-8">
                <Button href={TRIAL.href} variant={p.recommended ? "primary" : "secondary"} size="lg" arrow={p.recommended} className="w-full" aria-label={`${TRIAL.label}: Tarif ${p.name}, bis ${p.vehicleLimit} Fahrzeuge`}>
                  {TRIAL.label}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:justify-between">
          <p>
            {PRICE_NOTE}
            {PRICING_IS_PLACEHOLDER && <> {PLACEHOLDER_NOTE}</>}
          </p>
          <p>
            {LARGER_FLEET_NOTE.split("?")[0]}?{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-ink underline decoration-gold-300 underline-offset-4 hover:decoration-gold-600">Sprich uns an</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
