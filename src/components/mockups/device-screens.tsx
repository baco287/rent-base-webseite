// Mobile Ansichten des echten Übergabe- und Rückgabe-Assistenten mit fiktiven Beispieldaten.
// Schrittnamen und Felder wie in der App (uebergabe/handover-parts.tsx, rueckgabe/page.tsx, Stand 07.10.2026):
// Übergabe 8 Schritte, Rückgabe 9 Schritte, Tankstand in Achteln (9 Stufen), Pflichtfotos, Unterschrift Mieter/Vermieter.

import Image from "next/image";
import { Camera, Check } from "lucide-react";
import { Chip, Phone, Plate, Scaled, Tablet } from "./frames";

export const HANDOVER_STEPS = ["Übersicht", "Kilometer & Energie", "Schäden", "Fotos", "Checkliste", "Fahrer & Dokumente", "Unterschrift", "Abschluss"] as const;
export const RETURN_STEPS = ["Übersicht", "Kilometer & Mietdauer", "Tank / Batterie", "Fahrzeugzustand", "Fotos", "Checkliste", "Zusatzkosten", "Unterschrift", "Abschluss"] as const;

function Progress({ steps, step }: { steps: readonly string[]; step: number }) {
  return (
    <div className="grid gap-[0.25em]" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
      {steps.map((s, i) => (
        <span key={s} className={`h-[0.3em] rounded-full ${i + 1 < step ? "bg-[#2c7a4b]" : i + 1 === step ? "bg-[#1c3d6b]" : "bg-[#dfe4eb]"}`} />
      ))}
    </div>
  );
}

function WizardHead({ kind, steps, step }: { kind: "Übergabe" | "Rückgabe"; steps: readonly string[]; step: number }) {
  return (
    <div className="border-b border-app-line bg-white px-[1em] pt-[0.9em] pb-[0.7em]">
      <div className="mb-[0.6em] flex items-center justify-between gap-[0.6em]">
        <span className="text-[0.62em] font-semibold text-app-ink">{kind} · Buchung 2026-0142</span>
        <Plate>HB-RB 214</Plate>
      </div>
      <Progress steps={steps} step={step} />
      <div className="mt-[0.55em] text-[0.82em] font-semibold text-app-ink">
        Schritt {step} von {steps.length}: {steps[step - 1]}
      </div>
    </div>
  );
}

function Footer({ next }: { next: string }) {
  return (
    <div className="flex justify-between border-t border-app-line bg-white px-[1em] py-[0.7em]">
      <span className="rounded-[0.35em] border border-app-line px-[0.9em] py-[0.4em] text-[0.62em] text-app-ink">Zurück</span>
      <span className="rounded-[0.35em] bg-app-brand px-[0.9em] py-[0.4em] text-[0.62em] font-semibold text-white">{next}</span>
    </div>
  );
}

/** Marker wie in Assistent und Protokoll: Kreis = bestehend, Raute = bei der Übergabe dokumentierter Vorschaden. */
function Marker({ x, y, n, shape }: { x: number; y: number; n: number; shape: "circle" | "diamond" }) {
  return (
    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <span className={`flex size-[1.3em] items-center justify-center bg-[#b23a32] text-[0.62em] font-bold text-white ring-2 ring-white ${shape === "circle" ? "rounded-full" : "rotate-45 rounded-[0.15em]"}`}>
        <span className={shape === "diamond" ? "-rotate-45" : ""}>{n}</span>
      </span>
    </span>
  );
}

export function TabletDamage() {
  return (
    <Scaled designWidth={38} label="RentBase Übergabe auf dem Tablet, Schritt 3 von 8: Schäden auf der Fahrzeugskizze markieren (Beispieldaten)">
      <Tablet>
        <WizardHead kind="Übergabe" steps={HANDOVER_STEPS} step={3} />
        <div className="grid grid-cols-[1.35fr_1fr] gap-[0.8em] p-[1em]">
          <div className="relative rounded-[0.45em] border border-app-line bg-white p-[0.5em]">
            <Image src="/app/sketch-pkw.svg" alt="" width={1000} height={840} unoptimized className="h-auto w-full" />
            <Marker x={87} y={21} n={1} shape="circle" />
            <Marker x={29} y={70} n={2} shape="diamond" />
          </div>
          <div className="space-y-[0.5em]">
            <div className="text-[0.56em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">Schäden (2)</div>
            {[
              { n: 1, t: "Kratzer Stoßfänger vorne", s: "bestehend", tone: "grey" as const },
              { n: 2, t: "Delle Tür hinten links", s: "Vorschaden", tone: "amber" as const },
            ].map((d) => (
              <div key={d.n} className="rounded-[0.4em] border border-app-line bg-white p-[0.55em]">
                <div className="text-[0.6em] font-semibold text-app-ink">{d.n}. {d.t}</div>
                <div className="mt-[0.3em] flex items-center justify-between">
                  <Chip tone={d.tone}>{d.s}</Chip>
                  <span className="flex items-center gap-[0.3em] text-[0.54em] text-app-ink-3"><Camera className="size-[1.1em]" />2 Fotos</span>
                </div>
              </div>
            ))}
            <div className="rounded-[0.4em] border border-dashed border-[#b9c3d0] p-[0.55em] text-center text-[0.56em] text-app-ink-3">Tippen, um einen Schaden zu markieren</div>
          </div>
        </div>
        <Footer next="Weiter" />
      </Tablet>
    </Scaled>
  );
}

