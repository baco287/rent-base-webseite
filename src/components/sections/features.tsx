import { Check } from "lucide-react";
import { HANDOVER_POINTS, MORE_FEATURES, SHOWCASES, type Showcase } from "@/content/product";
import { Container, SectionHeader } from "../ui/primitives";
import { CalendarScreen, CustomerScreen, FleetScreen, InvoiceScreen } from "../mockups/desktop-screens";
import { PhoneSignature, TabletReadings } from "../mockups/device-screens";

const VISUALS: Record<Showcase["visual"], () => React.JSX.Element> = {
  calendar: CalendarScreen,
  fleet: FleetScreen,
  invoice: InvoiceScreen,
  customer: CustomerScreen,
};

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex gap-3 text-[15px] text-ink">
          <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-500" strokeWidth={2.25} />
          {p}
        </li>
      ))}
    </ul>
  );
}

export function Features() {
  return (
    <section id="funktionen" aria-labelledby="features-title" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <Container>
        <SectionHeader id="features-title" eyebrow="Funktionen" title="Alles für den Vermietalltag." text="Von der Disposition bis zur Buchhaltung: RentBase deckt die Arbeit ab, die in einer Vermietung täglich anfällt, ohne dass du zwischen Programmen wechseln musst." />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {SHOWCASES.map((s, i) => {
            const Visual = VISUALS[s.visual];
            return (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={`grid items-center gap-10 lg:gap-16 ${i % 2 === 1 ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""} data-reveal>
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3 id={`${s.id}-title`} className="display mt-4 text-[1.9rem] sm:text-[2.3rem]">{s.title}</h3>
                  <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{s.text}</p>
                  <CheckList items={s.points} />
                </div>
                <div className={`rounded-lg border border-line bg-surface p-4 sm:p-8 lg:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`} data-reveal>
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-28 lg:mt-36">
          <h3 className="display text-[1.9rem] sm:text-[2.2rem]" data-reveal>Und vieles, was im Alltag den Unterschied macht.</h3>
          <ul className="mt-10 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
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
    <section aria-labelledby="mobile-title" className="overflow-hidden border-y border-line bg-surface py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeader id="mobile-title" eyebrow="Digitale Übergabe & Rückgabe" title="Direkt am Fahrzeug arbeiten." text="Übergabe und Rückgabe erledigst du dort, wo sie stattfinden: direkt am Fahrzeug, auf Tablet oder Smartphone. Alles, was du erfasst, steht sofort im Vorgang am Desktop bereit." />
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2" data-reveal>
            {HANDOVER_POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-ink">
                <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-500" strokeWidth={2.25} />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-l-2 border-gold-300 pl-4 text-sm leading-relaxed text-ink-2" data-reveal>
            Bei der Rückgabe vergleicht RentBase mit dem Übergabeprotokoll und schlägt Mehrkilometer und Betankung vor. Das unterschriebene Protokoll wird als PDF abgelegt und kann per E-Mail versendet werden.
          </p>
        </div>
        <div className="relative pb-[6%]" data-reveal>
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
