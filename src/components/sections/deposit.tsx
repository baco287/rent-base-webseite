import { Check, FileText, ShieldCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, SectionHeader } from "../ui/primitives";
import { Chip, Panel, Scaled } from "../mockups/frames";

// Kautionsmodell, geprüft gegen den App-Code (lib/deposits.ts, deposit-offset.ts, payouts.ts):
// Vorgabe → Eingang → nach Rückgabe Freigabe / Einbehalt mit Grund / Verrechnung nur auf Bestätigung → Auszahlung mit Beleg.
// Nicht beworben, weil nicht vorhanden: Kartenvorautorisierung, automatische Rückzahlung, Bankanbindung.

const STEPS: { no: string; title: string; text: string }[] = [
  { no: "1", title: "Vereinbart", text: "Vorgabe aus Fahrzeug, Fahrzeuggruppe oder Firmenstandard, im Mietvertrag festgeschrieben." },
  { no: "2", title: "Erhalten", text: "Bar, Karte oder Überweisung, schon bei der Buchung oder später dokumentiert." },
  { no: "3", title: "Nach der Rückgabe entschieden", text: "Freigeben, mit Grund einbehalten oder mit der Rechnung verrechnen. Nichts davon passiert automatisch." },
  { no: "4", title: "Ausgezahlt", text: "Rückzahlung mit Beleg und eigener Nummer, die IBAN wird geprüft und nur maskiert angezeigt." },
];

const POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Verrechnung nur mit deiner Bestätigung", text: "Kaution und Rechnung bleiben getrennt, bis du die Verrechnung ausdrücklich bestätigst, auf Wunsch direkt beim Rechnungsabschluss." },
  { icon: FileText, title: "Auszahlung mit Beleg", text: "Jede Rückzahlung erhält einen Auszahlungsbeleg als PDF, auf Wunsch per E-Mail an den Kunden, mit Platz für Nachweise." },
  { icon: Wallet, title: "Storno statt Löschen", text: "Fehler werden mit Grund storniert und bleiben sichtbar. Jede Bewegung ist protokolliert, die Summen prüft das System." },
];

/** Nachbildung der Karte „Kaution & Abrechnung“ aus der Buchung, mit Beispieldaten. */
function DepositCard() {
  const rows: [string, string, string?][] = [
    ["Vereinbart", "500,00 €"],
    ["Tatsächlich erhalten", "500,00 €", "Barzahlung · 28.09.2026"],
    ["Mit Forderungen verrechnet", "62,40 €", "Rechnung RE-2026-000118 · bestätigt"],
    ["Bereits freigegeben", "437,60 €"],
    ["Bereits ausgezahlt", "437,60 €", "Überweisung · Beleg AZ-2026-000041"],
  ];
  const events = [
    { at: "28.09.2026, 10:12", what: "Erhalten", how: "Barzahlung", amount: "500,00 €", tone: "info" as const },
    { at: "03.10.2026, 16:40", what: "Verrechnet", how: "mit RE-2026-000118", amount: "62,40 €", tone: "amber" as const },
    { at: "03.10.2026, 16:41", what: "Freigegeben", how: "Rest zur Rückzahlung", amount: "437,60 €", tone: "good" as const },
    { at: "05.10.2026, 09:05", what: "Ausgezahlt", how: "Überweisung · AZ-2026-000041", amount: "437,60 €", tone: "good" as const },
  ];
  return (
    <Scaled designWidth={26} label="RentBase Karte Kaution und Abrechnung: 500 Euro vereinbart und erhalten, 62,40 Euro mit der Rechnung verrechnet, 437,60 Euro freigegeben und per Überweisung ausgezahlt (Beispieldaten)">
      <Panel title="Kaution & Abrechnung" right={<Chip tone="good">Ausgezahlt</Chip>} className="shadow-frame">
        <div className="grid grid-cols-2 gap-[0.5em] p-[0.8em]">
          {rows.map(([label, value, note]) => (
            <div key={label} className="rounded-[0.4em] border border-app-line bg-app-bg px-[0.7em] py-[0.5em]">
              <div className="text-[0.54em] font-semibold tracking-wide text-app-ink-3 uppercase">{label}</div>
              <div className="font-mono text-[0.95em] font-semibold text-app-ink">{value}</div>
              {note && <div className="truncate text-[0.52em] text-app-ink-3">{note}</div>}
            </div>
          ))}
          <div className="rounded-[0.4em] border border-dashed border-app-line px-[0.7em] py-[0.5em]">
            <div className="text-[0.54em] font-semibold tracking-wide text-app-ink-3 uppercase">Aktuell verfügbar</div>
            <div className="font-mono text-[0.95em] font-semibold text-app-ink">0,00 €</div>
            <div className="text-[0.52em] text-app-ink-3">vollständig abgerechnet</div>
          </div>
        </div>
        <div className="border-t border-[#e6eaf0] px-[0.8em] py-[0.6em]">
          <div className="mb-[0.3em] text-[0.54em] font-semibold tracking-wide text-app-ink-3 uppercase">Kautionshistorie</div>
          <ul className="divide-y divide-[#eef1f5]">
            {events.map((e) => (
              <li key={e.at} className="flex items-center gap-[0.6em] py-[0.4em]">
                <span className="w-[10.5em] shrink-0 font-mono text-[0.54em] whitespace-nowrap text-app-ink-3">{e.at}</span>
                <Chip tone={e.tone}>{e.what}</Chip>
                <span className="min-w-0 flex-1 truncate text-[0.58em] text-app-ink-3">{e.how}</span>
                <span className="font-mono text-[0.6em] font-semibold text-app-ink">{e.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[0.5em] text-[0.52em] text-app-ink-3">Verrechnung, Freigabe und Auszahlung entscheidet die Disposition.</p>
        </div>
      </Panel>
    </Scaled>
  );
}

export function Deposit() {
  return (
    <section id="kaution" aria-labelledby="deposit-title" className="scroll-mt-20 border-y border-line bg-surface py-24 lg:py-32">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader id="deposit-title" eyebrow="Kaution" title="Jeder Euro Kaution nachvollziehbar." text="Vom Eingang bis zur Rückzahlung dokumentiert RentBase, was mit der Kaution passiert, und verrechnet nichts ohne deine Bestätigung. Eine erhaltene Kaution verringert nie den offenen Mietbetrag." />
            <ol className="relative mt-10 space-y-7" data-reveal>
              <span aria-hidden className="absolute top-3 bottom-3 left-[0.95rem] w-px bg-line-strong" />
              {STEPS.map((s) => (
                <li key={s.no} className="relative flex gap-5">
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-white text-[12px] font-semibold text-gold-600 tabular-nums">{s.no}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:pt-6" data-reveal>
            <DepositCard />
            <p className="mt-3 text-xs text-ink-3">Beispiel: Nach der Rückgabe wurden 62,40 € Zusatzkosten mit der Kaution verrechnet, der Rest wurde freigegeben und ausgezahlt.</p>
          </div>
        </div>

        <ul className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-3" data-reveal>
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon aria-hidden className="size-5 text-gold-500" strokeWidth={1.6} />
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 flex items-start gap-2 text-sm text-ink-2" data-reveal>
          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" strokeWidth={2.25} />
          Karten- und Überweisungszahlungen werden in RentBase dokumentiert, nicht ausgeführt. Du behältst dein Kassen- und Bankkonto wie gewohnt.
        </p>
      </Container>
    </section>
  );
}
