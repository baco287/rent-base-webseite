// Erzeugt das Beispiel-Übergabeprotokoll für die Website mit dem ECHTEN RentBase-PDF-Renderer
// (Rent-Base/src/lib/pdf/handover-pdf.ts, unverändert) und ausschließlich fiktiven Daten.
//
// Aufruf aus dem App-Ordner, damit dessen TypeScript-Pfade (@/…) gelten:
//   cd C:/Users/karak/Rent-Base && npx tsx ../Rent-Base-Website/scripts/beispielprotokoll.mts
// Ergebnis: Rent-Base-Website/public/beispiel/uebergabeprotokoll-beispiel.pdf
// Die App wird dabei nur gelesen; es entsteht keine Datei im App-Ordner und keine Datenbankverbindung.

import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderHandoverPdf } from "../../Rent-Base/src/lib/pdf/handover-pdf";
import { shrinkPhoto } from "../../Rent-Base/src/lib/documents";
import type { DocDamage, HandoverDocumentData } from "../../Rent-Base/src/lib/handover-view";

const APP = path.resolve(process.cwd());
const OUT = path.resolve(APP, "../Rent-Base-Website/public/beispiel");
const sharp = createRequire(path.join(APP, "package.json"))("sharp") as typeof import("sharp");

// Echte Ansichtsrahmen der Systemskizze „Allgemeiner Transporter“ v2 (Migration 20260920090000_uebergabe_wizard)
const VIEWS: { key: string; label: string; box: [number, number, number, number] }[] = [
  { key: "FRONT", label: "Vorne", box: [40, 280, 320, 270] },
  { key: "REAR", label: "Hinten", box: [380, 280, 320, 270] },
  { key: "LEFT", label: "Links (Fahrerseite)", box: [10, 20, 490, 230] },
  { key: "RIGHT", label: "Rechts (Beifahrerseite)", box: [510, 20, 490, 230] },
  { key: "TOP", label: "Dach", box: [720, 280, 260, 270] },
  { key: "INTERIOR", label: "Innenraum", box: [40, 575, 560, 250] },
];
const view = (k: string) => VIEWS.find((v) => v.key === k)!;

function damage(index: number, marker: "EXISTING" | "NEW", viewKey: string, kind: [string, string], severity: [string, string], size: string | null, description: string, posX: number, posY: number, photos: number): DocDamage {
  return {
    id: `d${index}`, index, marker,
    // Übergabe: Kreis = vor der Miete bekannt, Raute = bei der Übergabe neu entdeckt (symbolFor/markerLabelFor in handover-view.ts)
    symbol: marker === "NEW" ? "diamond" : "circle",
    markerLabel: marker === "NEW" ? "Neu entdeckt (Vorschaden)" : "Bereits dokumentiert",
    view: viewKey, viewLabel: view(viewKey).label, posX, posY,
    kind: kind[0], kindLabel: kind[1], severity: severity[0], severityLabel: severity[1], size, description,
    photos: Array.from({ length: photos }, (_, p) => ({ id: `dp-${index}-${p}`, url: "" })),
  };
}

const PHOTO_CATEGORIES: [string, string][] = [["FRONT", "Vorne"], ["REAR", "Hinten"], ["LEFT", "Links"], ["RIGHT", "Rechts"], ["INTERIOR", "Innenraum"], ["ODOMETER", "Kilometerstand"], ["FUEL", "Tank / Batterie"]];

