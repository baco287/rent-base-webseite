"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarScreen, ContractScreen, CustomerScreen, DepositScreen, InvoiceScreen } from "../mockups/desktop-screens";
import { TabletReadings, TabletReturn } from "../mockups/device-screens";
import { Container, SectionHead } from "../ui/primitives";

type Step = { no: string; title: string; text: string; caption: string; Visual: () => React.JSX.Element; device?: boolean };

const STEPS: Step[] = [
  { no: "01", title: "Buchung", text: "Zeitraum wählen, Verfügbarkeit im Dispo-Kalender sehen. Doppelbelegungen werden beim Buchen erkannt, der Preis kommt aus dem Tarif.", caption: "Dispo-Kalender", Visual: CalendarScreen },
  { no: "02", title: "Kunde & Fahrzeug", text: "Kundenakte mit Führerscheinangaben, Fahrzeug mit Kilometerstand und Fälligkeiten. Beides hängt am Vorgang.", caption: "Kundenakte", Visual: CustomerScreen },
  { no: "03", title: "Vertrag", text: "Mietvertrag mit fester Fassung der Mietbedingungen, Inklusivkilometern und Kaution. Digital unterschrieben.", caption: "Mietvertrag", Visual: ContractScreen },
  { no: "04", title: "Übergabe", text: "Kilometer, Tank, Schäden, Fotos, Checkliste, Fahrerprüfung und Unterschrift. Am Fahrzeug, in acht Schritten.", caption: "Übergabe auf dem Tablet", Visual: TabletReadings, device: true },
  { no: "05", title: "Rückgabe", text: "Abgleich mit der Übergabe. Mehrkilometer und Betankung schlägt RentBase vor, du bestätigst.", caption: "Rückgabe auf dem Tablet", Visual: TabletReturn, device: true },
  { no: "06", title: "Abrechnung", text: "Die Rechnung entsteht aus dem Vorgang. Zahlungen sind sofort sichtbar, das PDF geht per E-Mail raus.", caption: "Rechnung", Visual: InvoiceScreen },
  { no: "07", title: "Abschluss", text: "Kaution verrechnen, freigeben oder auszahlen. Nur mit deiner Bestätigung, jede Auszahlung mit Beleg.", caption: "Kaution & Abrechnung", Visual: DepositScreen },
];

function Stage({ step, active }: { step: Step; active: boolean }) {
  const { Visual } = step;
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${active ? "opacity-100" : "pointer-events-none translate-y-6 scale-[0.985] opacity-0"}`}
    >
      <div className={step.device ? "w-[78%]" : step.Visual === DepositScreen ? "w-[68%]" : "w-full"}>
        <div className={step.device ? "rounded-[1.6em] shadow-frame" : "rounded-[10px] shadow-frame"}>
          <Visual />
        </div>
      </div>
    </div>
  );
}

/** Desktop: gepinnter Bereich, Schritt wechselt mit dem Scrollfortschritt. Mobil: Schritte untereinander. */
export function Workflow() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(0.9999, Math.max(0, -r.top / span));
      setActive(Math.floor(p * STEPS.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /** Klick auf einen Schritt: an die Scrollposition dieses Schritts springen. */
  function goTo(i: number) {
    const el = track.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (span * (i + 0.5)) / STEPS.length, behavior: "smooth" });
  }

  return (
    <section id="ablauf" aria-labelledby="flow-title" className="scroll-mt-16 bg-canvas">
      {/* Desktop */}
      <div ref={track} className="relative hidden xl:block" style={{ height: `${STEPS.length * 70 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container wide className="grid w-full grid-cols-[0.85fr_1.45fr] items-center gap-16 pt-16">
            <div>
              <SectionHead id="flow-title" no="02" label="Der Ablauf" size="md" title={<>Von der Buchung<br />bis zur Abrechnung.</>} />
              <ol className="mt-10 border-l border-line">
                {STEPS.map((s, i) => (
                  <li key={s.no}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={`relative -ml-px block w-full cursor-pointer border-l-2 py-2.5 pl-6 text-left transition-colors duration-300 ${i === active ? "border-gold-400" : "border-transparent hover:border-line-strong"}`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className={`font-mono text-[0.78rem] transition-colors ${i === active ? "text-gold-600" : "text-ink-3"}`}>{s.no}</span>
                        <span className={`text-[1.05rem] font-semibold tracking-[-0.015em] transition-colors ${i === active ? "text-ink" : "text-ink-3"}`}>{s.title}</span>
                      </span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <span className="overflow-hidden">
                          <span className="block max-w-sm pt-2 pl-[2.6rem] text-[15px] leading-relaxed text-ink-2">{s.text}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="relative aspect-[16/11]">
                {STEPS.map((s, i) => (
                  <Stage key={s.no} step={s} active={i === active} />
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.1em] text-ink-3 uppercase">
                <span className="text-gold-600">{STEPS[active].no} / 07</span>
                <span aria-hidden className="h-px flex-1 bg-line">
                  <span className="block h-px bg-gold-400 transition-[width] duration-500" style={{ width: `${((active + 1) / STEPS.length) * 100}%` }} />
                </span>
                <span>{STEPS[active].caption}</span>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobil und Tablet */}
      <Container className="py-24 xl:hidden">
        <SectionHead no="02" label="Der Ablauf" title={<>Von der Buchung bis zur Abrechnung.</>} />
        <ol className="mt-14 space-y-16">
          {STEPS.map(({ no, title, text, caption, Visual, device }) => (
            <li key={no} data-reveal>
              <div className="flex items-baseline gap-4 border-t border-line pt-5">
                <span className="font-mono text-[0.8rem] text-gold-600">{no}</span>
                <div>
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{text}</p>
                </div>
              </div>
              <div className={`mt-6 ${device ? "mx-auto max-w-[560px]" : "overflow-hidden rounded-[10px] shadow-frame max-sm:-mr-5"}`}>
                <div className={device ? "rounded-[1.4em] shadow-frame" : "max-sm:w-[150%]"}>
                  <Visual />
                </div>
              </div>
              <p className="mt-3 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">{caption}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
