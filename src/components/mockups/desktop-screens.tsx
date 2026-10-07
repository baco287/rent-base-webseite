// Nachbildungen echter RentBase-Ansichten mit fiktiven Beispieldaten. Beschriftungen, Aufbau und Farben folgen der App
// (Stand origin/main 07.10.2026): Startseite „Heute“, Buchungsdetail, Dispo-Kalender, Kundenakte, Vertrag, Rechnung, Kaution.

import { ChevronDown, Check } from "lucide-react";
import { AppWindow, Chip, Kpi, Panel, Plate, Scaled, type Tone } from "./frames";

/* ---------- Startseite „Heute“ ---------- */

const YARD = [
  { time: "08:30", kind: "Abholung", plate: "HB-RB 214", car: "VW Golf", who: "Keller Logistik GmbH", no: "2026-0142" },
  { time: "10:00", kind: "Rückgabe", plate: "HB-RB 318", car: "Ford Transit", who: "Anna Schröder", no: "2026-0131" },
  { time: "13:15", kind: "Abholung", plate: "HB-RB 102", car: "Škoda Octavia", who: "Jonas Weber", no: "2026-0144" },
  { time: "16:45", kind: "Rückgabe", plate: "HB-RB 227", car: "VW Crafter", who: "Brandt Umzüge", no: "2026-0127" },
];

