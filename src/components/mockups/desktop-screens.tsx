// Nachbildungen echter RentBase-Ansichten mit Beispieldaten (Beschriftungen, Farben und Aufbau wie in der App).

import { AppWindow, Chip, Panel, Plate, Scaled } from "./frames";

function Kpi({ label, value, detail, hot = false }: { label: string; value: string; detail: string; hot?: boolean }) {
  return (
    <div className={`rounded-[0.45em] border bg-white px-[0.75em] py-[0.6em] ${hot ? "border-[#e8c9a0]" : "border-app-line"}`}>
      <div className="text-[0.56em] font-semibold tracking-wide text-app-ink-3 uppercase">{label}</div>
      <div className={`mt-[0.1em] text-[1.35em] leading-tight font-semibold ${hot ? "text-[#b8650a]" : "text-app-ink"}`}>{value}</div>
      <div className="truncate text-[0.56em] text-app-ink-3">{detail}</div>
    </div>
  );
}

const YARD = [
  { time: "08:30", kind: "Abholung", plate: "HB-RB 214", car: "VW Golf", who: "Keller Logistik GmbH", chip: <Chip tone="good">bereit</Chip> },
  { time: "10:00", kind: "Rückgabe", plate: "HB-RB 318", car: "Ford Transit", who: "Anna Schröder", chip: <Chip tone="info">unterwegs</Chip> },
  { time: "13:15", kind: "Abholung", plate: "HB-RB 102", car: "Škoda Octavia", who: "Jonas Weber", chip: <Chip tone="amber">Vertrag offen</Chip> },
  { time: "16:45", kind: "Rückgabe", plate: "HB-RB 227", car: "VW Crafter", who: "Brandt Umzüge", chip: <Chip tone="info">unterwegs</Chip> },
];

