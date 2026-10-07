"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { SHOWCASES, type Showcase } from "@/content/product";
import { CalendarScreen, CustomerScreen, FleetScreen, InvoiceScreen } from "../mockups/desktop-screens";

const VISUALS: Record<Showcase["visual"], () => React.JSX.Element> = {
  calendar: CalendarScreen,
  fleet: FleetScreen,
  invoice: InvoiceScreen,
  customer: CustomerScreen,
};

const TAB_LABEL: Record<Showcase["visual"], string> = {
  calendar: "Buchungen",
  fleet: "Fuhrpark",
  invoice: "Rechnungen",
  customer: "Kunden",
};

/**
 * Produkttour mit Reitern statt vier langer Blöcke. Alle Inhalte stehen im HTML (für Suchmaschinen und ohne JavaScript),
 * sichtbar ist jeweils ein Bereich. Tastatur: Pfeiltasten, Pos1 und Ende wie bei WAI-ARIA-Tabs.
 */
export function ProductTour() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const n = SHOWCASES.length;
    const next = e.key === "ArrowRight" ? (active + 1) % n : e.key === "ArrowLeft" ? (active - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Funktionsbereiche" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {SHOWCASES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`tab-${s.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`panel-${s.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={(e) => {
              setActive(i);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            className={`h-11 shrink-0 cursor-pointer rounded-full border px-5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${i === active ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink-2 hover:border-ink-3 hover:text-ink"}`}
          >
            {TAB_LABEL[s.visual]}
          </button>
        ))}
      </div>

      {SHOWCASES.map((s, i) => {
        const Visual = VISUALS[s.visual];
        return (
          <div
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            hidden={i !== active}
            className="mt-8 grid items-center gap-10 rounded-xl border border-line bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12 lg:p-12"
          >
            <div>
              <p className="eyebrow">{s.eyebrow}</p>
              <h3 id={s.id} className="display mt-4 scroll-mt-24 text-[1.9rem] sm:text-[2.3rem]">{s.title}</h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{s.text}</p>
              <ul className="mt-7 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-ink">
                    <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-gold-500" strokeWidth={2.25} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tour-fade order-first lg:order-none" key={`v-${active}`}>
              <Visual />
            </div>
          </div>
        );
      })}
    </div>
  );
}
