// Geräterahmen für Produktdarstellungen. Alle Maße in em: Der äußere Container setzt die Schriftgröße über
// Container-Einheiten (cqw), dadurch skaliert die gesamte Darstellung gleichmäßig mit der verfügbaren Breite.
// Inhalte sind für Screenreader als ein Bild mit Beschreibung zusammengefasst.

import type { CSSProperties, ReactNode } from "react";
import { CalendarDays, CarFront, Euro, FileText, LayoutGrid, Landmark, TriangleAlert, UserRound, Wrench, Settings } from "lucide-react";

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

const NAV = [
  { icon: LayoutGrid, label: "Heute" },
  { icon: CalendarDays, label: "Dispo-Kalender" },
  { icon: CarFront, label: "Fahrzeuge" },
  { icon: Wrench, label: "Wartung" },
  { icon: UserRound, label: "Kunden" },
  { icon: FileText, label: "Buchungen" },
  { icon: Euro, label: "Rechnungen" },
  { icon: TriangleAlert, label: "Schäden" },
  { icon: Landmark, label: "Behörden" },
  { icon: Settings, label: "Einstellungen" },
];

/** Browserfenster mit der echten RentBase-Navigation (Seitenleiste der App). */
export function AppWindow({ url, active, children, sidebar = true }: { url: string; active: string; children: ReactNode; sidebar?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[0.6em] border border-[#d9dde3] bg-white shadow-frame">
      <div className="flex h-[2.1em] items-center gap-[0.4em] border-b border-[#e3e6ea] bg-[#f6f7f9] px-[0.8em]">
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="size-[0.6em] rounded-full bg-[#d7dae0]" />
        <span className="ml-[1em] block h-[2.1em] max-w-[38em] flex-1 truncate rounded-[0.3em] bg-white px-[0.6em] text-[0.62em] leading-[2.1em] whitespace-nowrap text-[#7b8794] ring-1 ring-[#e3e6ea]">{url}</span>
      </div>
      <div className="flex bg-app-bg">
        {sidebar && (
          <div className="w-[10.5em] shrink-0 bg-[#1c3d6b] px-[0.6em] py-[0.9em] text-white">
            <div className="px-[0.5em] pb-[0.8em]">
              <div className="text-[0.82em] font-semibold tracking-tight">Autohaus Beispiel</div>
              <div className="text-[0.6em] text-white/60">Bremen</div>
            </div>
            <div className="mb-[0.6em] h-px bg-white/15" />
            <ul className="space-y-[0.15em]">
              {NAV.map(({ icon: Icon, label }) => (
                <li key={label} className={`flex items-center gap-[0.55em] rounded-[0.35em] px-[0.5em] py-[0.38em] text-[0.64em] ${label === active ? "bg-white/15 font-semibold" : "text-white/80"}`}>
                  <Icon className="size-[1.15em] shrink-0" strokeWidth={1.8} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

export function Tablet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.4em] bg-[#1b1f23] p-[0.75em] shadow-frame ring-1 ring-white/12 ${className}`}>
      <div className="overflow-hidden rounded-[0.7em] bg-app-bg">{children}</div>
    </div>
  );
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.9em] bg-[#1b1f23] p-[0.55em] shadow-frame ring-1 ring-white/12 ${className}`}>
      <div className="relative overflow-hidden rounded-[1.45em] bg-app-bg">
        <div className="absolute top-[0.45em] left-1/2 z-10 h-[1.1em] w-[4.2em] -translate-x-1/2 rounded-full bg-[#1b1f23]" />
        {children}
      </div>
    </div>
  );
}

/* Kleine Bausteine im Stil der App */

export function Chip({ tone = "grey", children }: { tone?: "grey" | "good" | "amber" | "bad" | "info" | "brand"; children: ReactNode }) {
  const tones = {
    grey: "bg-[#ebeff4] text-[#4a5568]",
    good: "bg-[#ddf0e3] text-[#2c7a4b]",
    amber: "bg-[#fbebd3] text-[#b8650a]",
    bad: "bg-[#f6dedb] text-[#b23a32]",
    info: "bg-[#dee7f8] text-[#2f5fb3]",
    brand: "bg-[#1c3d6b] text-white",
  };
  return <span className={`inline-flex items-center rounded-[0.3em] px-[0.5em] py-[0.12em] text-[0.58em] font-semibold whitespace-nowrap ${tones[tone]}`}>{children}</span>;
}

export function Plate({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-[0.2em] border-[0.1em] border-[#1a2230] bg-white px-[0.35em] font-mono text-[0.56em] font-bold tracking-wide text-[#1a2230] whitespace-nowrap">{children}</span>;
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