const FUEL = ["leer", "1/8", "2/8", "3/8", "4/8", "5/8", "6/8", "7/8", "voll"];

export function TabletReadings() {
  return (
    <Scaled designWidth={38} label="RentBase Übergabe auf dem Tablet, Schritt 2 von 8: Kilometerstand und Tankstand in Achteln erfassen (Beispieldaten)">
      <Tablet>
        <WizardHead kind="Übergabe" steps={HANDOVER_STEPS} step={2} />
        <div className="space-y-[0.8em] p-[1em]">
          <div className="rounded-[0.45em] border border-app-line bg-white p-[0.75em]">
            <div className="text-[0.56em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">Kilometerstand</div>
            <div className="mt-[0.3em] w-[11em] rounded-[0.35em] border-2 border-app-brand px-[0.5em] py-[0.25em] font-mono text-[1.2em] font-semibold text-app-ink">45.210</div>
            <div className="mt-[0.35em] text-[0.54em] text-app-ink-3">Letzter Stand laut Fahrzeugakte: 45.180 km</div>
          </div>
          <div className="rounded-[0.45em] border border-app-line bg-white p-[0.75em]">
            <div className="text-[0.56em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">Tankstand in Achteln</div>
            <div className="mt-[0.45em] grid grid-cols-9 gap-[0.25em]">
              {FUEL.map((f) => (
                <span key={f} className={`rounded-[0.3em] py-[0.55em] text-center text-[0.54em] font-semibold ${f === "7/8" ? "bg-app-brand text-white" : "border border-app-line text-app-ink"}`}>{f}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[0.45em] border border-app-line bg-white px-[0.75em] py-[0.55em] text-[0.56em] text-app-ink-3">Bemerkung (optional)</div>
        </div>
        <Footer next="Weiter" />
      </Tablet>
    </Scaled>
  );
}

export function TabletReturn() {
  return (
    <Scaled designWidth={38} label="RentBase Rückgabe auf dem Tablet, Schritt 2 von 9: Kilometer und Mietdauer mit Vorschlag für Mehrkilometer (Beispieldaten)">
      <Tablet>
        <WizardHead kind="Rückgabe" steps={RETURN_STEPS} step={2} />
        <div className="space-y-[0.7em] p-[1em]">
          <div className="grid grid-cols-3 gap-[0.5em]">
            {[
              ["Bei Übergabe", "45.210 km"],
              ["Kilometerstand jetzt", "46.330 km"],
              ["Gefahren", "1.120 km"],
            ].map(([k, v], i) => (
              <div key={k} className={`rounded-[0.45em] px-[0.7em] py-[0.55em] ${i === 1 ? "border-2 border-app-brand bg-white" : "bg-[#ebeff4]"}`}>
                <div className="text-[0.5em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">{k}</div>
                <div className="font-mono text-[0.95em] font-semibold text-app-ink">{v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-[0.45em] border border-app-line bg-white p-[0.75em]">
            <div className="flex items-center justify-between">
              <span className="text-[0.62em] font-semibold text-app-ink">Mehrkilometer</span>
              <Chip tone="amber">Vorschlag</Chip>
            </div>
            <div className="mt-[0.4em] space-y-[0.25em] text-[0.56em] text-app-ink">
              <div className="flex justify-between"><span className="text-app-ink-3">Inklusive laut Vertrag</span><span className="font-mono">1.000 km</span></div>
              <div className="flex justify-between"><span className="text-app-ink-3">Darüber</span><span className="font-mono">120 km × 0,25 €</span></div>
              <div className="flex justify-between border-t border-[#e6eaf0] pt-[0.25em] font-semibold"><span>Vorschlag</span><span className="font-mono">30,00 €</span></div>
            </div>
            <div className="mt-[0.45em] text-[0.5em] text-app-ink-3">Bestätigung im Schritt „Zusatzkosten“.</div>
          </div>
          <div className="flex items-center justify-between rounded-[0.45em] border border-app-line bg-white px-[0.75em] py-[0.55em] text-[0.56em]">
            <span className="text-app-ink-3">Maßgebliches Mietende</span>
            <span className="font-mono text-app-ink">03.10.2026, 16:00</span>
          </div>
        </div>
        <Footer next="Weiter" />
      </Tablet>
    </Scaled>
  );
}

const PHOTOS = ["Vorne", "Hinten", "Links", "Rechts", "Innenraum", "Kilometerstand", "Tank / Batterie"];

export function PhonePhotos() {
  return (
    <Scaled designWidth={16} label="RentBase Übergabe auf dem Smartphone, Schritt 4 von 8: Pflichtfotos aufnehmen (Beispieldaten)">
      <Phone>
        <div className="bg-white px-[0.9em] pt-[2.1em] pb-[0.6em]">
          <Progress steps={HANDOVER_STEPS} step={4} />
          <div className="mt-[0.55em] text-[0.72em] font-semibold text-app-ink">Schritt 4 von 8: Fotos</div>
        </div>
        <div className="grid grid-cols-2 gap-[0.45em] p-[0.8em]">
          {PHOTOS.map((p, i) => (
            <div key={p} className={`flex aspect-[4/3] flex-col items-center justify-center gap-[0.2em] rounded-[0.4em] ${i < 5 ? "bg-[#e3eaf5] text-app-brand" : "border border-dashed border-[#b9c3d0] text-app-ink-3"}`}>
              {i < 5 ? <Check className="size-[1em]" strokeWidth={2.5} /> : <Camera className="size-[1em]" />}
              <span className="text-[0.48em] font-medium">{p}</span>
            </div>
          ))}
          <div className="flex aspect-[4/3] items-center justify-center rounded-[0.4em] border border-dashed border-[#b9c3d0] text-[0.48em] text-app-ink-3">Weitere Fotos</div>
        </div>
      </Phone>
    </Scaled>
  );
}

export function PhoneSignature() {
  return (
    <Scaled designWidth={16} label="RentBase Übergabe auf dem Smartphone, Schritt 7 von 8: Unterschrift des Mieters (Beispieldaten)">
      <Phone>
        <div className="bg-white px-[0.9em] pt-[2.1em] pb-[0.6em]">
          <Progress steps={HANDOVER_STEPS} step={7} />
          <div className="mt-[0.55em] text-[0.72em] font-semibold text-app-ink">Schritt 7 von 8: Unterschrift</div>
        </div>
        <div className="space-y-[0.55em] p-[0.85em]">
          <div className="space-y-[0.28em] rounded-[0.45em] border border-app-line bg-white p-[0.6em] text-[0.56em] text-app-ink">
            {[
              ["Kilometer", "45.210 km"],
              ["Tank", "7/8"],
              ["Schäden", "1 bestehend · 1 Vorschaden"],
              ["Fotos", "9"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-[0.6em]">
                <span className="text-app-ink-3">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[0.45em] border border-app-line bg-white p-[0.5em]">
            <div className="flex items-center justify-between">
              <span className="text-[0.48em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">Unterschrift Mieter</span>
              <Chip tone="good">Erfasst</Chip>
            </div>
            <svg viewBox="0 0 200 70" className="mt-[0.2em] h-[4em] w-full" fill="none" stroke="#1a2230" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 48c10-22 20-30 24-22s-8 24-2 22 14-28 20-26-4 22 4 20 12-18 18-16 2 14 8 12 10-10 16-9c8 1 4 10 12 9 9-1 16-8 26-9 12-1 20 4 30 2" />
              <path d="M10 60h180" stroke="#d6dce5" strokeWidth="1.2" />
            </svg>
            <div className="text-[0.48em] text-app-ink-3">Tobias Keller</div>
          </div>
          <div className="flex items-center justify-between rounded-[0.45em] border border-app-line bg-white px-[0.5em] py-[0.45em]">
            <span className="text-[0.48em] font-semibold tracking-[0.06em] text-app-ink-3 uppercase">Unterschrift Vermieter (optional)</span>
            <Chip>Fehlt</Chip>
          </div>
          <div className="rounded-[0.4em] bg-app-brand py-[0.55em] text-center text-[0.6em] font-semibold text-white">Weiter</div>
        </div>
      </Phone>
    </Scaled>
  );
}