/** Fiktive Daten, eindeutig als Beispiel erkennbar. Keine Daten aus echten Mietvorgängen. */
function data(): Omit<HandoverDocumentData, "contentHash"> {
  return {
    context: {
      landlord: { name: "Muster Autovermietung GmbH", address: "Musterstraße 1, 12345 Musterstadt", contact: "kontakt@muster-autovermietung.example", email: "kontakt@muster-autovermietung.example" },
      contractNumber: "MV-2026-0427",
      bookingNumber: "2026-0427",
      renterName: "Max Mustermann",
      renterNumber: "K-01427",
      vehicleTitle: "Mercedes-Benz Vito",
      plate: "H-RB 2026",
      vehicleGroup: "Transporter",
    },
    keyDrop: null,
    returnMode: null,
    comparison: null,
    driverChecks: [
      { role: "PRIMARY_DRIVER", roleLabel: "Hauptfahrer", name: "Max Mustermann", statusLabel: "Bestätigt", identityDocumentLabel: "Personalausweis", identityOriginalSeen: true, identityMatched: true, licenseOriginalSeen: true, licenseValid: true, requiredLicenseClass: "B", licenseClasses: ["B"], licenseClassSatisfied: true, validUntilLabel: null, checkedAtLabel: "28.09.2026, 10:21", checkedByName: "Laura Beispiel" },
    ],
    title: "Übergabeprotokoll",
    number: "UP-2026-0427",
    type: "PICKUP",
    status: "FINALIZED",
    startedAt: "28.09.2026, 10:18",
    finalizedAt: "28.09.2026, 10:30",
    employeeName: "Laura Beispiel",
    readings: [
      { label: "Kilometerstand", value: "42.318 km", missing: false },
      { label: "Antrieb", value: "Diesel", missing: false },
      { label: "Tankstand", value: "7/8", missing: false },
    ],
    notes: "Fahrzeug gereinigt übergeben. Der Mieter wurde in die Bedienung der Schiebetür und die Ladungssicherung eingewiesen.",
    sketch: { assetPath: "/sketches/generic-transporter-v2.svg", version: 2, name: "Allgemeiner Transporter", views: VIEWS },
    damages: [
      damage(1, "EXISTING", "REAR", ["SCRATCH", "Kratzer"], ["MINOR", "Leicht"], "ca. 8 cm", "Kratzer am hinteren Stoßfänger, links", 0.24, 0.78, 1),
      damage(2, "EXISTING", "FRONT", ["CHIP", "Steinschlag"], ["MINOR", "Leicht"], null, "Steinschlag in der Windschutzscheibe, außerhalb des Sichtfelds", 0.66, 0.3, 1),
      damage(3, "NEW", "RIGHT", ["DENT", "Delle"], ["MODERATE", "Mittel"], "ca. 4 cm", "Delle an der Schiebetür rechts, bei der Übergabe gemeinsam mit dem Mieter festgestellt", 0.56, 0.52, 2),
    ],
    // Standard-Checkliste der App (DEFAULT_CHECKLIST in lib/checklists.ts); Ladekabel entfällt bei Diesel
    checklist: [
      { label: "Fahrzeugschein und Bordmappe vorhanden", result: "Ja", ok: true, note: null, missing: false },
      { label: "Warndreieck vorhanden", result: "Ja", ok: true, note: null, missing: false },
      { label: "Warnweste vorhanden", result: "Ja", ok: true, note: null, missing: false },
      { label: "Verbandkasten vorhanden", result: "Ja", ok: true, note: null, missing: false },
      { label: "Hutablage vorhanden (falls Fahrzeug eine hat, sonst „Nicht zutreffend“)", result: "Nicht zutreffend", ok: null, note: null, missing: false },
      { label: "Anzahl übergebener Schlüssel", result: "2", ok: null, note: null, missing: false },
      { label: "Reifen und Felgen", result: "In Ordnung", ok: true, note: null, missing: false },
      { label: "Beleuchtung funktioniert", result: "In Ordnung", ok: true, note: null, missing: false },
      { label: "Innenraum sauber", result: "In Ordnung", ok: true, note: null, missing: false },
      { label: "Außen sauber", result: "In Ordnung", ok: true, note: null, missing: false },
      { label: "Keine Warnleuchten im Display", result: "In Ordnung", ok: true, note: null, missing: false },
      { label: "Bemerkungen", result: null, ok: null, note: null, missing: false },
    ],
    photos: PHOTO_CATEGORIES.map(([category, categoryLabel], i) => ({ id: `p${i}`, url: "", category, categoryLabel })),
    missingPhotoCategories: [],
    signatures: [
      { id: "sig-renter", role: "RENTER", roleLabel: "Mieter", signerName: "Max Mustermann", signedAt: "28.09.2026, 10:29", imageUrl: "" },
      { id: "sig-employee", role: "EMPLOYEE", roleLabel: "Vermieter", signerName: "Laura Beispiel", signedAt: "28.09.2026, 10:30", imageUrl: "" },
    ],
  } as Omit<HandoverDocumentData, "contentHash">;
}