function AttentionCard({ title, tone, rows }: { title: string; tone: Tone; rows: { area: string; text: string; plate?: string; chip: string }[] }) {
  const bar = { bad: "bg-[#b23a32]", amber: "bg-[#b8650a]", info: "bg-[#2f5fb3]" } as Record<string, string>;
  return (
    <div className="overflow-hidden rounded-[0.45em] border border-app-line bg-white">
      <div className="flex items-center gap-[0.5em] border-b border-[#e6eaf0] px-[0.8em] py-[0.45em]">
        <span className={`size-[0.5em] rounded-full ${bar[tone]}`} />
        <span className="text-[0.62em] font-semibold text-app-ink">{title}</span>
        <span className="ml-auto text-[0.56em] text-app-ink-3">{rows.length}</span>
      </div>
      <ul className="divide-y divide-[#eef1f5]">
        {rows.map((r) => (
          <li key={r.text} className="px-[0.8em] py-[0.42em]">
            <div className="text-[0.5em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{r.area}</div>
            <div className="mt-[0.15em] flex items-center gap-[0.5em]">
              <span className="min-w-0 flex-1 truncate text-[0.6em] text-app-ink">{r.text}</span>
              {r.plate && <Plate>{r.plate}</Plate>}
            </div>
            <div className="mt-[0.25em]">
              <Chip tone={tone}>{r.chip}</Chip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardScreen() {
  return (
    <Scaled designWidth={64} label="RentBase Startseite „Heute“: Abholungen und Rückgaben des Tages, aktive Mieten, Flotte, offene Punkte und Termine auf dem Hof (Beispieldaten)">
      <AppWindow url="app.rent-base.de/heute" active="Heute">
        <div className="space-y-[0.8em] p-[1.1em]">
          <div className="text-[1.25em] font-semibold tracking-[-0.01em] text-app-ink">Heute</div>
          <div className="grid grid-cols-4 gap-[0.6em]">
            <Kpi label="Abholungen heute" value="2" detail="nächste um 08:30" hot />
            <Kpi label="Rückgaben heute" value="2" detail="keine überfällig" />
            <Kpi label="Aktive Mieten" value="14" detail="Auslastung 7 Tage 78 % · 22 Fahrzeuge" />
            <Kpi label="Flotte" value="22" detail="1 in Werkstatt" />
          </div>
          <div className="grid grid-cols-[1.25fr_1fr] gap-[0.7em]">
            <div className="space-y-[0.6em]">
              <div className="flex items-center justify-between">
                <span className="text-[0.72em] font-semibold text-app-ink">Was braucht Aufmerksamkeit?</span>
                <span className="flex overflow-hidden rounded-[0.35em] border border-app-line text-[0.52em]">
                  <span className="bg-app-brand px-[0.7em] py-[0.25em] font-semibold text-white">Heute</span>
                  <span className="px-[0.7em] py-[0.25em] text-app-ink-3">7 Tage</span>
                  <span className="px-[0.7em] py-[0.25em] text-app-ink-3">30 Tage</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-[0.5em]">
                <AttentionCard title="Überfällig" tone="bad" rows={[{ area: "Miete", text: "RE-2026-000109", chip: "seit 3 Tagen" }]} />
                <AttentionCard
                  title="Heute"
                  tone="amber"
                  rows={[
                    { area: "Kaution", text: "Freigabe", plate: "HB-RB 318", chip: "offen" },
                    { area: "Fahrerprüfung", text: "J. Weber", plate: "HB-RB 102", chip: "vor Übergabe" },
                  ]}
                />
                <AttentionCard title="Bald" tone="info" rows={[{ area: "Wartung", text: "HU/AU", plate: "HB-RB 102", chip: "in 12 Tagen" }]} />
              </div>
            </div>
            <Panel title="Heute auf dem Hof" right={<Chip>4 Termine</Chip>}>
              <ul className="divide-y divide-[#e6eaf0]">
                {YARD.map((r) => (
                  <li key={r.time} className="flex items-center gap-[0.6em] px-[0.8em] py-[0.52em]">
                    <span className="w-[2.8em] font-mono text-[0.6em] font-semibold text-app-ink">{r.time}</span>
                    <span className={`w-[4.6em] text-[0.56em] font-semibold ${r.kind === "Abholung" ? "text-app-brand" : "text-[#2c7a4b]"}`}>{r.kind}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.6em] text-app-ink">{r.who}</span>
                      <span className="block truncate text-[0.52em] text-app-ink-3">{r.car} · Nr. {r.no}</span>
                    </span>
                    <Plate>{r.plate}</Plate>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          {[
            ["Finanzen", "4 offene Rechnungen · 1 in Mahnung · 2 offene Kautionen", true],
            ["Schäden & Wartung", "1 offene Schadenakte · Wartung: 1 fällig", false],
          ].map(([title, summary, open]) => (
            <div key={title as string} className={`flex items-center gap-[0.7em] rounded-[0.45em] border border-app-line bg-white px-[0.8em] py-[0.55em] ${open ? "border-l-[0.25em] border-l-[#b8650a]" : ""}`}>
              <span className="flex size-[1.4em] items-center justify-center rounded-full border border-app-line">
                <ChevronDown className="size-[0.9em] text-app-ink-3" />
              </span>
              <span className="text-[0.64em] font-semibold text-app-ink">{title}</span>
              <span className="truncate text-[0.56em] text-app-ink-3">{summary}</span>
              <span className="ml-auto text-[0.56em] font-semibold text-app-brand">Anzeigen</span>
            </div>
          ))}
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Buchungsdetail: der Mietvorgang ---------- */

/** Bereiche des Mietvorgangs in der Reihenfolge der Story; die Nummern erscheinen als Markierung im Buchungsdetail. */
export const BOOKING_AREAS = [
  { key: "buchung", label: "Buchung" },
  { key: "kunde", label: "Kunde" },
  { key: "fahrzeug", label: "Fahrzeug" },
  { key: "vertrag", label: "Vertrag" },
  { key: "uebergabe", label: "Übergabe" },
  { key: "rueckgabe", label: "Rückgabe" },
  { key: "schaeden", label: "Schäden" },
  { key: "zahlungen", label: "Zahlungen" },
  { key: "rechnung", label: "Rechnung" },
] as const;
type AreaKey = (typeof BOOKING_AREAS)[number]["key"];

/** Nummerierte Markierung direkt am Bereich (nur in der Story „Ein Vorgang. Alles drin.“). */
function Mark({ area, on }: { area: AreaKey; on: boolean }) {
  if (!on) return null;
  const n = BOOKING_AREAS.findIndex((a) => a.key === area) + 1;
  return (
    <span className="absolute top-1/2 -left-[1.05em] z-10 flex size-[1.5em] -translate-y-1/2 items-center justify-center rounded-full bg-[#111315] font-mono text-[0.6em] font-semibold text-[#d4b27a] ring-[0.18em] ring-[#d4b27a]">
      {n}
    </span>
  );
}

export function BookingScreen({ marks = false }: { marks?: boolean }) {
  const facts: [string, string, AreaKey?][] = [
    ["Vertrag", "MV-2026-0142 · unterschrieben", "vertrag"],
    ["Kunde", "Keller Logistik GmbH · K-00042", "kunde"],
    ["Fahrzeug", "VW Golf · HB-RB 214", "fahrzeug"],
    ["Abholung", "29.09.2026, 08:30"],
    ["Rückgabe", "03.10.2026, 16:40"],
    ["Kilometer", "45.210 → 46.330 km"],
  ];
  const docs: [string, string, string, AreaKey][] = [
    ["Übergabeprotokoll", "UP-2026-0142", "versiegelt", "uebergabe"],
    ["Rückgabeprotokoll", "RP-2026-0139", "versiegelt", "rueckgabe"],
    ["Mietvertrag", "MV-2026-0142", "unterschrieben", "vertrag"],
  ];
  return (
    <Scaled designWidth={56} label="RentBase Buchungsdetail: ein Mietvorgang mit Vertrag, Kunde, Fahrzeug, Übergabe, Rückgabe, Schäden, Zahlungen und Rechnung (Beispieldaten)">
      <AppWindow url="app.rent-base.de/buchungen/2026-0142" active="Buchungen" header={false}>
        <div className="space-y-[0.8em] p-[1.2em]">
          <div className="relative flex items-center gap-[0.6em] pl-[0.2em]">
            <Mark area="buchung" on={marks} />
            <span className={`text-[1.15em] font-semibold tracking-[-0.01em] text-app-ink ${marks ? "pl-[0.6em]" : ""}`}>Buchung 2026-0142</span>
            <Plate>HB-RB 214</Plate>
            <Chip>Zurückgegeben</Chip>
          </div>
          <div className="grid grid-cols-[1fr_1.15fr_0.95fr] gap-[0.9em]">
            <Panel>
              <dl className="divide-y divide-[#eef1f5]">
                {facts.map(([k, v, area]) => (
                  <div key={k} className="relative px-[0.9em] py-[0.55em]">
                    {area && area !== "vertrag" && <Mark area={area} on={marks} />}
                    <dt className="text-[0.5em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{k}</dt>
                    <dd className="mt-[0.1em] truncate text-[0.6em] text-app-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
            <div className="space-y-[0.7em]">
              <div className="rounded-[0.45em] border-2 border-app-brand bg-white px-[0.8em] py-[0.6em]">
                <div className="text-[0.5em] font-semibold tracking-[0.06em] text-app-brand uppercase">Nächster Schritt</div>
                <div className="mt-[0.2em] text-[0.7em] font-semibold text-app-ink">Kaution abrechnen</div>
                <div className="mt-[0.15em] text-[0.56em] text-app-ink-3">Rechnung abgeschlossen. 500,00 € Kaution erhalten.</div>
              </div>
              <Panel title="Dokumente">
                <ul className="divide-y divide-[#eef1f5]">
                  {docs.map(([t, n, st, area]) => (
                    <li key={n} className="relative flex items-center gap-[0.5em] px-[0.9em] py-[0.45em]">
                      <Mark area={area} on={marks} />
                      <span className="flex-1 text-[0.58em] text-app-ink">{t}</span>
                      <span className="font-mono text-[0.5em] text-app-ink-3">{n}</span>
                      <Chip tone="good">{st}</Chip>
                    </li>
                  ))}
                </ul>
              </Panel>
              <div className="relative">
                <Mark area="schaeden" on={marks} />
                <Panel title="Schäden dieser Vermietung" right={<Chip tone="amber">1 neu</Chip>}>
                  <div className="px-[0.9em] py-[0.5em] text-[0.56em] text-app-ink">Delle Tür hinten links · Schadenakte angelegt</div>
                </Panel>
              </div>
            </div>
            <div className="space-y-[0.7em]">
              <div className="relative">
                <Mark area="zahlungen" on={marks} />
                <Panel title="Kaution & Abrechnung" right={<Chip tone="info">Erhalten</Chip>}>
                  <div className="space-y-[0.3em] px-[0.9em] py-[0.55em] text-[0.56em] text-app-ink">
                    <div className="flex justify-between"><span className="text-app-ink-3">Mietzahlung</span><span className="font-mono">337,40 €</span></div>
                    <div className="flex justify-between"><span className="text-app-ink-3">Kaution vereinbart</span><span className="font-mono">500,00 €</span></div>
                    <div className="flex justify-between"><span className="text-app-ink-3">Kaution erhalten</span><span className="font-mono">500,00 €</span></div>
                  </div>
                </Panel>
              </div>
              <div className="relative">
                <Mark area="rechnung" on={marks} />
                <Panel title="Kosten" right={<Chip tone="good">RE-2026-000118</Chip>}>
                  <div className="space-y-[0.3em] px-[0.9em] py-[0.55em] text-[0.56em] text-app-ink">
                    <div className="flex justify-between"><span className="text-app-ink-3">Gesamtmietpreis</span><span className="font-mono">245,00 €</span></div>
                    <div className="flex justify-between"><span className="text-app-ink-3">Zusatzkosten</span><span className="font-mono">92,40 €</span></div>
                    <div className="flex justify-between border-t border-[#e6eaf0] pt-[0.3em] font-semibold"><span>Rechnung abgeschlossen</span><span className="font-mono">337,40 €</span></div>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Dispo-Kalender ---------- */

const DAYS = ["Mo 28.", "Di 29.", "Mi 30.", "Do 1.", "Fr 2.", "Sa 3.", "So 4.", "Mo 5.", "Di 6.", "Mi 7.", "Do 8.", "Fr 9."];
type BarTone = "out" | "res" | "shop" | "late";
const ROWS: { group?: string; plate: string; car: string; bars: { from: number; to: number; tone: BarTone; label: string }[] }[] = [
  { group: "PKW", plate: "HB-RB 214", car: "VW Golf", bars: [{ from: 1, to: 5.7, tone: "out", label: "Keller Logistik" }, { from: 8, to: 11, tone: "res", label: "S. Krämer" }] },
  { plate: "HB-RB 102", car: "Škoda Octavia", bars: [{ from: 2.5, to: 4, tone: "res", label: "J. Weber" }, { from: 6, to: 10, tone: "res", label: "Hansa Bau" }] },
  { group: "Transporter", plate: "HB-RB 318", car: "Ford Transit", bars: [{ from: 0, to: 2.4, tone: "late", label: "A. Schröder" }, { from: 3.5, to: 8, tone: "res", label: "Nord Event GmbH" }] },
  { plate: "HB-RB 227", car: "VW Crafter", bars: [{ from: 0, to: 1.7, tone: "out", label: "Brandt Umzüge" }, { from: 4, to: 9, tone: "res", label: "M. Özdemir" }] },
  { plate: "HB-RB 401", car: "Opel Movano", bars: [{ from: 0, to: 4.5, tone: "shop", label: "Werkstatt" }] },
];
const BAR: Record<BarTone, string> = {
  out: "bg-[#1c3d6b] text-white",
  res: "bg-[#dee7f8] text-[#2f5fb3] ring-1 ring-[#2f5fb3]/40",
  late: "bg-[#f6dedb] text-[#b23a32] ring-1 ring-[#b23a32]/40",
  shop: "bg-[repeating-linear-gradient(135deg,#ebeff4_0_0.4em,#dfe4eb_0.4em_0.8em)] text-[#4a5568]",
};

export function CalendarScreen() {
  const today = 1;
  return (
    <Scaled designWidth={46} label="RentBase Dispo-Kalender: Fahrzeuge nach Gruppen, Buchungen über zwei Wochen, Werkstatt und überfällige Rückgabe (Beispieldaten)">
      <AppWindow url="app.rent-base.de/dispo" compact>
        <div className="p-[1em]">
          <div className="mb-[0.7em] flex items-center gap-[0.6em]">
            <span className="text-[1em] font-semibold text-app-ink">Dispo-Kalender</span>
            <span className="ml-auto flex overflow-hidden rounded-[0.35em] border border-app-line text-[0.54em] text-app-ink">
              <span className="px-[0.7em] py-[0.25em]">‹ Woche</span>
              <span className="border-x border-app-line px-[0.7em] py-[0.25em] font-semibold">Heute</span>
              <span className="px-[0.7em] py-[0.25em]">Woche ›</span>
            </span>
          </div>
          <div className="overflow-hidden rounded-[0.45em] border border-app-line bg-white">
            <div className="grid grid-cols-[8.5em_1fr] border-b border-[#e6eaf0] bg-[#f6f8fb]">
              <span className="px-[0.7em] py-[0.45em] text-[0.52em] font-semibold text-app-ink-3 uppercase">Fahrzeug</span>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${DAYS.length}, 1fr)` }}>
                {DAYS.map((d, i) => (
                  <span key={d} className={`border-l border-[#e6eaf0] py-[0.45em] text-center text-[0.5em] ${i === today ? "bg-[#fbebd3] font-semibold text-[#b8650a]" : "text-app-ink-3"}`}>{d}</span>
                ))}
              </div>
            </div>
            {ROWS.map((r) => (
              <div key={r.plate}>
                {r.group && <div className="border-b border-[#eef1f5] bg-[#f9fafc] px-[0.7em] py-[0.25em] text-[0.48em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{r.group}</div>}
                <div className="grid grid-cols-[8.5em_1fr] border-b border-[#eef1f5]">
                  <div className="flex flex-col gap-[0.2em] px-[0.7em] py-[0.5em]">
                    <Plate>{r.plate}</Plate>
                    <span className="text-[0.5em] text-app-ink-3">{r.car}</span>
                  </div>
                  <div className="relative grid" style={{ gridTemplateColumns: `repeat(${DAYS.length}, 1fr)` }}>
                    {DAYS.map((d, i) => (
                      <span key={d} className={`border-l border-[#eef1f5] ${i === today ? "bg-[#fdf5ea]" : ""}`} />
                    ))}
                    {r.bars.map((b) => (
                      <span key={b.label} className={`absolute top-1/2 flex h-[1.55em] -translate-y-1/2 items-center overflow-hidden rounded-[0.3em] px-[0.5em] text-[0.52em] font-semibold whitespace-nowrap ${BAR[b.tone]}`} style={{ left: `calc(${(b.from / DAYS.length) * 100}% + 0.15em)`, width: `calc(${((b.to - b.from) / DAYS.length) * 100}% - 0.3em)` }}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[0.6em] flex flex-wrap gap-x-[1em] gap-y-[0.3em] text-[0.5em] text-app-ink-3">
            {[
              ["res", "Reserviert"],
              ["out", "Unterwegs"],
              ["late", "Rückgabe überfällig"],
              ["shop", "Werkstatt / gesperrt"],
            ].map(([t, l]) => (
              <span key={t} className="flex items-center gap-[0.4em]">
                <i className={`inline-block h-[0.9em] w-[1.6em] rounded-[0.2em] ${BAR[t as BarTone]}`} />
                {l}
              </span>
            ))}
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Kundenakte ---------- */

export function CustomerScreen() {
  const rentals = [
    ["2026-0142", "HB-RB 214", "29.09.–03.10.", "Zurückgegeben", "grey"],
    ["2026-0097", "HB-RB 318", "12.08.–15.08.", "Zurückgegeben", "grey"],
    ["2026-0151", "HB-RB 102", "14.10.–16.10.", "Bereit zur Übergabe", "good"],
  ] as const;
  return (
    <Scaled designWidth={40} label="RentBase Kundenakte mit Führerscheinprüfung, Vermietungen, Rechnungen und offenen Beträgen (Beispieldaten)">
      <AppWindow url="app.rent-base.de/kunden/K-00042" compact>
        <div className="space-y-[0.7em] p-[1em]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[1em] font-semibold text-app-ink">Keller Logistik GmbH</div>
              <div className="text-[0.56em] text-app-ink-3">K-00042 · Bremen · Ansprechpartner Tobias Keller</div>
            </div>
            <Chip tone="good">Führerschein geprüft</Chip>
          </div>
          <div className="grid grid-cols-4 gap-[0.5em]">
            {[
              ["Vermietungen", "7"],
              ["Rechnungen", "6"],
              ["Offen", "0,00 €"],
              ["Kaution offen", "0,00 €"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[0.45em] bg-[#ebeff4] px-[0.7em] py-[0.5em]">
                <div className="text-[0.48em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{k}</div>
                <div className="font-mono text-[0.95em] font-semibold text-app-ink">{v}</div>
              </div>
            ))}
          </div>
          <Panel title="Vermietungen">
            <ul className="divide-y divide-[#e6eaf0]">
              {rentals.map(([no, plate, when, status, tone]) => (
                <li key={no} className="flex items-center gap-[0.7em] px-[0.8em] py-[0.45em] text-app-ink">
                  <span className="w-[5.5em] font-mono text-[0.58em] whitespace-nowrap">{no}</span>
                  <Plate>{plate}</Plate>
                  <span className="flex-1 text-[0.56em] text-app-ink-3">{when}</span>
                  <Chip tone={tone}>{status}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Mietvertrag ---------- */

export function ContractScreen() {
  return (
    <Scaled designWidth={40} label="RentBase Mietvertrag mit Mietbedingungen in fester Fassung und digitalen Unterschriften (Beispieldaten)">
      <AppWindow url="app.rent-base.de/buchungen/2026-0142/vertrag" compact>
        <div className="space-y-[0.7em] p-[1em]">
          <div className="flex items-center gap-[0.6em]">
            <span className="text-[1em] font-semibold text-app-ink">Mietvertrag MV-2026-0142</span>
            <Chip tone="good">Bereit zur Übergabe</Chip>
          </div>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[0.6em]">
            <Panel title="Vertragsdaten">
              <dl className="space-y-[0.32em] px-[0.8em] py-[0.6em] text-[0.56em]">
                {[
                  ["Mieter", "Keller Logistik GmbH"],
                  ["Fahrzeug", "VW Golf · HB-RB 214"],
                  ["Zeitraum", "29.09. 08:30 – 03.10. 16:00"],
                  ["Inklusivkilometer", "1.000 km"],
                  ["Mehrkilometer", "0,25 € je km"],
                  ["Kaution", "500,00 €"],
                  ["Mietbedingungen", "Fassung 3 vom 01.09.2026"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-[1em]">
                    <dt className="text-app-ink-3">{k}</dt>
                    <dd className="text-right text-app-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
            <Panel title="Unterschriften">
              <div className="space-y-[0.5em] p-[0.7em]">
                {[
                  ["Unterschrift Mieter", "Tobias Keller"],
                  ["Unterschrift Vermieter", "Laura Beispiel"],
                ].map(([k, who]) => (
                  <div key={k} className="rounded-[0.35em] border border-app-line p-[0.45em]">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.5em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{k}</span>
                      <Chip tone="good">Erfasst</Chip>
                    </div>
                    <svg viewBox="0 0 200 40" className="mt-[0.2em] h-[2em] w-full" fill="none" stroke="#1a2230" strokeWidth="2" strokeLinecap="round">
                      <path d={who.startsWith("T") ? "M8 30c12-20 18-24 22-16s-6 16 2 14 12-18 18-16-2 14 6 12 14-12 22-10 6 8 14 6 20-6 30-6 24 4 34 2" : "M10 28c8-14 16-20 20-12s-4 12 4 10 10-14 18-12 0 12 8 10 16-10 26-8c12 2 20 6 34 2s20-6 30-4"} />
                    </svg>
                    <div className="text-[0.48em] text-app-ink-3">{who}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Rechnung ---------- */

export function InvoiceScreen() {
  const items = [
    ["Fahrzeugmiete 29.09.–03.10. (5 Tage)", "245,00 €"],
    ["Mehrkilometer 120 km × 0,25 €", "30,00 €"],
    ["Betankung 18 l × 1,80 €", "32,40 €"],
    ["Innenreinigung", "30,00 €"],
  ];
  return (
    <Scaled designWidth={40} label="RentBase Rechnung aus der Vermietung: Mietpreis aus dem Vertrag, Mehrkilometer und Betankung aus der Rückgabe, Zahlungen (Beispieldaten)">
      <AppWindow url="app.rent-base.de/buchungen/2026-0142/rechnung" compact>
        <div className="grid grid-cols-[1.45fr_1fr] gap-[0.7em] p-[1em]">
          <Panel title="Rechnung RE-2026-000118" right={<Chip tone="good">abgeschlossen</Chip>}>
            <ul className="divide-y divide-[#eef1f5] px-[0.8em]">
              {items.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-[1em] py-[0.5em] text-[0.58em] text-app-ink">
                  <span>{k}</span>
                  <span className="font-mono">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mx-[0.8em] mt-[0.2em] mb-[0.7em] flex justify-between border-t-[0.15em] border-app-ink pt-[0.5em] text-[0.68em] font-semibold text-app-ink">
              <span>Gesamt</span>
              <span className="font-mono">337,40 €</span>
            </div>
          </Panel>
          <div className="space-y-[0.7em]">
            <Panel title="Mietzahlung" right={<Chip tone="good">Bezahlt</Chip>}>
              <div className="space-y-[0.35em] px-[0.8em] py-[0.6em] text-[0.56em] text-app-ink">
                <div className="flex justify-between"><span>Überweisung</span><span className="font-mono">100,00 €</span></div>
                <div className="flex justify-between"><span>Barzahlung</span><span className="font-mono">237,40 €</span></div>
                <div className="flex justify-between border-t border-[#e6eaf0] pt-[0.35em] font-semibold"><span>Noch offen</span><span className="font-mono">0,00 €</span></div>
              </div>
            </Panel>
            <Panel title="Versand">
              <div className="flex items-center gap-[0.4em] px-[0.8em] py-[0.55em] text-[0.56em] text-app-ink">
                <Check className="size-[1.1em] text-[#2c7a4b]" strokeWidth={2.5} />
                PDF per E-Mail an Keller Logistik
              </div>
            </Panel>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

/* ---------- Kaution & Abrechnung ---------- */

export function DepositScreen() {
  const rows: [string, string, string?][] = [
    ["Vereinbart", "500,00 €"],
    ["Tatsächlich erhalten", "500,00 €", "Barzahlung · 28.09.2026"],
    ["Mit Forderungen verrechnet", "62,40 €", "RE-2026-000118 · bestätigt"],
    ["Bereits ausgezahlt", "437,60 €", "Überweisung · AZ-2026-000041"],
  ];
  const events = [
    ["28.09., 10:12", "Erhalten", "info", "500,00 €"],
    ["03.10., 16:40", "Verrechnet", "amber", "62,40 €"],
    ["03.10., 16:41", "Freigegeben", "good", "437,60 €"],
    ["05.10., 09:05", "Ausgezahlt", "good", "437,60 €"],
  ] as const;
  return (
    <Scaled designWidth={30} label="RentBase Karte Kaution und Abrechnung: 500 Euro erhalten, 62,40 Euro nach Bestätigung verrechnet, Rest mit Beleg ausgezahlt (Beispieldaten)">
      <Panel title="Kaution & Abrechnung" right={<Chip tone="good">Ausgezahlt</Chip>} className="ring-1 ring-black/5">
        <div className="grid grid-cols-2 gap-[0.5em] p-[0.8em]">
          {rows.map(([label, value, note]) => (
            <div key={label} className="rounded-[0.4em] bg-[#ebeff4] px-[0.7em] py-[0.5em]">
              <div className="text-[0.5em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{label}</div>
              <div className="font-mono text-[0.95em] font-semibold text-app-ink">{value}</div>
              {note && <div className="truncate text-[0.5em] text-app-ink-3">{note}</div>}
            </div>
          ))}
        </div>
        <ul className="divide-y divide-[#eef1f5] border-t border-[#e6eaf0] px-[0.8em] py-[0.3em]">
          {events.map(([at, what, tone, amount]) => (
            <li key={at} className="flex items-center gap-[0.6em] py-[0.38em]">
              <span className="w-[8.5em] font-mono text-[0.52em] whitespace-nowrap text-app-ink-3">{at}</span>
              <Chip tone={tone}>{what}</Chip>
              <span className="ml-auto font-mono text-[0.56em] font-semibold text-app-ink">{amount}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </Scaled>
  );
}
