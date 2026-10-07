import { PROCESS, RECORD_PARTS } from "@/content/product";
import { Container, SectionHeader } from "../ui/primitives";

/** Ablauf einer Vermietung: Desktop als verbundene Zeitleiste, Mobil vertikal. */
export function Process() {
  return (
    <section id="produkt" aria-labelledby="process-title" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader id="process-title" eyebrow="Der Vermietprozess" title="Von der Buchung bis zur Abrechnung." text="Jeder Schritt baut auf dem vorherigen auf. Was einmal erfasst ist, steht im nächsten Schritt bereit: im Vertrag, im Übergabeprotokoll und auf der Rechnung." />
        <ol className="relative mt-16 grid gap-0 lg:grid-cols-7 lg:gap-4">
          <span aria-hidden className="absolute top-[1.1rem] right-[7%] left-[7%] hidden h-px bg-line-strong lg:block" />
          {PROCESS.map((s, i) => (
            <li key={s.no} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              {i < PROCESS.length - 1 && <span aria-hidden className="absolute top-9 bottom-0 left-[1.1rem] w-px bg-line-strong lg:hidden" />}
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-white text-[12px] font-semibold tracking-wider text-gold-600 tabular-nums lg:mx-auto">{s.no}</span>
              <div className="lg:mt-5 lg:text-center">
                <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Kernbotschaft: alle Teile hängen an einem Mietvorgang. */
export function CentralRecord() {
  const left = RECORD_PARTS.slice(0, 4);
  const right = RECORD_PARTS.slice(4);
  return (
    <section aria-labelledby="record-title" className="border-y border-line bg-surface py-20 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <SectionHeader
          id="record-title"
          eyebrow="Das Prinzip"
          title="Ein Mietvorgang. Alle Informationen."
          text="Kunde, Fahrzeug, Zeitraum, Vertrag, Übergabe, Rückgabe, Schäden, Zahlungen und Rechnung gehören bei RentBase zu einem gemeinsamen Vorgang. Niemand sucht in Ordnern, Postfächern oder auf Handys nach dem Übergabefoto von letzter Woche."
        />
        <div className="relative" data-reveal role="img" aria-label={`Ein Mietvorgang verbindet ${RECORD_PARTS.join(", ")}`}>
          <div aria-hidden className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5 sm:gap-6">
            <ul className="space-y-3">
              {left.map((p) => (
                <li key={p} className="relative rounded-md border border-line bg-white px-2 py-2.5 text-right text-[13px] sm:px-3 sm:text-sm text-ink after:absolute after:top-1/2 after:-right-2.5 after:h-px after:w-2.5 after:bg-gold-300 sm:after:-right-6 sm:after:w-6">{p}</li>
              ))}
            </ul>
            <div className="relative w-[8.5rem] rounded-lg border border-gold-300 bg-white p-3 sm:p-4 text-center shadow-lift sm:w-[12rem] sm:p-5">
              <span className="eyebrow block text-[10px]">Mietvorgang</span>
              <span className="mt-2 block font-serif text-2xl font-semibold text-ink sm:text-[1.75rem]">2026-0142</span>
              <span className="mt-2 block text-xs leading-snug text-ink-3">Keller Logistik GmbH<br />VW Golf · 5 Tage</span>
              <span className="gold-rule my-3 block" />
              <span className="block text-xs font-medium text-success">Rechnung bezahlt</span>
            </div>
            <ul className="space-y-3">
              {right.map((p) => (
                <li key={p} className="relative rounded-md border border-line bg-white px-2 py-2.5 text-[13px] sm:px-3 sm:text-sm text-ink before:absolute before:top-1/2 before:-left-2.5 before:h-px before:w-2.5 before:bg-gold-300 sm:before:-left-6 sm:before:w-6">{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
