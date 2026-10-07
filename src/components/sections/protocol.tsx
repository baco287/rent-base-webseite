import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHead } from "../ui/primitives";

// Beispiel-Übergabeprotokoll: erzeugt mit dem echten RentBase-PDF-Renderer (renderHandoverPdf) und ausschließlich
// fiktiven Daten (scripts/beispielprotokoll.mts). Die Bilder sind gerasterte Seiten genau dieses PDFs.
const PDF = "/beispiel/uebergabeprotokoll-beispiel.pdf";
const A4 = { w: 1654, h: 2339 };

// Abschnitte in der Reihenfolge des echten Protokolls
const CONTENTS = [
  "Mieter und Fahrzeug",
  "Übergabedaten: Kilometer, Tank, Bemerkung",
  "Fahrer- und Führerscheinprüfung",
  "Fahrzeugskizze mit bestehenden Schäden und Vorschäden",
  "Checkliste mit Zubehör",
  "Fotos",
  "Unterschriften",
];

/** Das Übergabeprotokoll als echtes Geschäftsdokument: A4-Seiten aus dem Original-Renderer, kein Web-Nachbau. */
export function Protocol() {
  return (
    <section id="protokoll" aria-labelledby="protocol-title" className="scroll-mt-16 overflow-hidden bg-warm py-24 lg:py-36">
      <Container wide className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-20 lg:gap-y-0">
        <div className="lg:col-start-2 lg:self-end">
          <SectionHead id="protocol-title" no="04" label="Übergabeprotokoll" title={<>Dokumentiert, was wirklich übergeben wurde.</>} />
          <p className="lead mt-6 max-w-lg" data-reveal>
            Mit dem Abschluss der Übergabe erzeugt RentBase das Protokoll als PDF, versiegelt mit Prüfsumme und abgelegt im Mietvorgang.
          </p>
        </div>
        <div className="lg:col-start-2 lg:row-start-2">
          <ol className="border-t border-line lg:mt-10" data-reveal>
            {CONTENTS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-5 border-b border-line py-3">
                <span className="font-mono text-[0.75rem] text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-ink">{c}</span>
              </li>
            ))}
          </ol>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
            <a
              href={PDF}
              target="_blank"
              rel="noopener"
              className="group inline-flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[5px] bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2e32]"
            >
              Beispielprotokoll ansehen
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="font-mono text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">PDF · 4 Seiten · fiktive Daten</span>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[620px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center" data-reveal>
          <div className="relative pr-[9%] pb-[7%]">
            <div aria-hidden className="absolute top-[6%] right-0 bottom-0 left-[9%] overflow-hidden bg-white shadow-[0_1px_2px_rgb(17_19_21/0.06),0_24px_50px_-24px_rgb(17_19_21/0.3)] ring-1 ring-black/5">
              <Image src="/beispiel/uebergabeprotokoll-seite-2.webp" alt="" width={A4.w} height={A4.h} sizes="(min-width: 1024px) 600px, 90vw" className="h-auto w-full" />
            </div>
            <a
              href={PDF}
              target="_blank"
              rel="noopener"
              aria-label="Beispielprotokoll als PDF öffnen"
              className="relative block cursor-pointer overflow-hidden bg-white shadow-[0_1px_2px_rgb(17_19_21/0.08),0_40px_80px_-30px_rgb(17_19_21/0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
            >
              <Image
                src="/beispiel/uebergabeprotokoll-seite-1.webp"
                alt="Beispiel eines RentBase-Übergabeprotokolls, Seite 1: Mieter Max Mustermann, Mercedes-Benz Vito H-RB 2026, Kilometerstand 42.318 km, Tankstand 7/8, Fahrer- und Führerscheinprüfung sowie Fahrzeugskizze"
                width={A4.w}
                height={A4.h}
                sizes="(min-width: 1024px) 600px, 90vw"
                className="h-auto w-full"
              />
            </a>
          </div>
          <figcaption className="mt-4 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">Protokoll UP-2026-0427 · erzeugt mit RentBase</figcaption>
        </figure>
      </Container>
    </section>
  );
}
