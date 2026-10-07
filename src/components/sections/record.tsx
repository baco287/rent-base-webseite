import { BookingScreen, BOOKING_AREAS } from "../mockups/desktop-screens";
import { Container, SectionHead } from "../ui/primitives";

// Kurztexte zu den markierten Bereichen im Buchungsdetail (gleiche Reihenfolge wie BOOKING_AREAS).
const NOTES: Record<(typeof BOOKING_AREAS)[number]["key"], string> = {
  buchung: "Nummer, Fahrzeug, Status und Ablaufstufe",
  vertrag: "Mietvertrag mit fester Fassung der Bedingungen",
  kunde: "Kundenakte mit Führerscheinprüfung",
  fahrzeug: "Kennzeichen, Kilometer, Fälligkeiten",
  uebergabe: "Protokoll mit Fotos und Unterschrift",
  rueckgabe: "Abgleich mit der Übergabe",
  schaeden: "Neue Schäden direkt als Schadenakte",
  zahlungen: "Mietzahlung und Kaution getrennt",
  rechnung: "Rechnung aus dem Vorgang",
};

/** Kernprinzip: Ein Mietvorgang hält alle Informationen zusammen. Markierungen im Produktbild statt Icon-Raster. */
export function Record() {
  return (
    <section id="produkt" aria-labelledby="record-title" className="scroll-mt-16 bg-warm-2 pt-12 pb-24 lg:pt-16 lg:pb-36">
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead id="record-title" no="01" label="Der Mietvorgang" size="xl" title={<>Ein Vorgang.<br />Alles drin.</>} />
          <p className="lead max-w-md lg:justify-self-end lg:pb-3" data-reveal>
            Buchung, Kunde, Fahrzeug, Vertrag, Übergabe, Rückgabe, Schäden, Zahlungen und Rechnung hängen an einem Mietvorgang. Niemand sucht in Ordnern, Postfächern oder auf Handys.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[0.42fr_1fr] lg:items-center lg:gap-14">
          <ol className="order-2 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:order-1 lg:grid-cols-1" data-reveal>
            {BOOKING_AREAS.map((a, i) => (
              <li key={a.key} className="flex items-baseline gap-4 border-t border-line py-3.5">
                <span className="w-6 shrink-0 font-mono text-[0.78rem] font-medium text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[15px] font-semibold tracking-[-0.01em] text-ink">{a.label}</span>
                  <span className="block text-sm text-ink-3">{NOTES[a.key]}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="order-1 lg:order-2" data-reveal>
            <div className="overflow-hidden rounded-[10px] shadow-frame max-sm:-mr-5">
              <div className="max-sm:w-[160%]">
                <BookingScreen marks />
              </div>
            </div>
            <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">Buchungsdetail in RentBase · Beispieldaten</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
