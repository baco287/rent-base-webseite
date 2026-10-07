import { DashboardScreen } from "../mockups/desktop-screens";
import { Container, SectionHead } from "../ui/primitives";
import { Parallax } from "../ui/parallax";

// Bereiche der echten Startseite „Heute“ (src/app/(app)/heute, Stand 07.10.2026)
const AREAS = [
  ["Abholungen & Rückgaben", "Was heute vom Hof geht und zurückkommt, mit nächster Uhrzeit."],
  ["Aktive Mieten & Flotte", "Laufende Vermietungen, Auslastung der nächsten 7 Tage, Fahrzeuge in der Werkstatt."],
  ["Was braucht Aufmerksamkeit?", "Überfällig, heute, bald: Mieten, Kautionen, Fahrerprüfungen, Wartung."],
  ["Finanzen, Schäden & Wartung", "Offene Rechnungen, Mahnungen, Kautionen und Schadenakten auf einen Klick."],
];

/** Control Center: die Startseite „Heute“ groß, darunter eine knappe Legende statt Feature-Karten. */
export function Control() {
  return (
    <section aria-labelledby="control-title" className="on-dark relative isolate overflow-hidden bg-night-2 py-24 lg:py-36">
      <div aria-hidden className="engineering-grid absolute inset-0 -z-10 opacity-70" />
      <Container wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead id="control-title" no="06" label="Tagesübersicht" size="xl" title={<>Deine Vermietung<br />auf einen Blick.</>} />
          <p className="lead max-w-md lg:justify-self-end lg:pb-3" data-reveal>
            Die Startseite „Heute“ zeigt, was ansteht und was liegen geblieben ist. Jede Zeile führt direkt in den Vorgang.
          </p>
        </div>

        <div className="mt-16 lg:mt-20" data-reveal>
          <Parallax amount={22}>
            <div className="overflow-hidden rounded-[10px] shadow-product max-sm:-mr-5">
              <div className="max-sm:w-[175%]">
                <DashboardScreen />
              </div>
            </div>
          </Parallax>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" data-reveal>
          {AREAS.map(([t, d], i) => (
            <li key={t} className="border-t border-night-line pt-5">
              <span className="font-mono text-[0.75rem] text-gold-300/80">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.015em] text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{d}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
