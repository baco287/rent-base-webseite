import Image from "next/image";
import logo from "../../../public/brand/rentbase-logo.webp";

// Das Originallogo wird NICHT verändert. Für die Navigation zeigt ein CSS-Ausschnitt nur die Wortmarke
// „RentBase“ (Bildbereich x 330–1446, y 515–730 von 1774 × 887 px); die Ränder des Ausschnitts laufen weich aus,
// weil die Datei einen leicht getönten Hintergrund hat. Sobald eine freigestellte Variante (SVG/PNG) vorliegt,
// kann diese Komponente sie ohne Ausschnitt verwenden.
const CROP = { x: 330, y: 515, w: 1116, h: 215 } as const;
const SRC = { w: 1774, h: 887 } as const;

const fade = {
  maskImage: "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%)",
  WebkitMaskComposite: "source-in",
} as const;

export function Wordmark({ height = 30, priority = false }: { height?: number; priority?: boolean }) {
  const width = Math.round((height * CROP.w) / CROP.h);
  return (
    <span className="relative block overflow-hidden mix-blend-multiply" style={{ width, height, ...fade }}>
      <Image
        src={logo}
        alt="RentBase"
        priority={priority}
        sizes={`${Math.round((width * SRC.w) / CROP.w)}px`}
        className="absolute max-w-none"
        style={{ width: `${(SRC.w / CROP.w) * 100}%`, height: "auto", left: `${(-CROP.x / CROP.w) * 100}%`, top: `${(-CROP.y / CROP.h) * 100}%` }}
      />
    </span>
  );
}
