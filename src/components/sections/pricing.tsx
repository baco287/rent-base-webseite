import { Check } from "lucide-react";
import { ALL_FEATURES_NOTE, INCLUDED_FEATURES, LARGER_FLEET_NOTE, PLACEHOLDER_NOTE, PLANS, PRICE_NOTE, PRICING_IS_PLACEHOLDER, formatPrice } from "@/content/pricing";
import { SITE, TRIAL } from "@/content/site";
import { WhatsAppLink } from "../ui/whatsapp";
import { Button, Container, SectionHeader } from "../ui/primitives";

export function Pricing() {
  return (
    <section id="preise" aria-labelledby="pricing-title" className="scroll-mt-20 border-y border-line bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeader id="pricing-title" align="center" eyebrow="Preise" title="Alle Funktionen. Ein Preis nach Flottengröße." text="Du zahlst nur für die Größe deiner Flotte. Alle Funktionen sind derzeit in jedem Tarif enthalten, ohne Zusatzmodule." />

        <ul className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-0">
          {PLANS.map((p) => {
            const dark = !!p.recommended;
            return (
            <li
              key={p.id}
              data-reveal
              className={`relative flex flex-col p-8 text-center ${dark ? "z-10 rounded-lg border border-gold-300 bg-ink text-white shadow-[0_24px_60px_-24px_rgb(20_24_27/0.55)] lg:-my-5 lg:py-12" : "rounded-lg border border-line bg-white lg:rounded-none lg:first:rounded-l-lg lg:last:rounded-r-lg lg:[&:not(:first-child)]:border-l-0"}`}
            >
              {dark && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-300 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase">Empfohlen</span>}
              <h3 className={`font-serif text-[1.75rem] font-semibold ${dark ? "text-white" : "text-ink"}`}>{p.name}</h3>
              <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-ink-3"}`}>{p.tagline}</p>
              <p className={`mt-7 text-[15px] font-medium ${dark ? "text-gold-300" : "text-ink"}`}>bis {p.vehicleLimit} Fahrzeuge</p>
              <p className="mt-2 flex items-baseline justify-center gap-1.5">
                <span className={`text-[2.9rem] leading-none font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>{formatPrice(p.pricePerMonth)}</span>
                <span className={`text-sm ${dark ? "text-white/60" : "text-ink-3"}`}>/ Monat</span>
              </p>
              <div className="gold-rule my-7" />
              <p className={`flex items-center justify-center gap-2 text-sm font-medium ${dark ? "text-white" : "text-ink"}`}>
                <Check aria-hidden className={`size-4 ${dark ? "text-gold-300" : "text-gold-500"}`} strokeWidth={2.25} />
                Alle Funktionen inklusive
              </p>
              <div className="mt-auto pt-8">
                <Button href={TRIAL.href} variant={dark ? "light" : "secondary"} className="w-full" aria-label={`${TRIAL.label}: Tarif ${p.name}, bis ${p.vehicleLimit} Fahrzeuge`}>
                  {TRIAL.label}
                </Button>
              </div>
            </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-14 max-w-5xl rounded-lg border border-line bg-white p-8 sm:p-10" data-reveal>
          <h3 className="text-center text-[15px] font-semibold text-ink">In jedem Tarif enthalten</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_FEATURES.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-ink-2">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={2.25} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center text-sm text-ink-3">
          <p>{PRICE_NOTE} {ALL_FEATURES_NOTE}</p>
          {PRICING_IS_PLACEHOLDER && <p className="mt-1">{PLACEHOLDER_NOTE}</p>}
          <p className="mt-1">{LARGER_FLEET_NOTE}</p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-ink-2">
            Fragen zu den Tarifen? Schreib uns an
            <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-ink underline decoration-gold-300 underline-offset-4 hover:decoration-gold-600">{SITE.contactEmail}</a>
            oder
            <WhatsAppLink variant="md" className="h-auto! border-0! px-0! text-ink underline decoration-[#25D366]/50 underline-offset-4 hover:decoration-[#25D366]">per WhatsApp</WhatsAppLink>
          </p>
        </div>
      </Container>
    </section>
  );
}
