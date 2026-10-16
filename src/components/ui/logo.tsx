import Image from "next/image";
import wordmark from "../../../public/brand/rentbase-wordmark.webp";
import wordmarkNegative from "../../../public/brand/rentbase-wordmark-negativ.webp";

// Wortmarke „RentBase“ aus dem freigestellten Originallogo (public/brand/rentbase-logo.png, transparent).
// - rentbase-wordmark.webp: verkleinerter Ausschnitt des Originals, für helle Flächen.
// - rentbase-wordmark-negativ.webp: vom Nutzer am 16.10.2026 freigegebene Negativ-Variante für dunkle Flächen.
//   Nur das schwarze „Rent“ ist hell gesetzt, „Base“ bleibt im Original-Gold. Form und Proportionen unverändert.

export function Wordmark({ height = 30, priority = false, tone = "light" }: { height?: number; priority?: boolean; tone?: "light" | "dark" }) {
  const src = tone === "dark" ? wordmarkNegative : wordmark;
  const width = Math.round((height * src.width) / src.height);
  return <Image src={src} alt="RentBase" width={width} height={height} priority={priority} className="block h-auto" style={{ width, height }} />;
}