export function DashboardScreen() {
  return (
    <Scaled designWidth={60} label="RentBase Tagesübersicht mit Abholungen, Rückgaben, aktiven Mieten und offenen Rechnungen (Beispieldaten)">
      <AppWindow url="app.rent-base.de/heute" active="Heute">
        <div className="space-y-[0.8em] p-[1em]">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[1.15em] font-semibold text-app-ink">Heute</div>
              <div className="text-[0.62em] text-app-ink-3">Dienstag, 29. September</div>
            </div>
            <div className="flex gap-[0.4em]">
              <span className="rounded-[0.35em] border border-app-line bg-white px-[0.7em] py-[0.35em] text-[0.6em] text-app-ink">Dispo-Kalender</span>
              <span className="rounded-[0.35em] bg-[#1c3d6b] px-[0.7em] py-[0.35em] text-[0.6em] font-semibold text-white">Neue Buchung</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[0.6em]">
            <Kpi label="Abholungen heute" value="2" detail="nächste um 08:30" hot />
            <Kpi label="Rückgaben heute" value="2" detail="keine überfällig" />
            <Kpi label="Aktive Mieten" value="14" detail="Auslastung 7 Tage 78 % · 22 Fahrzeuge" />
            <Kpi label="Flotte" value="22" detail="1 in Werkstatt" />
            <Kpi label="Offene Rechnungen" value="4" detail="1.286,40 € offen" />
            <Kpi label="Offene Kautionen" value="2" detail="nach Rückgabe noch nicht entschieden" />
            <Kpi label="Offene Schadenakten" value="1" detail="1 in Prüfung" />
            <Kpi label="Wartung" value="1" detail="fällig · 2 bald" hot />
          </div>
          <div className="grid grid-cols-[1.55fr_1fr] gap-[0.6em]">
            <Panel title="Heute auf dem Hof" right={<Chip>4 Termine</Chip>}>
              <ul className="divide-y divide-[#e6eaf0]">
                {YARD.map((r) => (
                  <li key={r.time} className="flex items-center gap-[0.7em] px-[0.8em] py-[0.5em]">
                    <span className="w-[2.6em] font-mono text-[0.62em] text-app-ink">{r.time}</span>
                    <span className={`w-[4.8em] text-[0.58em] font-semibold ${r.kind === "Abholung" ? "text-[#1c3d6b]" : "text-[#2c7a4b]"}`}>{r.kind}</span>
                    <Plate>{r.plate}</Plate>
                    <span className="min-w-0 flex-1 truncate text-[0.62em] text-app-ink">{r.who} <span className="text-app-ink-3">· {r.car}</span></span>
                    {r.chip}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Hinweise" right={<Chip tone="amber">3</Chip>}>
              <ul className="space-y-[0.55em] px-[0.8em] py-[0.6em] text-[0.6em] text-app-ink">
                <li className="flex gap-[0.6em]"><span className="mt-[0.35em] size-[0.55em] shrink-0 rounded-full bg-[#b8650a]" />HU/AU für HB-RB 102 in 12 Tagen</li>
                <li className="flex gap-[0.6em]"><span className="mt-[0.35em] size-[0.55em] shrink-0 rounded-full bg-[#b8650a]" />Kaution 2026-0138 nach Rückgabe noch nicht freigegeben</li>
                <li className="flex gap-[0.6em]"><span className="mt-[0.35em] size-[0.55em] shrink-0 rounded-full bg-[#2f5fb3]" />Rechnung RE-2026-000117 heute fällig</li>
              </ul>
            </Panel>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

const DAYS = ["Mo 28", "Di 29", "Mi 30", "Do 1", "Fr 2", "Sa 3", "So 4"];
const ROWS: { plate: string; car: string; bars: { from: number; to: number; tone: "brand" | "info" | "grey" | "amber"; label: string }[] }[] = [
  { plate: "HB-RB 214", car: "VW Golf", bars: [{ from: 1, to: 4, tone: "info", label: "Keller Logistik" }] },
  { plate: "HB-RB 318", car: "Ford Transit", bars: [{ from: 0, to: 1.4, tone: "brand", label: "A. Schröder" }, { from: 2.5, to: 6, tone: "info", label: "Nord Event GmbH" }] },
  { plate: "HB-RB 102", car: "Škoda Octavia", bars: [{ from: 1.5, to: 3, tone: "info", label: "J. Weber" }] },
  { plate: "HB-RB 227", car: "VW Crafter", bars: [{ from: 0, to: 1.7, tone: "brand", label: "Brandt Umzüge" }, { from: 4, to: 7, tone: "info", label: "M. Özdemir" }] },
  { plate: "HB-RB 401", car: "Opel Movano", bars: [{ from: 0, to: 7, tone: "amber", label: "Werkstatt" }] },
];
const BAR = { brand: "bg-[#1c3d6b] text-white", info: "bg-[#dee7f8] text-[#2f5fb3] ring-1 ring-[#b9cbee]", grey: "bg-[#ebeff4] text-[#4a5568]", amber: "bg-[#fbebd3] text-[#b8650a] ring-1 ring-[#efd2a8]" };

export function CalendarScreen() {
  return (
    <Scaled designWidth={34} label="RentBase Dispo-Kalender: Fahrzeuge und Buchungen über eine Woche (Beispieldaten)">
      <AppWindow url="app.rent-base.de/dispo" active="Dispo-Kalender" sidebar={false}>
        <div className="p-[0.9em]">
          <div className="mb-[0.7em] flex items-center justify-between">
            <span className="text-[0.95em] font-semibold text-app-ink">Dispo-Kalender</span>
            <span className="flex gap-[0.8em] text-[0.56em] text-app-ink-3">
              <span className="flex items-center gap-[0.4em]"><i className="inline-block size-[0.8em] rounded-[0.2em] bg-[#1c3d6b]" />unterwegs</span>
              <span className="flex items-center gap-[0.4em]"><i className="inline-block size-[0.8em] rounded-[0.2em] bg-[#dee7f8] ring-1 ring-[#b9cbee]" />reserviert</span>
              <span className="flex items-center gap-[0.4em]"><i className="inline-block size-[0.8em] rounded-[0.2em] bg-[#fbebd3] ring-1 ring-[#efd2a8]" />Werkstatt</span>
            </span>
          </div>
          <div className="overflow-hidden rounded-[0.45em] border border-app-line bg-white">
            <div className="grid grid-cols-[9em_1fr] border-b border-[#e6eaf0] bg-[#f6f8fb]">
              <span className="px-[0.7em] py-[0.45em] text-[0.56em] font-semibold text-app-ink-3 uppercase">Fahrzeug</span>
              <div className="grid grid-cols-7">
                {DAYS.map((d, i) => (
                  <span key={d} className={`border-l border-[#e6eaf0] py-[0.45em] text-center text-[0.56em] ${i === 1 ? "font-semibold text-[#1c3d6b]" : "text-app-ink-3"}`}>{d}</span>
                ))}
              </div>
            </div>
            {ROWS.map((r) => (
              <div key={r.plate} className="grid grid-cols-[9em_1fr] border-b border-[#eef1f5] last:border-0">
                <div className="flex flex-col gap-[0.15em] px-[0.7em] py-[0.55em]">
                  <Plate>{r.plate}</Plate>
                  <span className="text-[0.54em] text-app-ink-3">{r.car}</span>
                </div>
                <div className="relative grid grid-cols-7">
                  {DAYS.map((d, i) => (
                    <span key={d} className={`border-l border-[#eef1f5] ${i === 1 ? "bg-[#f4f7fc]" : ""}`} />
                  ))}
                  {r.bars.map((b) => (
                    <span key={b.label} className={`absolute top-1/2 flex h-[1.5em] -translate-y-1/2 items-center overflow-hidden rounded-[0.3em] px-[0.5em] text-[0.56em] font-semibold whitespace-nowrap ${BAR[b.tone]}`} style={{ left: `calc(${(b.from / 7) * 100}% + 0.2em)`, width: `calc(${((b.to - b.from) / 7) * 100}% - 0.4em)` }}>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

export function FleetScreen() {
  const dues = [
    { what: "HU/AU", when: "in 42 Tagen", tone: "good" as const },
    { what: "Inspektion", when: "noch 800 km", tone: "amber" as const },
    { what: "Reifenwechsel", when: "fällig seit 3 Tagen", tone: "bad" as const },
  ];
  return (
    <Scaled designWidth={34} label="RentBase Fahrzeugakte mit Status, Kilometerstand und Wartungsfälligkeiten (Beispieldaten)">
      <AppWindow url="app.rent-base.de/fahrzeuge" active="Fahrzeuge" sidebar={false}>
        <div className="space-y-[0.7em] p-[0.9em]">
          <div className="flex items-center gap-[0.6em]">
            <Plate>HB-RB 102</Plate>
            <span className="text-[0.95em] font-semibold text-app-ink">Škoda Octavia Combi</span>
            <Chip tone="good">Verfügbar</Chip>
          </div>
          <div className="flex gap-[1.2em] border-b border-app-line text-[0.6em] text-app-ink-3">
            {["Übersicht", "Vermietungen", "Kilometer", "Schäden", "Wartung", "Dokumente", "Historie"].map((t, i) => (
              <span key={t} className={`pb-[0.5em] ${i === 0 ? "border-b-2 border-[#1c3d6b] font-semibold text-app-ink" : ""}`}>{t}</span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-[0.6em]">
            {[
              ["Kilometerstand", "48.930 km"],
              ["Vermietungen", "31"],
              ["Offene Schäden", "0"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[0.45em] border border-app-line bg-white px-[0.75em] py-[0.55em]">
                <div className="text-[0.54em] font-semibold text-app-ink-3 uppercase">{k}</div>
                <div className="text-[1.05em] font-semibold text-app-ink">{v}</div>
              </div>
            ))}
          </div>
          <Panel title="Fälligkeiten">
            <ul className="divide-y divide-[#e6eaf0]">
              {dues.map((d) => (
                <li key={d.what} className="flex items-center justify-between px-[0.8em] py-[0.5em] text-app-ink">
                  <span className="text-[0.62em]">{d.what}</span>
                  <Chip tone={d.tone}>{d.when}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </AppWindow>
    </Scaled>
  );
}

export function InvoiceScreen() {
  const items = [
    ["Fahrzeugmiete 29.09.–03.10. (5 Tage)", "245,00 €"],
    ["Mehrkilometer 120 km × 0,25 €", "30,00 €"],
    ["Betankung 18 l × 1,80 €", "32,40 €"],
    ["Innenreinigung", "30,00 €"],
  ];
  return (
    <Scaled designWidth={34} label="RentBase Rechnung aus der Vermietung mit Positionen, Zahlungen und getrennt geführter Kaution (Beispieldaten)">
      <AppWindow url="app.rent-base.de/buchungen/2026-0142/rechnung" active="Rechnungen" sidebar={false}>
        <div className="grid grid-cols-[1.45fr_1fr] gap-[0.7em] p-[0.9em]">
          <Panel title="Rechnung RE-2026-000118" right={<Chip tone="good">abgeschlossen</Chip>}>
            <ul className="divide-y divide-[#eef1f5] px-[0.8em]">
              {items.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-[1em] py-[0.5em] text-[0.6em] text-app-ink">
                  <span>{k}</span>
                  <span className="font-mono">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mx-[0.8em] mt-[0.2em] mb-[0.7em] flex justify-between border-t-[0.15em] border-app-ink pt-[0.5em] text-[0.7em] font-semibold text-app-ink">
              <span>Gesamt</span>
              <span className="font-mono">337,40 €</span>
            </div>
          </Panel>
          <div className="space-y-[0.7em]">
            <Panel title="Zahlungen" right={<Chip tone="good">Bezahlt</Chip>}>
              <div className="space-y-[0.35em] px-[0.8em] py-[0.6em] text-[0.58em] text-app-ink">
                <div className="flex justify-between"><span>Überweisung</span><span className="font-mono">100,00 €</span></div>
                <div className="flex justify-between"><span>Barzahlung</span><span className="font-mono">237,40 €</span></div>
                <div className="flex justify-between border-t border-[#e6eaf0] pt-[0.35em] font-semibold"><span>Noch offen</span><span className="font-mono">0,00 €</span></div>
              </div>
            </Panel>
            <Panel title="Kaution" right={<Chip tone="info">Erhalten</Chip>}>
              <div className="space-y-[0.35em] px-[0.8em] py-[0.6em] text-[0.58em] text-app-ink">
                <div className="flex justify-between"><span>Vereinbart</span><span className="font-mono">500,00 €</span></div>
                <div className="flex justify-between"><span>Erhalten</span><span className="font-mono">500,00 €</span></div>
                <div className="text-app-ink-3">Getrennt von der Miete, keine automatische Verrechnung.</div>
              </div>
            </Panel>
          </div>
        </div>
      </AppWindow>
    </Scaled>
  );
}

export function CustomerScreen() {
  const rentals = [
    ["2026-0142", "HB-RB 214", "29.09.–03.10.", <Chip key="a" tone="info">reserviert</Chip>],
    ["2026-0097", "HB-RB 318", "12.08.–15.08.", <Chip key="b" tone="grey">abgerechnet</Chip>],
    ["2026-0051", "HB-RB 102", "03.06.–10.06.", <Chip key="c" tone="grey">abgerechnet</Chip>],
  ] as const;
  return (
    <Scaled designWidth={34} label="RentBase Kundenakte mit Vermietungen, Rechnungen und Zahlungen (Beispieldaten)">
      <AppWindow url="app.rent-base.de/kunden" active="Kunden" sidebar={false}>
        <div className="space-y-[0.7em] p-[0.9em]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[0.95em] font-semibold text-app-ink">Keller Logistik GmbH</div>
              <div className="text-[0.58em] text-app-ink-3">K-00042 · Bremen · Ansprechpartner Tobias Keller</div>
            </div>
            <Chip tone="good">Führerschein geprüft</Chip>
          </div>
          <div className="grid grid-cols-4 gap-[0.6em]">
            {[
              ["Vermietungen", "7"],
              ["Rechnungen", "6"],
              ["Offen", "0,00 €"],
              ["Kaution offen", "500,00 €"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[0.45em] border border-app-line bg-white px-[0.7em] py-[0.5em]">
                <div className="text-[0.52em] font-semibold text-app-ink-3 uppercase">{k}</div>
                <div className="text-[0.95em] font-semibold text-app-ink">{v}</div>
              </div>
            ))}
          </div>
          <Panel title="Vermietungen">
            <ul className="divide-y divide-[#e6eaf0]">
              {rentals.map(([no, plate, when, chip]) => (
                <li key={no} className="flex items-center gap-[0.7em] px-[0.8em] py-[0.45em] text-app-ink">
                  <span className="w-[5em] font-mono text-[0.6em]">{no}</span>
                  <Plate>{plate}</Plate>
                  <span className="flex-1 text-[0.6em] text-app-ink-3">{when}</span>
                  {chip}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </AppWindow>
    </Scaled>
  );
}
