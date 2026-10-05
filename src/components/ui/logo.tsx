import Image from "next/image";
import wordmark from "../../../public/brand/rentbase-wordmark.webp";

// Wortmarke „RentBase“ aus dem freigestellten Originallogo (public/brand/rentbase-logo.png, transparent).
// rentbase-wordmark.webp ist nur ein verkleinerter Ausschnitt davon (653 × 120 px), damit die Navigation nicht das
// 800-KB-Original laden muss. Logo selbst unverändert.

export function Wordmark({ height = 30, priority = false }: { height?: number; priority?: boolean }) {
  const width = Math.round((height * wordmark.width) / wordmark.height);
  return <Image src={wordmark} alt="RentBase" width={width} height={height} priority={priority} className="block h-auto" style={{ width, height }} />;
}
