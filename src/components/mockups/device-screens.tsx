// Mobile Ansichten des echten Übergabe-Assistenten (Schrittnamen wie in der App) mit Beispieldaten.

import Image from "next/image";
import { Camera, Check } from "lucide-react";
import { Chip, Phone, Plate, Scaled, Tablet } from "./frames";

const STEPS = ["Übersicht", "Kilometer & Energie", "Schäden", "Fotos", "Checkliste", "Fahrer & Dokumente", "Unterschrift", "Abschluss"] as const;

function WizardHead({ step }: { step: number }) {
  return (
    <div className="border-b border-app-line bg-white px-[1em] pt-[0.9em] pb-[0.7em]">
      <div className="flex items-center justify-between gap-[0.6em]">
        <span className="text-[0.62em] font-semibold text-app-ink">Übergabe · Buchung 2026-0142</span>
        <Plate>HB-RB 214</Plate>
      </div>
      <div className="mt-[0.6em] grid grid-cols-8 gap-[0.25em]">
        {STEPS.map((s, i) => (
          <span key={s} className={`h-[0.3em] rounded-full ${i + 1 < step ? "bg-[#2c7a4b]" : i + 1 === step ? "bg-[#1c3d6b]" : "bg-[#dfe4eb]"}`} />
        ))}
      </div>
      <div className="mt-[0.55em] text-[0.8em] font-semibold text-app-ink">
        Schritt {step} von 8: {STEPS[step - 1]}
      </div>
    </div>
  );
}

function Footer({ next }: { next: string }) {
  return (
    <div className="flex justify-between border-t border-app-line bg-white px-[1em] py-[0.7em]">
      <span className="rounded-[0.35em] border border-app-line px-[0.9em] py-[0.4em] text-[0.62em] text-app-ink">Zurück</span>
      <span className="rounded-[0.35em] bg-[#1c3d6b] px-[0.9em] py-[0.4em] text-[0.62em] font-semibold text-white">{next}</span>
    </div>
  );
}

/** Marker wie in der App: Kreis = bekannt vor Miete, Raute = bei Übergabe neu festgestellt. */
function Marker({ x, y, n, shape }: { x: number; y: number; n: number; shape: "circle" | "diamond" }) {
  return (
    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className={`flex size-[1.25em] items-center justify-center bg-[#b23a32] text-[0.62em] font-bold text-white ring-2 ring-white ${shape === "circle" ? "rounded-full" : "rotate-45 rounded-[0.15em]"}`}>
        <span className={shape === "diamond" ? "-rotate-45" : ""}>{n}</span>
      </span>
    </span>
  );
}

export function TabletDamage() {
  return (
    <Scaled designWidth={36} label="RentBase Übergabe auf dem Tablet: Schäden auf der Fahrzeugskizze markieren (Beispieldaten)">
      <Tablet>
        <WizardHead step={3} />
        <div className="grid grid-cols-[1.35fr_1fr] gap-[0.8em] p-[1em]">
          <div className="relative rounded-[0.45em] border border-app-line bg-white p-[0.5em]">
            <Image src="/app/sketch-pkw.svg" alt="" width={1000} height={840} unoptimized className="h-auto w-full" />
            <Marker x={87} y={21} n={1} shape="circle" />
            <Marker x={29} y={70} n={2} shape="diamond" />
          </div>
          <div className="space-y-[0.5em]">
            <div className="text-[0.6em] font-semibold text-app-ink-3 uppercase">Schäden (2)</div>
            {[
              { n: 1, t: "Kratzer Stoßfänger vorne", s: "bekannt vor Miete", tone: "grey" as const },
              { n: 2, t: "Delle Tür hinten links", s: "neu bei Übergabe", tone: "amber" as const },
            ].map((d) => (
              <div key={d.n} className="rounded-[0.4em] border border-app-line bg-white p-[0.55em]">
                <div className="text-[0.6em] font-semibold text-app-ink">{d.n}. {d.t}</div>
                <div className="mt-[0.3em] flex items-center justify-between">
                  <Chip tone={d.tone}>{d.s}</Chip>
                  <span className="flex items-center gap-[0.3em] text-[0.55em] text-app-ink-3"><Camera className="size-[1.1em]" />2 Fotos</span>
                </div>
              </div>
            ))}
            <div className="rounded-[0.4em] border border-dashed border-[#b9c3d0] p-[0.55em] text-center text-[0.58em] text-app-ink-3">Tippen, um einen Schaden zu markieren</div>
          </div>
        </div>
        <Footer next="Weiter zu Fotos" />
      </Tablet>
    </Scaled>
  );
}