/** Neutrales Platzhalterbild, ausdrücklich als Beispielfoto beschriftet (keine echten Fahrzeugfotos). */
async function examplePhoto(label: string) {
  const w = 1600, h = 1200;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe3e8"/><stop offset="1" stop-color="#b7bec8"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect x="560" y="430" width="480" height="300" rx="36" fill="none" stroke="#8a93a0" stroke-width="18"/><circle cx="800" cy="580" r="92" fill="none" stroke="#8a93a0" stroke-width="18"/><rect x="640" y="385" width="140" height="60" rx="14" fill="#8a93a0"/><text x="800" y="860" font-size="84" font-family="Arial, sans-serif" fill="#5d6673" text-anchor="middle">Beispielfoto</text><text x="800" y="960" font-size="64" font-family="Arial, sans-serif" fill="#6f7884" text-anchor="middle">${label}</text></svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
}

/** Fiktive Unterschrift (synthetischer Schriftzug), transparent. */
async function signature(variant: 0 | 1) {
  // Frei gezeichnete Schleifen und Bögen, bewusst unleserlich: kein echter Name, keine echte Unterschrift
  const strokes = [
    [
      "M40 150 L70 52 L96 132 L124 50 L146 150",
      "M160 128 C176 96 204 100 198 130 C193 152 170 150 176 128 C184 104 214 118 222 140 C230 118 250 104 262 124 C270 140 286 140 300 118",
      "M312 120 C340 60 380 60 372 110 C366 150 330 160 350 128 C372 96 420 104 440 132 C452 116 470 110 486 126 C500 142 530 136 560 110 C600 80 650 96 700 112",
    ],
    [
      "M50 60 C40 110 44 150 60 160 M50 60 C90 40 130 60 112 96 C100 118 70 118 58 108",
      "M150 150 C150 110 176 96 186 118 C194 136 176 156 166 138 C160 124 190 100 210 118 C224 132 222 150 236 140 C252 128 262 104 284 116 C300 126 296 148 314 146",
      "M330 140 C352 80 400 70 392 122 C388 150 364 150 372 126 C384 96 440 96 460 124 C476 144 520 146 560 120 C600 96 660 104 710 90",
    ],
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="200"><g fill="none" stroke="#1a2230" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${strokes[variant].map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

const base = data();
// Prüfsumme wie im echten Protokoll: SHA-256 über den Dokumentinhalt (hier über die fiktiven Beispieldaten)
const doc: HandoverDocumentData = { ...base, contentHash: createHash("sha256").update(JSON.stringify(base)).digest("hex") } as HandoverDocumentData;

const photos = new Map<string, Uint8Array>();
for (const p of [...doc.photos.map((x) => ({ id: x.id, label: x.categoryLabel })), ...doc.damages.flatMap((d) => d.photos.map((x) => ({ id: x.id, label: `Schaden ${d.index}` })))]) {
  const small = await shrinkPhoto(await examplePhoto(p.label));
  if (small) photos.set(p.id, small);
}
const signatures = new Map<string, Uint8Array>([["sig-renter", await signature(0)], ["sig-employee", await signature(1)]]);
const sketchSvg = await readFile(path.join(APP, "public", "sketches", "generic-transporter-v2.svg"), "utf8");

const { bytes, trace } = await renderHandoverPdf(doc, { sketchSvg, photos, signatures });
await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, "uebergabeprotokoll-beispiel.pdf"), bytes);
console.log(`uebergabeprotokoll-beispiel.pdf ${Math.round(bytes.length / 1024)} KB, ${trace.pages} Seiten, Marker ${trace.markers.length}, Überläufe ${trace.boxes.filter((b) => b.overflow).length}, Hinweise: ${trace.notes.join("; ") || "keine"}`);
process.exit(0);
