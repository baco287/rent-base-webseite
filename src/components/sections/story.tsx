"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, CalendarDays, CircleCheck, FileSignature, KeyRound, Receipt, RotateCcw, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BookingScreen, CalendarScreen, ContractScreen, CustomerScreen, DepositScreen, InvoiceScreen } from "../mockups/desktop-screens";
import { TabletReadings, TabletReturn } from "../mockups/device-screens";

type Step = { title: string; icon: LucideIcon; text: string; caption: string; Visual: () => React.JSX.Element; kind?: "device" | "card" };

const STEPS: Step[] = [
  { title: "Buchung", icon: CalendarDays, text: "Zeitraum wählen, Verfügbarkeit im Dispo-Kalender sehen. Doppelbelegungen werden erkannt, der Preis kommt aus dem Tarif.", caption: "Dispo-Kalender", Visual: CalendarScreen },
  { title: "Kunde & Fahrzeug", icon: Users, text: "Kundenakte mit Führerscheinangaben und das Fahrzeug mit Kilometerstand und Fälligkeiten hängen am Vorgang.", caption: "Kundenakte", Visual: CustomerScreen },
  { title: "Vertrag", icon: FileSignature, text: "Mietvertrag mit fester Fassung der Mietbedingungen, Inklusivkilometern und Kaution, digital unterschrieben.", caption: "Mietvertrag", Visual: ContractScreen },
  { title: "Übergabe", icon: KeyRound, text: "Kilometer, Tank, Schäden, Fotos, Checkliste, Fahrerprüfung und Unterschrift. Am Fahrzeug, in acht Schritten.", caption: "Übergabe auf dem Tablet", Visual: TabletReadings, kind: "device" },
  { title: "Rückgabe", icon: RotateCcw, text: "Abgleich mit der Übergabe. Mehrkilometer und Betankung schlägt RentBase vor, du bestätigst.", caption: "Rückgabe auf dem Tablet", Visual: TabletReturn, kind: "device" },
  { title: "Abrechnung", icon: Receipt, text: "Die Rechnung entsteht aus dem Vorgang. Zahlungen sind sofort sichtbar, das PDF geht per E-Mail raus.", caption: "Rechnung", Visual: InvoiceScreen },
  { title: "Abschluss", icon: CircleCheck, text: "Kaution verrechnen, freigeben oder auszahlen. Nur mit deiner Bestätigung, jede Auszahlung mit Beleg.", caption: "Kaution & Abrechnung", Visual: DepositScreen, kind: "card" },
];

/**
 * Mietvorgang nach dem Referenzbild: links Headline, rechts die Ablaufzeile mit sieben Stationen und darunter groß
 * die echte Produktansicht. Ohne Auswahl der ganze Vorgang (Buchungsdetail), mit Auswahl die Ansicht des Schritts.
 */
export function Story() {
  const [active, setActive] = useState(-1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = active >= 0 ? STEPS[active] : null;
  const Visual = step?.Visual;

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const n = STEPS.length;
    const cur = Math.max(0, active);
    const next = e.key === "ArrowRight" ? (cur + 1) % n : e.key === "ArrowLeft" ? (cur - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="produkt" aria-labelledby="story-title" className="relative scroll-mt-20 overflow-hidden bg-[#f3efe8] px-6 py-10 sm:px-10 sm:py-12 2xl:col-span-8 2xl:pr-14 2xl:pl-[max(4rem,calc(50vw-840px+4rem))] 2xl:min-h-[calc(100svh-2rem)] 2xl:flex 2xl:flex-col 2xl:justify-center">
      <span id="ablauf" className="absolute -top-20" aria-hidden />
      <div className="grid gap-8 @container">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end" data-reveal>
          <div>
            <p className="label">Der Mietvorgang</p>
            <h2 id="story-title" className="display mt-4 text-[clamp(2rem,3.6vw,3.1rem)]">
              Ein Vorgang.
              <br />
              Alles drin.
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-md text-[15px] leading-relaxed text-ink-2">Vom ersten Klick bis zur letzten Rechnung. Alle Informationen, Dokumente und Zahlungen in einem Mietvorgang.</p>
            <button
              type="button"
              onClick={() => {
                setActive(0);
                tabs.current[0]?.focus();
              }}
              className="btn-gold group mt-5 inline-flex h-11 cursor-pointer items-center gap-2 rounded-[5px] px-4 text-[14px] font-semibold"
            >
              Ablauf ansehen
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="min-w-0" data-reveal>
          {/* Ablaufzeile: Stationen mit feiner Verbindungslinie */}
          <div role="tablist" aria-label="Schritte des Mietvorgangs" onKeyDown={onKey} className="relative -mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(90deg,#000_80%,transparent)] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="relative grid min-w-[620px] grid-cols-7">
              <span aria-hidden className="absolute top-[26px] right-[7%] left-[7%] h-px bg-line-strong" />
              {STEPS.map((s, i) => {
                const on = i === active;
                const Icon = s.icon;
                return (
                  <button
                    key={s.title}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="story-view"
                    tabIndex={on || (active < 0 && i === 0) ? 0 : -1}
                    onClick={() => setActive(on ? -1 : i)}
                    className="group relative flex cursor-pointer flex-col items-center gap-3 text-center"
                  >
                    <span className={`relative flex size-[52px] items-center justify-center rounded-full border bg-white transition-[border-color,box-shadow,background-color] duration-300 ${on ? "border-gold-400 shadow-[0_0_0_4px_rgb(212_178_122/0.18)]" : "border-line-strong group-hover:border-gold-300"}`}>
                      <Icon aria-hidden className={`size-[22px] transition-colors ${on ? "text-gold-600" : "text-gold-500"}`} strokeWidth={1.5} />
                    </span>
                    <span className={`text-[13px] leading-tight font-semibold transition-colors ${on ? "text-ink" : "text-ink-2"}`}>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Produktansicht */}
          <div id="story-view" role="tabpanel" aria-label={step ? step.caption : "Buchungsdetail"} className="relative mt-8">
            <div key={active} className="view-in">
              {!step || !Visual ? (
                <div className="overflow-hidden rounded-[10px] shadow-[0_30px_80px_-30px_rgb(17_19_21/0.45)] ring-1 ring-black/5">
                  {/* Handy: ohne Seitenleiste, damit der Vorgang groß und lesbar bleibt */}
                  <div className="sm:hidden">
                    <BookingScreen compact />
                  </div>
                  <div className="hidden sm:block">
                    <BookingScreen />
                  </div>
                </div>
              ) : step.kind === "device" ? (
                <div className="mx-auto max-w-[620px] rounded-[1.6em] shadow-[0_30px_80px_-30px_rgb(17_19_21/0.5)]">
                  <Visual />
                </div>
              ) : step.kind === "card" ? (
                <div className="mx-auto max-w-[560px] rounded-[10px] shadow-[0_30px_80px_-30px_rgb(17_19_21/0.45)]">
                  <Visual />
                </div>
              ) : (
                <div className="overflow-hidden rounded-[10px] shadow-[0_30px_80px_-30px_rgb(17_19_21/0.45)] ring-1 ring-black/5">
                  <Visual />
                </div>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6" aria-live="polite">
              <p className="shrink-0 text-[12px] font-medium tracking-[0.12em] text-ink-3 uppercase">{step ? step.caption : "Buchungsdetail"} · Beispieldaten</p>
              <p className="text-[14px] leading-relaxed text-ink-2">{step ? step.text : "Wähle einen Schritt, um die passende Ansicht in RentBase zu sehen."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
