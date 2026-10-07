import { Wordmark } from "../ui/logo";
import { Container, SectionHead } from "../ui/primitives";

const PARTS = ["Buchung", "Kunde", "Fahrzeug", "Dokumente", "Zahlung"];

/** Sehr reduziert: fünf Arbeitsbereiche laufen in einem System zusammen. Keine Wettbewerber, keine Vergleiche. */
export function OneSystem() {
  return (
    <section aria-labelledby="one-title" className="bg-canvas py-24 lg:py-36">
      <Container>
        <SectionHead id="one-title" no="08" label="Ein System" align="center" size="xl" title={<>Keine fünf Programme.<br /><span className="text-ink-3">RentBase.</span></>} />
        <div className="mx-auto mt-16 max-w-4xl lg:mt-20" data-reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {PARTS.map((p) => (
              <li key={p} className="rounded-[5px] border border-line py-4 text-center text-[15px] font-medium tracking-[-0.01em] text-ink-2 last:col-span-2 sm:last:col-span-1">
                {p}
              </li>
            ))}
          </ul>
          {/* Zusammenführung: fünf feine Linien laufen auf einen Punkt zu */}
          <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className="hidden h-24 w-full text-gold-400 sm:block">
            {[100, 300, 500, 700, 900].map((x) => (
              <path key={x} d={`M${x} 0 C ${x} 70, 500 50, 500 120`} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div aria-hidden className="mx-auto h-12 w-px bg-gold-400 sm:hidden" />
          <div className="mx-auto flex w-fit items-center rounded-[6px] border border-gold-300 bg-warm-2 px-8 py-5 shadow-lift">
            <Wordmark height={30} />
          </div>
        </div>
      </Container>
    </section>
  );
}
