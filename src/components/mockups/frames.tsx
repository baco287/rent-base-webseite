// Geräterahmen und Bausteine für Produktdarstellungen. Alle Maße in em: Der äußere Container setzt die Schriftgröße
// über Container-Einheiten (cqw), dadurch skaliert die gesamte Darstellung gleichmäßig mit der verfügbaren Breite.
// Inhalte sind für Screenreader als ein Bild mit Beschreibung zusammengefasst.
//
// Vorlage ist die echte App (Stand origin/main 07.10.2026, App-Shell Befehl 29.2): dunkle Navy-Seitenleiste #0f1b2d mit
// Gruppen Vermietung / Flotte / Finanzen / Fälle, weiße Kopfleiste mit Datum, KW, Suche und „+ Neue Buchung“,
// Markenfarbe #1c3d6b, Kennzeichen mit blauem EU-Streifen.

import type { CSSProperties, ReactNode } from "react";
import {
  Banknote,
  CalendarDays,
  CarFront,
  ClipboardList,
  FileText,
  Landmark,
  LayoutGrid,
  Search,
  Settings,
  TriangleAlert,
  UserRound,
  Wallet,
  Wrench,
} from "lucide-react";

/** designWidth in em: bei dieser Breite entspricht 1em = 16px. */
export function Scaled({ designWidth, label, className = "", children }: { designWidth: number; label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={`@container w-full ${className}`}>
      <div aria-hidden style={{ fontSize: `calc(100cqw / ${designWidth})` } as CSSProperties} className="select-none">
        {children}
      </div>
    </div>
  );
}

const NAV: { group?: string; items: { icon: typeof LayoutGrid; label: string; badge?: string; tone?: "warn" | "info" }[] }[] = [
  { items: [{ icon: LayoutGrid, label: "Heute" }] },
  { group: "Vermietung", items: [{ icon: FileText, label: "Buchungen" }, { icon: CalendarDays, label: "Dispo-Kalender" }, { icon: UserRound, label: "Kunden" }] },
  { group: "Flotte", items: [{ icon: CarFront, label: "Fahrzeuge" }, { icon: Wrench, label: "Wartung", badge: "1", tone: "warn" }] },
  { group: "Finanzen", items: [{ icon: Banknote, label: "Rechnungen", badge: "4", tone: "info" }, { icon: ClipboardList, label: "Forderungen" }, { icon: Wallet, label: "Auszahlungen" }] },
  { group: "Fälle", items: [{ icon: TriangleAlert, label: "Schäden" }, { icon: Landmark, label: "Behörden" }] },
];

