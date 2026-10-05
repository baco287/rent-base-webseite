import { Check, Minus } from "lucide-react";
import { AUDIENCES, COMPARISON } from "@/content/product";
import { Container, SectionHeader } from "../ui/primitives";

export function Audience() {
  return (
    <section id="loesungen" aria-labelledby="audience-title" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <Container>
        <SectionHeader id="audience-title" eyebrow="Lösungen" title="Gemacht für moderne Fahrzeugvermieter." text="RentBase ist auf die Vermietung von PKW und Transportern ausgelegt, vom inhabergeführten Betrieb bis zum Vermieter mit eigenem Team." />
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-t border-ink pt-6" data-reveal>
              <Icon aria-hidden className="size-5 text-gold-500" strokeWidth={1.6} />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Comparison() {
  return (
    <section aria-labelledby="compare-title" className="border-t border-line bg-white pb-24 lg:pb-32">
      <Container className="pt-24 lg:pt-32">
        <SectionHeader id="compare-title" align="center" eyebrow="Im Vergleich" title="Weniger Papier. Weniger doppelte Arbeit." />
        <div className="mx-auto mt-14 grid max-w-4xl overflow-hidden rounded-lg border border-line md:grid-cols-2" data-reveal>
          <div className="bg-surface p-8 sm:p-10">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-ink-3 uppercase">Ohne RentBase</h3>
            <ul className="mt-6 space-y-4">
              {COMPARISON.without.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-ink-2">
                  <Minus aria-hidden className="mt-0.5 size-[18px] shrink-0 text-ink-3" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line bg-white p-8 sm:p-10 md:border-t-0 md:border-l">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-600 uppercase">Mit RentBase</h3>
            <ul className="mt-6 space-y-4">
              {COMPARISON.with.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] font-medium text-ink">
                  <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-500" strokeWidth={2.25} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
