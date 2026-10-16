import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Beispiel-Übergabeprotokoll: erzeugt mit dem ECHTEN RentBase-PDF-Renderer (renderHandoverPdf) und ausschließlich
// fiktiven Daten (scripts/beispielprotokoll.mts, 16.10.2026: fiktives Vermieterlogo, KI-Beispielfotos).
// Die Bilder sind gerasterte Seiten genau dieses PDFs.
const PDF = "/beispiel/uebergabeprotokoll-beispiel.pdf";
const A4 = { w: 1654, h: 2339 };

/** Collage-Fläche nach dem Referenzbild: weißes Feld, Text oben, versetzte A4-Seiten mit weichem Schatten. */
export function Protocol() {
  return (
    <section id="protokoll" aria-labelledby="protocol-title" className="@container relative scroll-mt-20 overflow-hidden bg-white px-7 pt-9 pb-10 sm:px-10 sm:pt-11 2xl:col-span-4 2xl:pl-14 2xl:pr-[max(4rem,calc(50vw-840px+4rem))] 2xl:min-h-[calc(100svh-2rem)] 2xl:flex 2xl:flex-col 2xl:justify-center">
      <div className="grid gap-9 @3xl:grid-cols-[0.9fr_1.1fr] @3xl:items-center @3xl:gap-12">
      <div data-reveal>
        <p className="label">Übergabeprotokoll</p>
        <h2 id="protocol-title" className="display mt-4 text-[clamp(1.9rem,2.7vw,2.4rem)]">
          Dokumentiert,
          <br />
          was wirklich übergeben wurde.
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-2">
          Ein professionelles Protokoll mit Fahrzeugdaten, Kilometer- und Tankstand, Skizze, Schäden, Fotos und Unterschriften – automatisch aus der digitalen Übergabe, als PDF im Mietvorgang.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href={PDF} target="_blank" rel="noopener" className="btn-gold group inline-flex h-11 cursor-pointer items-center gap-2 rounded-[5px] px-4 text-[14px] font-semibold">
            Beispielprotokoll ansehen
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="text-[11px] font-medium tracking-[0.12em] text-ink-3 uppercase">PDF · 4 Seiten · fiktive Daten</span>
        </div>
      </div>

      <figure className="relative mx-auto w-full max-w-[520px]" data-reveal>
        <div className="relative pr-[16%] pb-[4%]">
          {/* Seite 3 mit Fotos dahinter, Seite 1 vorne */}
          <div aria-hidden className="absolute top-[5%] right-0 bottom-0 left-[16%] rotate-[3deg] overflow-hidden bg-white shadow-[0_24px_50px_-26px_rgb(17_19_21/0.4)] ring-1 ring-black/5">
            <Image src="/beispiel/uebergabeprotokoll-seite-3.webp" alt="" width={A4.w} height={A4.h} sizes="(min-width: 1280px) 420px, 85vw" className="h-auto w-full" />
          </div>
          <a
            href={PDF}
            target="_blank"
            rel="noopener"
            aria-label="Beispielprotokoll als PDF öffnen"
            className="relative block -rotate-[1.5deg] cursor-pointer overflow-hidden bg-white shadow-[0_2px_4px_rgb(17_19_21/0.06),0_40px_80px_-30px_rgb(17_19_21/0.5)] ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:-rotate-[0.8deg]"
          >
            <Image
              src="/beispiel/uebergabeprotokoll-seite-1.webp"
              alt="Beispiel eines RentBase-Übergabeprotokolls, Seite 1: Briefkopf der fiktiven Muster Autovermietung, Mieter Max Mustermann, Mercedes-Benz Vito H-RB 2026, Kilometerstand 42.318 km, Tankstand 7/8, Fahrer- und Führerscheinprüfung und Fahrzeugskizze mit markierten Schäden"
              width={A4.w}
              height={A4.h}
              sizes="(min-width: 1280px) 420px, 85vw"
              className="h-auto w-full"
            />
          </a>
        </div>
        <figcaption className="mt-3 text-[11px] font-medium tracking-[0.12em] text-ink-3 uppercase">Protokoll UP-2026-0427 · erstellt mit RentBase</figcaption>
      </figure>
      </div>
    </section>
  );
}