/** Browserfenster mit der echten RentBase-Shell. compact: ohne Seitenleiste, für kleinere Ausschnitte. */
export function AppWindow({ url, active, children, compact = false, header = true }: { url: string; active?: string; children: ReactNode; compact?: boolean; header?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[0.6em] bg-white ring-1 ring-black/10">
      <div className="flex h-[2.1em] items-center gap-[0.4em] border-b border-[#e3e6ea] bg-[#f6f7f9] px-[0.8em]">
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="ml-[1em] block h-[1.45em] max-w-[30em] flex-1 truncate rounded-[0.3em] bg-white px-[0.8em] text-[0.62em] leading-[2.35em] whitespace-nowrap text-[#7b8794] ring-1 ring-[#e3e6ea]">{url}</span>
      </div>
      <div className="flex bg-app-bg">
        {!compact && (
          <div className="flex w-[11.5em] shrink-0 flex-col bg-[#0f1b2d] px-[0.6em] py-[0.9em] text-[#e8edf5]">
            <div className="px-[0.55em] text-[1.1em] font-semibold tracking-[-0.01em] text-white">RentBase</div>
            <div className="mt-[0.7em] flex items-center gap-[0.55em] rounded-[0.4em] bg-white/[0.05] px-[0.55em] py-[0.45em]">
              <span className="flex size-[1.9em] items-center justify-center rounded-[0.3em] bg-white text-[0.62em] font-bold text-[#0f1b2d]">AB</span>
              <span className="min-w-0">
                <span className="block truncate text-[0.62em] font-semibold">Autohaus Beispiel</span>
                <span className="block text-[0.54em] text-[#8696ae]">Bremen</span>
              </span>
            </div>
            <div className="mt-[0.6em] space-y-[0.55em]">
              {NAV.map((g, gi) => (
                <div key={gi}>
                  {g.group && <div className="px-[0.55em] pb-[0.2em] text-[0.5em] font-semibold tracking-[0.08em] text-[#8696ae] uppercase">{g.group}</div>}
                  {g.items.map(({ icon: Icon, label, badge, tone }) => (
                    <div key={label} className={`flex items-center gap-[0.55em] rounded-[0.35em] px-[0.55em] py-[0.36em] text-[0.62em] ${label === active ? "bg-[rgba(110,155,245,0.17)] font-semibold text-white" : "text-[#b0bccd]"}`}>
                      <Icon className={`size-[1.2em] shrink-0 ${label === active ? "text-[#8fb3ff]" : ""}`} strokeWidth={1.8} />
                      <span className="flex-1">{label}</span>
                      {badge && <span className={`rounded-full px-[0.5em] text-[0.85em] font-semibold ${tone === "warn" ? "bg-[#e9a23b] text-[#2b1700]" : "bg-white/12 text-white"}`}>{badge}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-[0.55em] border-t border-white/[0.08] px-[0.55em] pt-[0.7em] text-[0.6em] text-[#b0bccd]">
              <Settings className="size-[1.2em]" strokeWidth={1.8} />
              Einstellungen
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1">
          {header && !compact && (
            <div className="flex h-[3.1em] items-center gap-[0.8em] border-b border-app-line bg-white px-[1em]">
              <div className="leading-tight">
                <div className="text-[0.62em] font-semibold text-app-ink">Mittwoch, 7. Oktober</div>
                <div className="text-[0.52em] text-app-ink-3">KW 41</div>
              </div>
              <div className="ml-auto flex h-[1.9em] w-[13em] items-center gap-[0.5em] rounded-[0.35em] border border-app-line px-[0.6em] text-[0.58em] text-app-ink-3">
                <Search className="size-[1.1em]" />
                <span className="flex-1">Suchen …</span>
                <span className="rounded-[0.25em] border border-app-line px-[0.4em] text-[0.85em]">Strg K</span>
              </div>
              <span className="rounded-[0.35em] border border-app-line px-[0.7em] py-[0.35em] text-[0.58em] text-app-ink">+ Neuer Kunde</span>
              <span className="rounded-[0.35em] bg-app-brand px-[0.7em] py-[0.35em] text-[0.58em] font-semibold text-white">+ Neue Buchung</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function Tablet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5em] bg-[#16181b] p-[0.8em] ring-1 ring-white/10 ${className}`}>
      <div className="overflow-hidden rounded-[0.75em] bg-app-bg">{children}</div>
    </div>
  );
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2em] bg-[#16181b] p-[0.55em] ring-1 ring-white/10 ${className}`}>
      <div className="relative overflow-hidden rounded-[1.5em] bg-app-bg">
        <div className="absolute top-[0.45em] left-1/2 z-10 h-[1.1em] w-[4.2em] -translate-x-1/2 rounded-full bg-[#16181b]" />
        {children}
      </div>
    </div>
  );
}

/* Kleine Bausteine im Stil der App */

export type Tone = "grey" | "good" | "amber" | "bad" | "info" | "brand";
const TONES: Record<Tone, string> = {
  grey: "bg-[#ebeff4] text-[#4a5568]",
  good: "bg-[#ddf0e3] text-[#2c7a4b]",
  amber: "bg-[#fbebd3] text-[#b8650a]",
  bad: "bg-[#f6dedb] text-[#b23a32]",
  info: "bg-[#dee7f8] text-[#2f5fb3]",
  brand: "bg-[#1c3d6b] text-white",
};

export function Chip({ tone = "grey", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-[0.6em] py-[0.12em] text-[0.56em] font-semibold whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}

/** Kennzeichen wie in der App: Monospace, schwarzer Rahmen, blauer EU-Streifen links. */
export function Plate({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-stretch overflow-hidden rounded-[0.2em] border-[0.1em] border-[#1a2230] bg-white font-mono text-[0.56em] font-bold tracking-wide whitespace-nowrap text-[#1a2230]">
      <span className="w-[0.45em] bg-[#0a3f9e]" />
      <span className="px-[0.4em]">{children}</span>
    </span>
  );
}

export function Panel({ title, right, children, className = "" }: { title?: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[0.45em] border border-app-line bg-white ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-[#e6eaf0] px-[0.8em] py-[0.5em]">
          <span className="text-[0.66em] font-semibold text-app-ink">{title}</span>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/** Kennzahl-Kachel der Startseite „Heute“: Hintergrund panel-2, bei Fälligem amber. */
export function Kpi({ label, value, detail, hot = false }: { label: string; value: string; detail: string; hot?: boolean }) {
  return (
    <div className={`rounded-[0.45em] px-[0.8em] py-[0.65em] ${hot ? "bg-[#fbebd3]" : "bg-[#ebeff4]"}`}>
      <div className="text-[0.52em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{label}</div>
      <div className={`mt-[0.1em] font-mono text-[1.55em] leading-tight font-semibold ${hot ? "text-[#b8650a]" : "text-app-ink"}`}>{value}</div>
      <div className="truncate text-[0.54em] text-app-ink-3">{detail}</div>
    </div>
  );
}
