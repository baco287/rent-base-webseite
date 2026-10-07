import { Container, SectionHead } from "../ui/primitives";

// Gruppierte Funktionen. Jede genannte Funktion ist im App-Code belegt (Funktionsnachweis 07.10.2026).
const GROUPS: { label: string; title: string; items: string[] }[] = [
  {
    label: "Vermietung",
    title: "Vom Angebot bis zur Rückgabe",
    items: ["Buchungen und Dispo-Kalender", "Miettarife nach Tag, Woche und Monat", "Mietverträge mit digitaler Unterschrift", "Nachträge während der Miete", "Übergabe und Rückgabe", "Kontaktlose Rückgabe per Schlüsselbox"],
  },
  {
    label: "Fuhrpark",
    title: "Jedes Fahrzeug mit Geschichte",
    items: ["Fahrzeugakte mit Vermietungen und Dokumenten", "Wartungspläne nach Datum und Kilometern", "HU/AU-Fälligkeiten", "Schadenakten mit Skizze und Fotos"],
  },
  {
    label: "Kunden & Abrechnung",
    title: "Sauber bis zum letzten Euro",
    items: ["Kundenakte mit Import bestehender Daten", "Rechnungen, Gutschriften, Stornobelege", "Mietzahlungen und Teilzahlungen", "Kaution und Auszahlungen mit Beleg", "Mahnwesen mit Mahnstufen"],
  },
  {
    label: "Organisation",
    title: "Für das ganze Team",
    items: ["Rollen: Inhaber, Disponent, Hofmitarbeiter", "Tagesübersicht „Heute“", "Behörden- und Bußgeldvorgänge", "Eigenes Logo und E-Mail-Absender"],
  },
];

/** Weitere Funktionen als ruhiges Datenblatt in vier Gruppen, keine Kartenwand. */
export function Capabilities() {
  return (
    <section id="funktionen" aria-labelledby="cap-title" className="scroll-mt-16 bg-warm py-24 lg:py-36">
      <Container wide>
        <SectionHead id="cap-title" no="07" label="Funktionen" title={<>Alles, was der Alltag<br className="hidden sm:block" /> einer Vermietung verlangt.</>} />
        <div className="mt-16 grid border-t border-ink sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <div key={g.label} className={`py-8 sm:pr-8 lg:py-10 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-8" : ""} ${i > 1 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="label">{g.label}</p>
              <h3 className="mt-4 text-[1.3rem] leading-tight font-semibold tracking-[-0.025em] text-ink">{g.title}</h3>
              <ul className="mt-6">
                {g.items.map((it) => (
                  <li key={it} className="border-t border-line py-2.5 text-[15px] text-ink-2">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
