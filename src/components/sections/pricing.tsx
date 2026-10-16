import { Check } from "lucide-react";
import { ALL_FEATURES_NOTE, LARGER_FLEET_NOTE, PLACEHOLDER_NOTE, PLANS, PRICE_NOTE, PRICING_IS_PLACEHOLDER, formatPrice } from "@/content/pricing";
import { SITE, TRIAL } from "@/content/site";
import { Button, Container } from "../ui/primitives";

/** Preise: drei ruhige Tarife, Business dunkel mit goldener Kante als Empfehlung. Werte aus content/pricing.ts. */
export function Pricing() {
  return (
    <section id="preise" aria-labelledby="pricing-title" className="scroll-mt-16 bg-warm py-24 lg:py-32">
      <Container wide>
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <p className="label">Preise</p>
          <h2 id="pricing-title" className="display mt-5 text-[clamp(2.3rem,4.6vw,3.7rem)]">Ein Preis nach Flottengröße.</h2>
          <p className="lead mx-auto mt-6 max-w-lg">{ALL_FEATURES_NOTE} Du zahlst nur für die Größe deiner Flotte.</p>
        </div>

        <ul className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p) => {
            const dark = !!p.recommended;
            return (
              <li
                key={p.id}
                data-reveal
                className={`relative flex flex-col rounded-[16px] p-8 sm:p-10 ${dark ? "on-dark bg-night text-white shadow-[0_40px_80px_-30px_rgb(11_13_15/0.55)] ring-1 ring-gold-400/60 lg:-my-4 lg:py-14" : "bg-white ring-1 ring-line"}`}
              >
                {dark && <span className="label label-dark absolute top-7 right-8">Empfohlen</span>}
                <h3 className={`text-[1.5rem] font-bold tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}>{p.name}</h3>
                <p className={`mt-1 text-sm ${dark ? "text-white/55" : "text-ink-3"}`}>{p.tagline}</p>
                <p className={`mt-9 text-[13px] font-semibold tracking-[0.12em] uppercase ${dark ? "text-gold-300" : "text-gold-600"}`}>bis {p.vehicleLimit} Fahrzeuge</p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className={`text-[3.4rem] leading-none font-bold tracking-[-0.05em] tabular-nums ${dark ? "text-white" : "text-ink"}`}>{formatPrice(p.pricePerMonth)}</span>
                  <span className={`text-sm ${dark ? "text-white/55" : "text-ink-3"}`}>/ Monat</span>
                </p>
                <p className={`mt-7 flex items-center gap-2.5 border-t pt-5 text-sm ${dark ? "border-white/10 text-white/80" : "border-line text-ink-2"}`}>
                  <Check aria-hidden className={`size-4 ${dark ? "text-gold-300" : "text-gold-500"}`} strokeWidth={2.25} />
                  Alle Funktionen inklusive
                </p>
                <div className="mt-auto pt-9">
                  <Button href={TRIAL.href} variant={dark ? "gold" : "secondary"} size="lg" arrow={dark} className="w-full" aria-label={`${TRIAL.label}: Tarif ${p.name}, bis ${p.vehicleLimit} Fahrzeuge`}>
                    {TRIAL.label}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 text-sm text-ink-3 sm:flex-row sm:justify-between">
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
