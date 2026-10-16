import { Check } from "lucide-react";
import { CalendarScreen, DepositScreen } from "../mockups/desktop-screens";
import { Container } from "../ui/primitives";

// Gruppierte Funktionen. Jede genannte Funktion ist im App-Code belegt (Funktionsnachweise 07.10. und 16.10.2026).
const RENTAL = ["Buchungen und Dispo-Kalender", "Miettarife nach Tag, Woche und Monat", "Mietverträge mit digitaler Unterschrift", "Nachträge während der Miete", "Kontaktlose Rückgabe per Schlüsselbox"];
const FLEET = ["Fahrzeugakte mit Vermietungen und Dokumenten", "Wartungspläne nach Datum und Kilometern", "HU/AU-Fälligkeiten", "Schadenakten mit Skizze und Fotos"];
const MONEY = ["Kundenakte mit Import bestehender Daten", "Rechnungen, Gutschriften, Stornobelege", "Mietzahlungen und Teilzahlungen", "Kaution und Auszahlungen mit Beleg", "Mahnwesen mit Mahnstufen"];
const ORG = ["Tagesübersicht „Heute“", "Behörden- und Bußgeldvorgänge", "Eigenes Logo und E-Mail-Absender", "Einstellungscenter für Verträge, Rechnungen und Mitarbeiter"];
const ROLES = ["Inhaber", "Disponent", "Hofmitarbeiter"];

function List({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((it) => (
        <li key={it} className={`flex gap-3 text-[15px] ${dark ? "text-white/80" : "text-ink-2"}`}>
          <Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${dark ? "text-gold-300" : "text-gold-500"}`} strokeWidth={2.25} />
          {it}
        </li>
      ))}
    </ul>
  );
}

/** Weitere Funktionen in vier Gruppen mit unterschiedlichem Aufbau: Produktansicht, Liste, dunkles Feld. */
export function Capabilities() {
  return (
    <section id="funktionen" aria-labelledby="cap-title" className="scroll-mt-16 bg-white py-24 lg:py-32">
      <Container wide>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end" data-reveal>
          <div>
            <p className="label">Funktionen</p>
            <h2 id="cap-title" className="display mt-5 text-[clamp(2.3rem,4.6vw,3.7rem)]">
              Alles, was der Alltag
              <br />
              einer Vermietung verlangt.
            </h2>
          </div>
          <p className="lead max-w-md lg:justify-self-end lg:pb-2">Von der Disposition bis zum Mahnwesen. Alle Funktionen sind in jedem Tarif enthalten.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12">
          {/* Vermietung: breit, mit Dispo-Kalender */}
          <article className="overflow-hidden rounded-[16px] bg-warm p-7 sm:p-9 lg:col-span-7" data-reveal>
            <p className="label">Vermietung</p>
            <h3 className="mt-3 text-[1.5rem] font-bold tracking-[-0.025em] text-ink">Vom Angebot bis zur Rückgabe</h3>
            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
              <List items={RENTAL} />
              <div className="overflow-hidden rounded-[8px] shadow-[0_20px_50px_-24px_rgb(17_19_21/0.4)] ring-1 ring-black/5">
                <CalendarScreen />
              </div>
            </div>
          </article>

          {/* Fuhrpark: schmal, Liste mit Kennzahl-Leiste */}
          <article className="rounded-[16px] border border-line p-7 sm:p-9 lg:col-span-5" data-reveal>
            <p className="label">Fuhrpark</p>
            <h3 className="mt-3 text-[1.5rem] font-bold tracking-[-0.025em] text-ink">Jedes Fahrzeug mit Geschichte</h3>
            <List items={FLEET} />
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[8px] bg-line text-center">
              {[
                ["HU/AU", "Fälligkeit"],
                ["Wartung", "Datum & km"],
                ["Schäden", "mit Skizze"],
              ].map(([a, b]) => (
                <div key={a} className="bg-warm-2 px-2 py-4">
                  <div className="text-[15px] font-bold tracking-[-0.01em] text-ink">{a}</div>
                  <div className="mt-0.5 text-[12px] text-ink-3">{b}</div>
                </div>
              ))}
            </div>
          </article>

          {/* Organisation: dunkles Feld mit Rollen */}
          <article className="on-dark rounded-[16px] bg-night p-7 sm:p-9 lg:col-span-5" data-reveal>
            <p className="label label-dark">Organisation</p>
            <h3 className="mt-3 text-[1.5rem] font-bold tracking-[-0.025em] text-white">Für das ganze Team</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">Jede Rolle sieht, was sie braucht. Jede Geldbewegung wird protokolliert.</p>
            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Rollen">
              {ROLES.map((r) => (
                <li key={r} className="rounded-full border border-gold-400/50 px-4 py-1.5 text-sm font-semibold text-gold-300">{r}</li>
              ))}
            </ul>
            <List items={ORG} dark />
          </article>
          {/* Kunden & Abrechnung: breit, Liste neben der Kautionskarte */}
          <article className="rounded-[16px] border border-line p-7 sm:p-9 lg:col-span-7" data-reveal>
            <p className="label">Kunden & Abrechnung</p>
            <h3 className="mt-3 text-[1.5rem] font-bold tracking-[-0.025em] text-ink">Sauber bis zum letzten Euro</h3>
            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
              <List items={MONEY} />
              <div className="rounded-[10px] shadow-[0_20px_50px_-24px_rgb(17_19_21/0.35)]">
                <DepositScreen />
              </div>
            </div>
          </article>

        </div>
      </Container>
    </section>
  );
}