export function TabletReadings() {
  return (
    <Scaled designWidth={36} label="RentBase Übergabe auf dem Tablet: Kilometerstand, Tankstand und Fotos erfassen (Beispieldaten)">
      <Tablet>
        <WizardHead step={2} />
        <div className="space-y-[0.8em] p-[1em]">
          <div className="grid grid-cols-2 gap-[0.8em]">
            <div className="rounded-[0.45em] border border-app-line bg-white p-[0.7em]">
              <div className="text-[0.56em] font-semibold text-app-ink-3 uppercase">Kilometerstand</div>
              <div className="mt-[0.2em] rounded-[0.35em] border-2 border-[#1c3d6b] px-[0.5em] py-[0.25em] font-mono text-[1.15em] font-semibold text-app-ink">45.210 km</div>
              <div className="mt-[0.35em] text-[0.54em] text-app-ink-3">Letzter Stand laut Fahrzeugakte: 45.180 km</div>
            </div>
            <div className="rounded-[0.45em] border border-app-line bg-white p-[0.7em]">
              <div className="text-[0.56em] font-semibold text-app-ink-3 uppercase">Tankstand</div>
              <div className="mt-[0.45em] grid grid-cols-8 gap-[0.2em]">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className={`h-[1.5em] rounded-[0.2em] ${i < 7 ? "bg-[#1c3d6b]" : "bg-[#dfe4eb]"}`} />
                ))}
              </div>
              <div className="mt-[0.35em] flex justify-between text-[0.54em] text-app-ink-3"><span>leer</span><span className="font-semibold text-app-ink">7/8</span><span>voll</span></div>
            </div>
          </div>
          <div>
            <div className="mb-[0.4em] text-[0.56em] font-semibold text-app-ink-3 uppercase">Nachweisfotos</div>
            <div className="grid grid-cols-4 gap-[0.5em]">
              {["Tacho", "Tankanzeige", "Front", "Heck"].map((p, i) => (
                <div key={p} className={`flex aspect-[4/3] flex-col items-center justify-center gap-[0.2em] rounded-[0.35em] ${i < 2 ? "bg-[#e3eaf5] text-[#1c3d6b]" : "border border-dashed border-[#b9c3d0] text-app-ink-3"}`}>
                  {i < 2 ? <Check className="size-[1.1em]" strokeWidth={2.5} /> : <Camera className="size-[1.1em]" />}
                  <span className="text-[0.52em]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer next="Weiter zu Schäden" />
      </Tablet>
    </Scaled>
  );
}

export function PhoneSignature() {
  return (
    <Scaled designWidth={16} label="RentBase Übergabe auf dem Smartphone: Zusammenfassung und Unterschrift des Kunden (Beispieldaten)">
      <Phone>
        <div className="bg-white px-[0.9em] pt-[2.1em] pb-[0.6em]">
          <div className="grid grid-cols-8 gap-[0.2em]">
            {STEPS.map((s, i) => (
              <span key={s} className={`h-[0.28em] rounded-full ${i < 6 ? "bg-[#2c7a4b]" : i === 6 ? "bg-[#1c3d6b]" : "bg-[#dfe4eb]"}`} />
            ))}
          </div>
          <div className="mt-[0.55em] text-[0.72em] font-semibold text-app-ink">Schritt 7 von 8: Unterschrift</div>
        </div>
        <div className="space-y-[0.6em] p-[0.9em]">
          <div className="space-y-[0.3em] rounded-[0.45em] border border-app-line bg-white p-[0.6em] text-[0.58em] text-app-ink">
            {[
              ["Kilometer", "45.210 km"],
              ["Tank", "7/8"],
              ["Schäden", "2 dokumentiert"],
              ["Fotos", "12"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-app-ink-3">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[0.45em] border border-app-line bg-white p-[0.5em]">
            <div className="text-[0.5em] font-semibold text-app-ink-3 uppercase">Unterschrift Mieter</div>
            <svg viewBox="0 0 200 70" className="mt-[0.2em] h-[4.2em] w-full" fill="none" stroke="#1a2230" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 48c10-22 20-30 24-22s-8 24-2 22 14-28 20-26-4 22 4 20 12-18 18-16 2 14 8 12 10-10 16-9c8 1 4 10 12 9 9-1 16-8 26-9 12-1 20 4 30 2" />
              <path d="M10 60h180" stroke="#d6dce5" strokeWidth="1.2" />
            </svg>
            <div className="text-[0.5em] text-app-ink-3">Anna Schröder</div>
          </div>
          <div className="rounded-[0.4em] bg-[#1c3d6b] py-[0.55em] text-center text-[0.62em] font-semibold text-white">Übergabe abschließen</div>
        </div>
      </Phone>
    </Scaled>
  );
}
